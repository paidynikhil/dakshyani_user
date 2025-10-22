import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const PHONE_NUMBER = "+917702997909"; // used for both Call & WhatsApp

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 77029 97909"],
      action: "Call Now",
      link: `tel:${PHONE_NUMBER}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["Quick Chat", "Catalog & Orders"],
      action: "Chat Now",
      link: `https://wa.me/${PHONE_NUMBER}?text=Hello%20Dakshyani,%20I%20want%20to%20know%20more%20about%20your%20collection.`,
    },
    {
      icon: Mail,
      title: "Email",
      details: ["dakshayaniiconictrend@gmail.com"],
      action: "Send Email",
      link: "mailto:dakshayaniiconictrend@gmail.com",
    },
    {
      icon: MapPin,
      title: "Showrooms",
      details: ["3 Locations Available", "Nellore, Kurnool, Chennai"],
      action: "Get Directions",
      link: "https://maps.google.com/?q=Dakshyani+Shopping+Mall",
    },
  ];

  const socialMedia = [
    { icon: Instagram, name: "Instagram", followers: "50K+" },
    { icon: Facebook, name: "Facebook", followers: "25K+" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-muted/40">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Contact Dakshyani Shopping Mall
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Ready to start your wholesale business? Get in touch for catalogs,
            pricing, and bulk order inquiries.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-playfair font-semibold text-foreground">
              Contact Information
            </h3>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              {contactInfo.map((info, i) => (
                <Card
                  key={i}
                  className="h-full bg-white/90 border border-primary/10 shadow-sm hover:shadow-md transition-all"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <info.icon className="w-5 h-5 text-primary" />
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {info.details.map((d, j) => (
                      <p key={j} className="text-muted-foreground leading-relaxed">
                        {d}
                      </p>
                    ))}
                    <a href={info.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="btn-hero mt-3 w-full sm:w-auto">
                        {info.action}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="bg-white/90 border border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Monday – Saturday</span>
                  <span className="font-semibold">9:30 AM – 9:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">9:30 AM – 9:30 PM</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white/90 border border-primary/10">
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {socialMedia.map((s, i) => (
                    <div key={i} className="text-center">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 mb-2">
                        <s.icon className="w-4 h-4" />
                        {s.name}
                      </Button>
                      <p className="text-xs text-muted-foreground">{s.followers}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Contact Form */}
          <Card className="bg-white border border-primary/10 shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-playfair font-semibold">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name *</label>
                  <Input placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                  <Input placeholder="Enter phone number" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Email Address</label>
                <Input type="email" placeholder="Enter email address" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">City / Location *</label>
                <Input placeholder="Enter your city" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Message *</label>
                <Textarea placeholder="Enter your message" rows={4} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 btn-hero">Send Message</Button>

                {/* WhatsApp direct link */}
                <a
                  href={`https://wa.me/${PHONE_NUMBER}?text=Hello%20Dakshyani,%20I%20want%20to%20inquire%20about%20your%20collection.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full btn-whatsapp">WhatsApp Us</Button>
                </a>
              </div>

              {/* Quick Actions */}
              <div className="border-t pt-4 mt-6">
                <h4 className="font-semibold mb-2 text-foreground">
                  Need Immediate Assistance?
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Call or WhatsApp us directly for urgent inquiries.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${PHONE_NUMBER}`} className="w-full sm:w-auto">
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      Call Now
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${PHONE_NUMBER}?text=Hi%20Dakshyani,%20I%20want%20to%20connect.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button size="sm" className="btn-whatsapp w-full sm:w-auto">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
