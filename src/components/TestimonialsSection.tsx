import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import testimonial1 from "@/assets/testimonial-1.jpg";
// import testimonial2 from "@/assets/testimonial-2.jpg";
// import testimonial3 from "@/assets/testimonial-3.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      // image: testimonial1,
      rating: 5,
      text: "Amazing quality sarees at wholesale prices! I've been ordering for my boutique for 2 years now. The collection is always fresh and the delivery is super fast.",
      business: "Boutique Owner"
    },
    {
      id: 2,
      name: "Meera Patel",
      location: "Ahmedabad", 
      // image: testimonial2,
      rating: 5,
      text: "Dakshyani has the best bridal lehengas collection. My customers always love the quality and designs. Highly recommend for wholesale business!",
      business: "Reseller"
    },
    {
      id: 3,
      name: "Kavya Reddy",
      location: "Hyderabad",
      // image: testimonial3,
      rating: 5,
      text: "Excellent customer service and genuine wholesale rates. The WhatsApp support is very helpful. I've grown my business significantly with their products.",
      business: "Fashion Retailer"
    },
    {
      id: 4,
      name: "Anjali Singh",
      location: "Delhi",
      // image: testimonial1,
      rating: 5,
      text: "Best quality silk sarees at unbeatable prices. The variety is amazing and new stock comes every week. Perfect for resellers like me.",
      business: "Online Seller"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Resellers" },
    { number: "50,000+", label: "Products Sold" },
    { number: "500+", label: "Cities Covered" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  return (
    <section id="testimonials" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Hear from thousands of satisfied resellers and boutique owners who trust Dakshyani
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-playfair mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 text-center">
                <img
                  // src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>

                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-primary font-medium">{testimonial.business}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg mb-4">Join thousands of successful resellers today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-hero px-6 py-3 rounded-lg font-semibold">
              Start Wholesale Business
            </button>
            <button className="btn-whatsapp px-6 py-3 rounded-lg font-semibold">
              Get Customer Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;