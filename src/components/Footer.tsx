import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Sarees Collection", href: "#sarees" },
    { name: "Lehengas Collection", href: "#lehengas" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: "Wholesale Pricing", href: "#contact" },
    { name: "Bulk Orders", href: "#contact" }
  ];

  const categories = [
    { name: "Silk Sarees", href: "#sarees" },
    { name: "Cotton Sarees", href: "#sarees" },
    { name: "Georgette Sarees", href: "#sarees" },
    { name: "Bridal Lehengas", href: "#lehengas" },
    { name: "Party Wear", href: "#lehengas" },
    { name: "Designer Collection", href: "#new-arrivals" }
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      name: "Instagram", 
      href: "https://instagram.com/dakshyani", 
      followers: "50K+ Followers",
      color: "hover:text-pink-500"
    },
    { 
      icon: Facebook, 
      name: "Facebook", 
      href: "https://facebook.com/dakshyani", 
      followers: "25K+ Likes",
      color: "hover:text-blue-600"
    },
    { 
      icon: Youtube, 
      name: "YouTube", 
      href: "https://youtube.com/dakshyani", 
      followers: "15K+ Subscribers",
      color: "hover:text-red-600"
    },
    { 
      icon: Twitter, 
      name: "Twitter", 
      href: "https://twitter.com/dakshyani", 
      followers: "10K+ Followers",
      color: "hover:text-blue-400"
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">Dakshyani</h3>
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Your trusted partner for premium sarees and lehengas at wholesale prices. 
              Serving 10,000+ resellers across India with quality and reliability.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@dakshyani.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Nellore, Andhra Pradesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(category.href)}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-3 bg-primary-foreground/10 rounded-lg transition-all duration-300 hover:bg-primary-foreground/20 ${social.color} group`}
                >
                  <social.icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{social.name}</span>
                  <span className="text-xs text-primary-foreground/60">{social.followers}</span>
                </a>
              ))}
            </div>

            {/* WhatsApp Contact */}
            <div className="bg-success rounded-lg p-4 text-center">
              <MessageCircle className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-semibold text-success-foreground mb-2">Quick Support</p>
              <button className="bg-success-foreground text-success px-4 py-2 rounded-md text-sm font-medium hover:bg-success-foreground/90 transition-colors">
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 Dakshyani Shopping Mall. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <button className="hover:text-primary-foreground transition-colors">Privacy Policy</button>
              <button className="hover:text-primary-foreground transition-colors">Terms of Service</button>
              <button className="hover:text-primary-foreground transition-colors">Shipping Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;