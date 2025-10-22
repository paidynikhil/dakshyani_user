import { Award, Users, Truck, ShieldCheck, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ceo from "@/assets/srinivasulu.jpeg";
import ceo1 from "@/assets/ramakrishna.jpeg";

const AboutSection = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Hand-picked premium sarees and lehengas from trusted manufacturers across India",
    },
    {
      icon: Users,
      title: "1,00,000+ Resellers",
      description: "(Trusted by lakhs of online customers nationwide",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick dispatch within 24 hours with free shipping on bulk orders",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured",
      description: "7-day return policy and quality guarantee on all products",
    },
    {
      icon: Clock,
      title: "Daily New Stock",
      description: "Fresh arrivals every day with the latest fashion trends",
    },
    {
      icon: MapPin,
      title: "Pan India Delivery",
      description: "Serving customers across 500+ cities in India",
    },
  ];

  const ceos = [
    {
      name: "R. Srinivasulu",
      title: "Managing Director, Dakshayani Shopping Mall",
      image: ceo,
    },
    {
      name: "Rama Krishna",
      title: "CEO, Venkateshwara Silks",
      image: ceo1,
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">About Dakshyani Shopping Mall</h2>
          <p className="section-subtitle">
            Your trusted partner for premium traditional wear at wholesale prices since 1962
          </p>
        </div>

        {/* Company Story and CEO Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Our Story */}
          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-6">Our Story</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Venkateshwara Silks was established in 1962 by Ramaswami Naidu and later
                managed by his son, R. Rama Murthy, for 30 years.
              </p>
              <p>
                His sons, R. Srinivasulu and Rama Krishna, continued the business, with Rama
                Krishna overseeing Venkateshwara Silks.
              </p>
              <p>
                In 2008, R. Srinivasulu started a new business exclusively for women’s dresses
                named Dakshayani Shopping Mall, which became successful.
              </p>
              <p>
                Later, in 2020, both brothers expanded Dakshayani Shopping Mall to include
                sarees and dresses, making it a household name and setting a new fashion trend
                in Nellore district.
              </p>
            </div>
          </div>

          {/* CEO Images */}
          <div className="grid sm:grid-cols-2 gap-8">
            {ceos.map((ceo, index) => (
              <div key={index} className="text-center">
                <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-lg mb-4">
                  <img
                    src={ceo.image}
                    alt={ceo.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-lg font-semibold">{ceo.name}</h4>
                <p className="text-muted-foreground text-sm">{ceo.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <h3 className="text-2xl font-playfair font-semibold text-center mb-8">Why Choose Dakshyani?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-primary rounded-2xl p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-playfair font-semibold mb-4">Our Mission</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            To bring you exquisite premium traditional wear under one roof, offering a curated shopping experience that celebrates the rich heritage of Indian fashion.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-whatsapp">Partner With Us</Button>
            <Button variant="outline" className="btn-secondary-hero">
              View Our Catalog
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
