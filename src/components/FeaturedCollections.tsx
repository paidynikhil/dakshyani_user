import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import collectionDisplay from "@/assets/handloom-saree.webp";

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      image: collectionDisplay,
      badge: "Bestseller",
      badgeType: "bestseller",
      discount: "55% OFF",
      title: "Premium Sarees",
      description: "Silk, Cotton, Georgette varieties in vibrant designs",
      price: "₹899",
      originalPrice: "₹1,999",
    },
    {
      id: 2,
      image: collectionDisplay,
      badge: "New Arrival",
      badgeType: "new",
      discount: "60% OFF",
      title: "Designer Lehengas",
      description: "Exquisite wedding & festive collections for all occasions",
      price: "₹1,599",
      originalPrice: "₹3,999",
    },
    {
      id: 3,
      image: collectionDisplay,
      badge: "Featured",
      badgeType: "featured",
      discount: "62% OFF",
      title: "Bridal Collection",
      description: "Heavy embroidered premium bridal lehengas & sarees",
      price: "₹2,999",
      originalPrice: "₹7,999",
    },
    {
      id: 4,
      image: collectionDisplay,
      badge: "Exclusive",
      badgeType: "exclusive",
      discount: "58% OFF",
      title: "Party Wear Gowns",
      description: "Modern gowns with elegant detailing and premium fabric",
      price: "₹2,499",
      originalPrice: "₹5,999",
    },
  ];

  const benefits = [
    "Buy 10+ pieces and get an additional 5% off",
    "Free shipping on orders above ₹10,000",
    "Daily new stock updates on our website",
    "7-day return policy for defective pieces",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted/40">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Featured Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience luxury wholesale fashion with our curated premium collections.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white"
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Discount Tag */}
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {collection.discount}
                </div>
                {/* Badge */}
                <div
                  className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full shadow ${
                    collection.badgeType === "bestseller"
                      ? "bg-yellow-400 text-black"
                      : collection.badgeType === "new"
                      ? "bg-green-500 text-white"
                      : collection.badgeType === "featured"
                      ? "bg-purple-500 text-white"
                      : "bg-pink-500 text-white"
                  }`}
                >
                  {collection.badge}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-semibold font-playfair mb-1">
                  {collection.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-bold text-primary">
                    {collection.price} onwards
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    {collection.originalPrice}
                  </span>
                </div>

                <Button
                  size="sm"
                  className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white font-medium"
                >
                  View Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 365 Days Offer Section */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-10 shadow-lg">
          <h3 className="text-3xl font-playfair font-bold text-center mb-8">
            365 Days Offer
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start text-base gap-2 text-primary-foreground/90"
              >
                <span className="text-xl text-yellow-300 leading-none">•</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
