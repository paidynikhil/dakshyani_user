import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: number;
  image: string;
  badge?: string;
  badgeType?: string;
  discount: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
}

interface ProductGridProps {
  title: string;
  subtitle: string;
  products: Product[];
  sectionId?: string;
}

const ProductGrid = ({ title, subtitle, products, sectionId }: ProductGridProps) => {
  return (
    <section
  id={sectionId}
  className="section-padding scroll-mt-24 pt-24 pb-16 bg-gradient-to-b from-white to-gray-50"
>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl font-bold mb-2">{title}</h2>
          <p className="section-subtitle text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="product-card group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="discount-badge">{product.discount}</div>
                {product.badge && (
                  <div className={`badge-${product.badgeType}`}>
                    {product.badge}
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-1 font-playfair">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="price-sale text-base font-bold">
                    {product.price}
                  </span>
                  <span className="price-original text-xs line-through text-gray-500">
                    {product.originalPrice}
                  </span>
                </div>

                <Button
                  size="sm"
                  className="w-full btn-hero rounded-lg font-medium"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
          >
            View All {title}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
