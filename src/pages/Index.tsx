import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCollections from "@/components/FeaturedCollections";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBox from "@/components/ChatBox";

// Import product images
// import silkSaree1 from "@/assets/silk-saree-1.jpg";
// import cottonSaree1 from "@/assets/cotton-saree-1.jpg";
// import georgetteSaree1 from "@/assets/georgette-saree-1.jpg";
// import collectionDisplay from "@/assets/collection-display.jpg";
// import bridalLehenga1 from "@/assets/bridal-lehenga-1.jpg";

const Index = () => {
  // Premium Sarees data
  const sareeProducts = [
    {
      id: 1,
      // image: silkSaree1,
      badge: "Bestseller",
      badgeType: "bestseller",
      discount: "55% OFF",
      title: "Silk Saree Collection",
      description: "Pure silk with golden border",
      price: "₹899",
      originalPrice: "₹1,999"
    },
    {
      id: 2,
      // image: cottonSaree1,
      discount: "53% OFF",
      title: "Cotton Printed Saree",
      description: "Comfortable daily wear",
      price: "₹699",
      originalPrice: "₹1,499"
    },
    {
      id: 3,
      // image: georgetteSaree1,
      discount: "57% OFF",
      title: "Designer Georgette",
      description: "Party wear collection",
      price: "₹1,299",
      originalPrice: "₹2,999"
    },
    {
      id: 4,
      // image: collectionDisplay,
      discount: "56% OFF",
      title: "Handloom Saree",
      description: "Traditional handwoven",
      price: "₹1,099",
      originalPrice: "₹2,499"
    }
  ];

  // Designer Lehengas data
  const lehengaProducts = [
    {
      id: 1,
      // image: bridalLehenga1,
      badge: "Bestseller",
      badgeType: "bestseller",
      discount: "62% OFF",
      title: "Bridal Lehenga Set",
      description: "Heavy embroidered bridal wear",
      price: "₹2,999",
      originalPrice: "₹7,999"
    },
    {
      id: 2,
      // image: collectionDisplay,
      discount: "60% OFF",
      title: "Party Wear Lehenga",
      description: "Perfect for celebrations",
      price: "₹1,599",
      originalPrice: "₹3,999"
    },
    {
      id: 3,
      // image: collectionDisplay,
      discount: "58% OFF",
      title: "Designer Sharara Set",
      description: "Indo-western fusion",
      price: "₹1,899",
      originalPrice: "₹4,499"
    },
    {
      id: 4,
      // image: collectionDisplay,
      discount: "58% OFF",
      title: "Festive Lehenga",
      description: "Festival special collection",
      price: "₹1,399",
      originalPrice: "₹3,299"
    }
  ];

  // New Arrivals data
  const newArrivals = [
    {
      id: 1,
      // image: silkSaree1,
      badge: "New Arrival",
      badgeType: "new",
      discount: "50% OFF",
      title: "Latest Silk Saree",
      description: "Contemporary design",
      price: "₹1,199",
      originalPrice: "₹2,399"
    },
    {
      id: 2,
      // image: bridalLehenga1,
      badge: "New Arrival",
      badgeType: "new",
      discount: "55% OFF",
      title: "Modern Lehenga",
      description: "Trendy patterns",
      price: "₹1,799",
      originalPrice: "₹3,999"
    },
    {
      id: 3,
      // image: cottonSaree1,
      badge: "New Arrival",
      badgeType: "new",
      discount: "48% OFF",
      title: "Digital Print Saree",
      description: "Latest print technology",
      price: "₹799",
      originalPrice: "₹1,549"
    },
    {
      id: 4,
      // image: georgetteSaree1,
      badge: "New Arrival",
      badgeType: "new",
      discount: "52% OFF",
      title: "Designer Drape",
      description: "Ready to wear saree",
      price: "₹999",
      originalPrice: "₹2,099"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main id="home">
        <HeroSection />
        <FeaturedCollections />
        
        {/* <ProductGrid
          sectionId="sarees"
          title="Premium Sarees"
          subtitle="Handpicked sarees in silk, cotton, and georgette at wholesale prices"
          products={sareeProducts}
        />
        
        <ProductGrid
          sectionId="lehengas"
          title="Designer Lehengas"
          subtitle="Bridal and party wear lehengas for special occasions"
          products={lehengaProducts}
        />
        
        <ProductGrid
          sectionId="new-arrivals"
          title="New Arrivals"
          subtitle="Latest additions to our collection - fresh from the designers"
          products={newArrivals}
        /> */}
        
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBox />
    </div>
  );
};

export default Index;