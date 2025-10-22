import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Truck, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroSaree1 from "@/assets/handloom-saree.webp";
import heroSaree2 from "@/assets/cotton-saree.webp";
import heroSaree3 from "@/assets/silk-saree.webp";

// import heroLehenga1 from "@/assets/hero-lehenga-1.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroSaree1,
      title: "Premium Sarees Collection",
      subtitle: "• Finest Sarees in Silk, Cotton, Georgette & More",
      description: "Explore our timeless saree range — from luxurious silks to elegant cottons, crafted to enhance every occasion."
    },
    {
      image: heroSaree2,
      title: "Designer Lehengas",
      subtitle: "• Bridal | Party | Festive Wear",
      description: "Turn every celebration into a grand affair with our handcrafted designer lehengas, blending tradition with modern elegance."
    },
    {
      image: heroSaree3,
      title: "Dresses",
      subtitle: "• Ethnic | Indo-Western | Casual Styles",
      description: "Discover chic ethnic and Indo-Western dresses that bring together comfort, grace, and contemporary fashion."
    }
  ];

  const trustIndicators = [
    { icon: Users, text: "1,00,000+ Trusted Customers" },
    { icon: Truck, text: "Free Shipping on 3 Orders" },
    { icon: Zap, text: "Fast Dispatch" },
    { icon: Shield, text: "Premium Quality Assured" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

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
            {/* ✅ Image visible now */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* ✅ Subtle overlay for text contrast */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl animate-fade-in text-white">
              <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-yellow-400 mb-4 font-semibold">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-lg text-gray-100 mb-8">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white">
                  Shop New Collection
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-200">
                    <indicator.icon className="w-5 h-5" />
                    <span>{indicator.text}</span>
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
                index === currentSlide ? "bg-yellow-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;