import { Award, Users, Truck, ShieldCheck, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Hand-picked premium sarees and lehengas from trusted manufacturers across India"
    },
    {
      icon: Users,
      title: "10,000+ Resellers",
      description: "Trusted by thousands of boutique owners and resellers nationwide"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick dispatch within 24 hours with free shipping on bulk orders"
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured",
      description: "7-day return policy and quality guarantee on all products"
    },
    {
      icon: Clock,
      title: "Daily New Stock",
      description: "Fresh arrivals every day with the latest fashion trends"
    },
    {
      icon: MapPin,
      title: "Pan India Delivery",
      description: "Serving customers across 500+ cities in India"
    }
  ];

  const milestones = [
    { year: "2015", event: "Founded Dakshyani Shopping Mall" },
    { year: "2017", event: "Crossed 1,000 reseller partners" },
    { year: "2019", event: "Launched online wholesale platform" },
    { year: "2021", event: "Reached 5,000+ active resellers" },
    { year: "2023", event: "Expanded to 500+ cities across India" },
    { year: "2024", event: "10,000+ trusted reseller network" }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">About Dakshyani Shopping Mall</h2>
          <p className="section-subtitle">
            Your trusted partner for premium traditional wear at wholesale prices since 2015
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-6">Our Story</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2015 with a vision to make premium traditional Indian wear accessible 
                to resellers and boutique owners across the country, Dakshyani Shopping Mall has 
                grown from a small family business to India's leading wholesale fashion platform.
              </p>
              <p>
                We specialize in curating the finest collection of sarees, lehengas, and traditional 
                wear from skilled artisans and trusted manufacturers. Our commitment to quality, 
                competitive pricing, and exceptional service has earned us the trust of over 10,000 
                resellers nationwide.
              </p>
              <p>
                Today, we're proud to be the preferred wholesale partner for boutiques, online sellers, 
                and fashion entrepreneurs who value quality, authenticity, and reliability in their 
                business partnerships.
              </p>
            </div>
          </div>

          {/* Journey Timeline */}
          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-6">Our Journey</h3>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-8 flex items-center justify-center text-sm font-semibold">
                    {milestone.year}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <h3 className="text-2xl font-playfair font-semibold text-center mb-8">Why Choose Dakshyani?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center h-full">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="bg-primary rounded-lg p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-playfair font-semibold mb-4">Our Mission</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            To empower fashion entrepreneurs and boutique owners with access to premium traditional 
            wear at genuine wholesale prices, helping them build successful businesses while preserving 
            the rich heritage of Indian fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-whatsapp">
              Partner With Us
            </Button>
            <Button variant="outline" className="btn-secondary-hero">
              View Our Catalog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;