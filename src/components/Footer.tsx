import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Sarees Collection", href: "#sarees" },
    { name: "Lehengas Collection", href: "#lehengas" },
    { name: "New Arrivals", href: "#new-arrivals" },
  ];

  const categories = [
    { name: "Silk Sarees", href: "#sarees" },
    { name: "Cotton Sarees", href: "#sarees" },
    { name: "Georgette Sarees", href: "#sarees" },
    { name: "Bridal Lehengas", href: "#lehengas" },
    { name: "Party Wear", href: "#lehengas" },
    { name: "Designer Collection", href: "#new-arrivals" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Kurnool",
      href: "https://www.instagram.com/dakshayaniiconictrend?igsh=bGNocm93Zzg3YXR4",
      followers: "6K+ Followers",
      color: "hover:text-pink-500",
      showFollowers: true,
    },
    {
      icon: Instagram,
      name: "Chennai",
      href: "https://www.instagram.com/dhakshayanichennai?igsh=MTh5dGYzcTVhdWxzYw==",
      followers: "2K+ Followers",
      color: "hover:text-pink-500",
      showFollowers: true,
    },
    {
      icon: Instagram,
      name: "Nellore",
      href: "https://www.instagram.com/dakshayanishoppingmall?igsh=MWtqbmxxcnpnMDBwMg==",
      followers: "100 Followers",
      color: "hover:text-pink-500",
      showFollowers: true,
    },
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://www.facebook.com/share/1SxB8B6W6W/",
      followers: "",
      color: "hover:text-blue-600",
      showFollowers: false,
    },
    {
      icon: Youtube,
      name: "YouTube",
      href: "https://youtube.com/@dakshayanishoppingmall2025?si=u1XkXSdRftrtHUny",
      followers: "",
      color: "hover:text-red-600",
      showFollowers: false,
    },
  ];

  const PHONE_NUMBER = "+917702997909";

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground font-sans">
      {/* Main Footer */}
      <div className="container mx-auto py-10 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-2xl font-playfair font-bold">Dakshyani</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted partner for premium sarees and lehengas at offered
              prices. Serving 1,00,000+ online customers across India with
              quality and reliability.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+917702997909" className="hover:underline">
                  +91 77029 97909
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:dakshayaniiconictrend@gmail.com"
                  className="hover:underline"
                >
                  dakshayaniiconictrend@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Nellore, Kurnool, Chennai</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((cat, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(cat.href)}
                    className="text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="bg-primary-foreground/5 p-4 rounded-xl shadow-md flex flex-col items-center justify-between space-y-4">
            <h4 className="text-lg font-semibold text-center">Follow Us</h4>

            {/* Instagram Row */}
            <div className="flex justify-center gap-3">
              {socialLinks.slice(0, 3).map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-3 w-20 bg-primary-foreground/10 rounded-lg text-center text-xs ${s.color} hover:scale-105 transition`}
                >
                  <s.icon className="w-5 h-5 mb-1" />
                  <span>{s.name}</span>
                  {s.showFollowers && (
                    <span className="text-primary-foreground/60">
                      {s.followers}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Facebook + YouTube */}
            <div className="flex justify-center gap-3">
              {socialLinks.slice(3).map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-3 w-20 bg-primary-foreground/10 rounded-lg text-center text-xs ${s.color} hover:scale-105 transition`}
                >
                  <s.icon className="w-5 h-5 mb-1" />
                  <span>{s.name}</span>
                  {s.showFollowers && (
                    <span className="text-primary-foreground/60">
                      {s.followers}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <div className="bg-success rounded-xl p-3 text-center shadow-md hover:shadow-lg transition w-full">
              <MessageCircle className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-semibold text-success-foreground mb-2">
                Quick Support
              </p>
              <a
                href={`https://wa.me/${PHONE_NUMBER}?text=Hello%20Dakshyani,%20I%20would%20like%20to%20know%20more%20about%20your%20collections.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-success-foreground text-success px-4 py-2 rounded-md text-sm font-medium hover:bg-success-foreground/90">
                  WhatsApp Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20 mt-6">
        <div className="container mx-auto py-3 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>&copy; 2025 Dakshyani Shopping Mall. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <button className="hover:text-primary-foreground">
                Privacy Policy
              </button>
              <button className="hover:text-primary-foreground">
                Terms of Service
              </button>
              <button className="hover:text-primary-foreground">
                Shipping Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
