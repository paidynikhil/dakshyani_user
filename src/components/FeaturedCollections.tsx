import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import collectionDisplay from "@/assets/collection-display.jpg";

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      // image: collectionDisplay,
      badge: "Bestseller",
      badgeType: "bestseller",
      discount: "55% OFF",
      title: "Premium Sarees",
      description: "Silk, Cotton, Georgette varieties",
      price: "₹899",
      originalPrice: "₹1,999",
    },
    {
      id: 2,
      // image: collectionDisplay,
      badge: "New Arrival",
      badgeType: "new",
      discount: "60% OFF",
      title: "Designer Lehengas",
      description: "Wedding & Party Collection",
      price: "₹1,599",
      originalPrice: "₹3,999",
    },
    {
      id: 3,
      // image: collectionDisplay,
      badge: "Featured",
      badgeType: "featured",
      discount: "62% OFF",
      title: "Bridal Collection",
      description: "Heavy Embroidered Premium",
      price: "₹2,999",
      originalPrice: "₹7,999",
    },
    {
      id: 3,
      // image: collectionDisplay,
      badge: "Featured",
      badgeType: "featured",
      discount: "62% OFF",
      title: "Bridal Collection",
      description: "Heavy Embroidered Premium",
      price: "₹2,999",
      originalPrice: "₹7,999",
    },
  ];

  const benefits = [
    "Buy 10+ pieces get additional 5% off",
    "Free shipping on orders above ₹10,000",
    "Daily new stock updates on Website",
    "7-day return policy for defective pieces",
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">
            Experience Luxury Shopping with Our Curated Premium Collections!
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="product-card group shadow-md rounded-xl overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  // src={collection.image}
                  alt={collection.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="discount-badge">{collection.discount}</div>
                <div className={`badge-${collection.badgeType}`}>
                  {collection.badge}
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-playfair font-semibold mb-1">
                  {collection.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="price-sale text-base font-bold">
                    {collection.price} onwards
                  </span>
                  <span className="price-original text-xs line-through">
                    {collection.originalPrice}
                  </span>
                </div>

                <Button size="sm" className="w-full btn-hero rounded-lg">
                  View Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wholesale Benefits */}
        <div className="bg-primary rounded-lg p-8 text-center">
          <h3 className="text-2xl font-playfair font-bold text-primary-foreground mb-6">
            Wholesale Benefits (365 Days Offer)
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-primary-foreground/90 text-left">
                • {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
