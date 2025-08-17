import { useState, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
  image?: string;
  link?: string;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      message: "Namaste! 👋 Welcome to Dakshyani Shopping Mall.",
      timestamp: new Date()
    },
    {
      id: 2,
      type: "bot",
      message:
        "We offer premium sarees, lehengas & dresses at wholesale and retail prices. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "View Saree Collection",
    "View Lehenga Collection",
    "New Arrivals",
    "Bulk Order Inquiry",
    "Shipping & Delivery"
  ];

  const badWords = ["badword1", "badword2", "stupid", "idiot"];

  // Hugging Face AI reply function
  const fetchAIReply = async (userMessage: string) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer YOUR_HF_API_KEY", // Replace with your HF key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: `You are Dakshyani Shopping Mall assistant. Answer politely and helpfully: ${userMessage}` }),
        }
      );
      const data = await response.json();
      return data[0]?.generated_text || "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error("AI Error:", error);
      return "Oops! Something went wrong while generating a reply.";
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const lowerMsg = message.toLowerCase();

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      message: message,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    setTimeout(async () => {
      setIsTyping(false);

      // 1️⃣ Bad language filter
      if (badWords.some((word) => lowerMsg.includes(word))) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "bot",
            message: "⚠️ Sorry, we do not accept such language. Please keep our chat respectful.",
            timestamp: new Date()
          }
        ]);
        return;
      }

      // 2️⃣ Fixed product replies
      if (lowerMsg.includes("saree")) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "bot",
            message: "Our sarees start at ₹1,500 — silk, cotton & designer styles available. 💃",
            timestamp: new Date(),
            link: "https://yourwebsite.com/saree-collection"
          }
        ]);
        return;
      }
      if (lowerMsg.includes("lehenga")) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "bot",
            message: "Lehengas start from ₹3,500 — bridal & festive collections in stock. ✨",
            timestamp: new Date(),
            link: "https://yourwebsite.com/lehenga-collection"
          }
        ]);
        return;
      }
      if (lowerMsg.includes("dress")) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "bot",
            message: "Dresses start from ₹1,200 — perfect for parties & casual wear. 👗",
            timestamp: new Date(),
            link: "https://yourwebsite.com/dresses"
          }
        ]);
        return;
      }

      // 3️⃣ AI-generated reply
      const aiReply = await fetchAIReply(message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          message: aiReply,
          timestamp: new Date(),
        },
      ]);

      // 4️⃣ Ask for review after 3s
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            type: "bot",
            message: "💬 Before you go, could you please leave us a quick review? Your feedback means the world to us! ❤️",
            timestamp: new Date(),
            link: "https://yourwebsite.com/review"
          }
        ]);
      }, 3000);
    }, 1200);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "bot",
            message: "Check out our latest festive saree collection! ✨",
            timestamp: new Date(),
            image: "https://yourwebsite.com/images/featured-saree.jpg",
            link: "https://yourwebsite.com/saree-collection"
          }
        ]);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="btn-whatsapp rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[90vw]">
          <Card className="shadow-2xl border-primary/20">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5" />
                Dakshyani Support
                <div className="ml-auto flex gap-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs">Online</span>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[75%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`p-3 rounded-lg text-sm ${
                          msg.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {msg.message}
                        {msg.image && (
                          <img src={msg.image} alt="product" className="mt-2 rounded-lg border" />
                        )}
                        {msg.link && (
                          <a
                            href={msg.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 flex items-center gap-1 text-primary text-xs underline"
                          >
                            View More <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 px-1">
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                    <div
                      className={`flex items-end ${msg.type === "user" ? "order-1 mr-2" : "order-2 ml-2"}`}
                    >
                      {msg.type === "user" ? (
                        <User className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <Bot className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                      <Bot className="w-4 h-4 text-primary" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Replies */}
              <div className="border-t p-3">
                <div className="text-xs text-muted-foreground mb-2">Quick replies:</div>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(newMessage);
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSendMessage(newMessage)} size="sm" className="btn-hero">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  For immediate assistance:{" "}
                  <span className="text-primary font-medium">+91 98765 43210</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBox;