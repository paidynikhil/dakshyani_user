import { Phone, MessageCircle, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on home page, navigate there and then scroll
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="btn-whatsapp">
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-primary">
              Dakshyani
            </h1>
            <span className="text-sm text-muted-foreground">Shopping Mall</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
  <button
    onClick={() => handleScroll("#home")}
    className="text-foreground hover:text-primary transition-colors"
  >
    Home
  </button>

  <Link to="/sarees" className="text-foreground hover:text-primary transition-colors">
    Sarees
  </Link>

  <Link to="/lehengas" className="text-foreground hover:text-primary transition-colors">
    Lehengas
  </Link>

  <Link to="/new-arrivals" className="text-foreground hover:text-primary transition-colors">
    New Arrivals
  </Link>

  <button
    onClick={() => handleScroll("#testimonials")}
    className="text-foreground hover:text-primary transition-colors"
  >
    Reviews
  </button>
  <button
    onClick={() => handleScroll("#about")}
    className="text-foreground hover:text-primary transition-colors"
  >
    About
  </button>
  <button
    onClick={() => handleScroll("#contact")}
    className="text-foreground hover:text-primary transition-colors"
  >
    Contact
  </button>
</nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
