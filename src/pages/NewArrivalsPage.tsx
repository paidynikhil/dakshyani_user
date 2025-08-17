import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingBag,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  newArrivalAPI,
  type NewArrivalFilters,
  type NewArrival,
} from "@/services/newArrivalAPI";
import { toast } from "@/hooks/use-toast";

const NewArrivals = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "sarees" | "lehengas" | ""
  >("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Build filters object
  const filters: NewArrivalFilters = {
    search: search || undefined,
    category: selectedCategory || undefined,
    page: currentPage,
    limit: 12,
  };

  // Fetch new arrivals data
  const {
    data: newArrivalData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["new-arrivals", filters],
    queryFn: () => newArrivalAPI.getNewArrival(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Handle category change
  const handleCategoryChange = (category: "sarees" | "lehengas") => {
    setSelectedCategory(category);
    setCurrentPage(1); // reset page when filter changes
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Data from API
  const newArrivals = newArrivalData?.newArrivals || [];
  const totalResults = newArrivalData?.total || 0;

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          : "space-y-4"
      }
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className={`overflow-hidden ${
            viewMode === "list"
              ? "flex flex-row h-[220px]"
              : "w-[200px] h-[320px]"
          }`}
        >
          <Skeleton
            className={`${
              viewMode === "list"
                ? "w-28 h-40" // smaller in list view
                : "h-[200px] w-full max-w-[180px] mx-auto rounded-md object-cover"
            }`}
          />

          <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-6 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't load the new arrivals. Please try again.
          </p>
          <Button onClick={() => refetch()}>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="bg-card border rounded-2xl shadow-sm p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Title & Results */}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Premium New Arrival Collection
              </h2>
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  `${totalResults} results found`
                )}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for your perfect outfit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Category Selector */}
              <Select
                value={selectedCategory || ""}
                onValueChange={(val) =>
                  handleCategoryChange(val as "sarees" | "lehengas")
                }
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarees">Sarees</SelectItem>
                  <SelectItem value="lehengas">Lehengas</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters - removed old filters */}
          <aside className="w-80 hidden lg:block space-y-6">
            <div className="bg-card p-4 rounded-lg border shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>

              {/* Only Category Filter */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {["sarees", "lehengas"].map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${cat}`}
                        checked={selectedCategory === cat}
                        onCheckedChange={() =>
                          handleCategoryChange(
                            selectedCategory === cat
                              ? ""
                              : (cat as "sarees" | "lehengas")
                          )
                        }
                      />
                      <label
                        htmlFor={`cat-${cat}`}
                        className="text-sm capitalize"
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters */}
            {(search || selectedCategory) && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Active Filters:</span>
                  {search && (
                    <Badge variant="secondary" className="gap-1">
                      Search: "{search}"
                      <button onClick={() => setSearch("")}>×</button>
                    </Badge>
                  )}
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory("")}>×</button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {isLoading ? (
              <LoadingSkeleton />
            ) : newArrivals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your criteria.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {newArrivals.map((item: NewArrival) => (
                  <Card
                    key={item.id}
                    className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      !item.inStock ? "opacity-60" : ""
                    } ${viewMode === "list" ? "flex flex-row" : ""}`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-lg ${
                        viewMode === "list"
                          ? "w-40 h-40 flex-shrink-0" // smaller in list view
                          : "h-[220px] w-full" // fixed smaller height in grid view
                      }`}
                    >
                      <img
                        src={
                          item.images?.[0]
                            ? newArrivalAPI.getImageUrl(item.images[0])
                            : "/placeholder.svg"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      {item.discount && item.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                          {item.discount}% OFF
                        </Badge>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent
                      className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-base line-clamp-2">
                            {item.name}
                          </h3>
                          {item.rating > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 fill-current text-yellow-500" />
                              <span>{item.rating}</span>
                              {item.reviewCount > 0 && (
                                <span className="text-muted-foreground">
                                  ({item.reviewCount})
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>

                        {item.brand && (
                          <div className="text-xs text-muted-foreground">
                            by {item.brand}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-primary">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice &&
                            item.originalPrice > item.price && (
                              <span className="line-through text-sm text-muted-foreground">
                                ₹{item.originalPrice.toLocaleString()}
                              </span>
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 gradient-primary"
                            disabled={!item.inStock}
                            onClick={() => {
                              toast({
                                title: "Added to Cart",
                                description: `${item.name} has been added to your cart.`,
                              });
                            }}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!item.inStock}
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {newArrivalData && newArrivalData.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm">
                  Page {currentPage} of {newArrivalData.totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === newArrivalData.totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewArrivals;
