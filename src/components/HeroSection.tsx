import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Truck, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
// import heroSaree1 from "@/assets/hero-saree-1.jpg";
// import heroLehenga1 from "@/assets/hero-lehenga-1.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      // image: heroSaree1,
      title: "Premium Sarees Collection",
      subtitle: "Wholesale Prices • Daily New Stock",
      description: "Discover exquisite traditional sarees at unbeatable wholesale rates"
    },
    {
      // image: heroLehenga1,
      title: "Designer Lehengas",
      subtitle: "Bridal & Party Wear",
      description: "Stunning designer lehengas for your special occasions"
    }
  ];

  const trustIndicators = [
    { icon: Users, text: "10,000+ Trusted Resellers" },
    { icon: Truck, text: "Free Shipping on Bulk Orders" },
    { icon: Zap, text: "Fast Dispatch" },
    { icon: Shield, text: "Premium Quality Assured" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slider Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              // src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="hero-overlay" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-playfair font-bold text-primary-foreground mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-4 font-semibold">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-lg text-primary-foreground/90 mb-8">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="btn-hero">
                  Shop Wholesale Collection
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary-hero">
                  WhatsApp Catalog
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="trust-indicator">
                    <indicator.icon className="w-5 h-5" />
                    <span className="text-sm">{indicator.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-secondary" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;