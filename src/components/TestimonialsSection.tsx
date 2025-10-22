import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Amazing quality sarees at wholesale prices! I've been ordering for my boutique for 2 years now. The collection is always fresh and the delivery is super fast.",
      business: "Boutique Owner",
    },
    {
      id: 2,
      name: "Meera Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Dakshyani has the best bridal lehengas collection. My customers always love the quality and designs. Highly recommend for wholesale business!",
      business: "Reseller",
    },
    {
      id: 3,
      name: "Kavya Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "Excellent customer service and genuine wholesale rates. The WhatsApp support is very helpful. I've grown my business significantly with their products.",
      business: "Fashion Retailer",
    },
    {
      id: 4,
      name: "Anjali Singh",
      location: "Delhi",
      rating: 5,
      text: "Best quality silk sarees at unbeatable prices. The variety is amazing and new stock comes every week. Perfect for resellers like me.",
      business: "Online Seller",
    },
  ];

  const stats = [
    { number: "1,00,000+", label: "Happy Online Customers" },
    { number: "55,000+", label: "Products Sold" },
    { number: "170+", label: "Cities Covered" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-muted/50">
      {/* remove max-width container for scrollable area */}
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Hear from thousands of satisfied Online Customers and boutique owners who trust Dakshyani.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-primary font-playfair mb-1">
                {s.number}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials — scrollable on mobile */}
       {/* Testimonials — scrollable on mobile */}
<div className="relative">
  <div
    className="
      flex md:grid md:grid-cols-2 lg:grid-cols-4
      gap-4
      overflow-x-auto md:overflow-visible
      snap-x snap-mandatory
      scrollbar-hide
      pb-4
      -mx-4 px-4
    "
  >
    {testimonials.map((t) => (
      <Card
        key={t.id}
        className="
          w-[85%] sm:w-[70%] md:w-auto
          flex-shrink-0
          snap-center
          bg-white
          border border-primary/10
          shadow-sm hover:shadow-md
          rounded-2xl
          transition-all
          duration-300
          mx-auto
        "
      >
        <CardContent className="p-5 text-center relative">
          <Quote className="absolute top-3 left-3 w-5 h-5 text-primary/30" />
          <Quote className="absolute bottom-3 right-3 w-5 h-5 text-primary/20 rotate-180" />

          {/* Rating */}
          <div className="flex justify-center mb-2">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
            ))}
          </div>

          {/* Text */}
          <p className="text-[13px] sm:text-sm text-muted-foreground mb-3 italic leading-relaxed">
            “{t.text}”
          </p>

          {/* Name + Business */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base text-foreground">{t.name}</h4>
            <p className="text-xs text-primary font-medium">{t.business}</p>
            <p className="text-xs text-muted-foreground">{t.location}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
