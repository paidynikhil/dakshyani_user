import { Phone, MessageCircle, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"],
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["Quick Chat", "Catalog & Orders"],
      action: "Chat Now"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@dakshyani.com", "orders@dakshyani.com"],
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Showrooms",
      details: ["3 Locations Available", "Visit for Bulk Orders"],
      action: "Get Directions"
    }
  ];

  const socialMedia = [
    { icon: Instagram, name: "Instagram", followers: "50K+" },
    { icon: Facebook, name: "Facebook", followers: "25K+" }
  ];

  return (
    <section id="contact" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact Dakshyani Shopping Mall</h2>
          <p className="section-subtitle">
            Ready to start your wholesale business? Get in touch with us for catalog, pricing, and bulk order inquiries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-playfair font-semibold mb-6">Contact Information</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <info.icon className="w-5 h-5 text-primary" />
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">{detail}</p>
                    ))}
                    <Button size="sm" className="btn-hero mt-3">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-semibold">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">10:00 AM - 6:00 PM</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialMedia.map((social, index) => (
                    <div key={index} className="text-center">
                      <Button variant="outline" size="sm" className="mb-2">
                        <social.icon className="w-4 h-4 mr-2" />
                        {social.name}
                      </Button>
                      <p className="text-sm text-muted-foreground">{social.followers}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <Input placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Business Name</label>
                  <Input placeholder="Enter business name" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">City/Location *</label>
                <Input placeholder="Enter your city" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Inquiry Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="catalog">Wholesale Catalog Request</SelectItem>
                    <SelectItem value="bulk">Bulk Order Inquiry</SelectItem>
                    <SelectItem value="reseller">Reseller Partnership</SelectItem>
                    <SelectItem value="product">Product Information</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message *</label>
                <Textarea placeholder="Enter your message" rows={4} />
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 btn-hero">Send Message</Button>
                <Button className="flex-1 btn-whatsapp">WhatsApp Us</Button>
              </div>

              {/* Quick Actions */}
              <div className="border-t pt-4 mt-6">
                <h4 className="font-semibold mb-3">Need Immediate Assistance?</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Call us directly for urgent inquiries</p>
                    <Button size="sm" variant="outline">Call Now</Button>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">WhatsApp for latest collection & prices</p>
                    <Button size="sm" className="btn-whatsapp">WhatsApp</Button>
                  </div>
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