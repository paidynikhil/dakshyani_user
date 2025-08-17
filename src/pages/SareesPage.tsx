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
import { sareeAPI, type SareeFilters, type Saree } from "@/services/sareeAPI";
import { toast } from "@/hooks/use-toast";

const SareePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter states
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [onlyFastDelivery, setOnlyFastDelivery] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Build filters object
  const filters: SareeFilters = {
    search: search || undefined,
    types: selectedTypes.length > 0 ? selectedTypes : undefined,
    colors: selectedColors.length > 0 ? selectedColors : undefined,
    occasions: selectedOccasions.length > 0 ? selectedOccasions : undefined,
    patterns: selectedPatterns.length > 0 ? selectedPatterns : undefined,
    fabrics: selectedFabrics.length > 0 ? selectedFabrics : undefined,
    minPrice: priceRange[0] || undefined,
    maxPrice: priceRange[1] || undefined,
    showOutOfStock,
    onlyFastDelivery: onlyFastDelivery || undefined,
    sortBy,
    page: currentPage,
    limit: 12,
  };

  // Fetch sarees data
  const {
    data: sareesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["sarees", filters],
    queryFn: () => sareeAPI.getSarees(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ["filter-options"],
    queryFn: () => sareeAPI.getFilterOptions(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  // Handle filter changes
  const toggleFilter = (
    value: string,
    selectedValues: string[],
    setter: (values: string[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      setter(selectedValues.filter((v) => v !== value));
    } else {
      setter([...selectedValues, value]);
    }
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedTypes([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setSelectedPatterns([]);
    setSelectedFabrics([]);
    setPriceRange([0, 5000]);
    setShowOutOfStock(false);
    setOnlyFastDelivery(false);
    setCurrentPage(1);
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const sarees = sareesData?.sarees || [];
  const totalResults = sareesData?.total || 0;

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
            viewMode === "list" ? "flex flex-row" : ""
          }`}
        >
          <Skeleton
            className={`${
              viewMode === "list" ? "w-48 h-48" : "aspect-[3/4] w-full"
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
            We couldn't load the sarees. Please try again.
          </p>
          <Button onClick={() => refetch()}>
            <Loader2 className="h-4 w-4 mr-2" />
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
                Premium Sarees Collection
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
                placeholder="Search for your perfect saree..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
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
          {/* Sidebar Filters */}
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

              {/* Quick Filters */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fastDelivery"
                    checked={onlyFastDelivery}
                    onCheckedChange={(checked) =>
                      setOnlyFastDelivery(checked === true)
                    }
                  />
                  <label htmlFor="fastDelivery" className="text-sm font-medium">
                    Fast Delivery
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="outOfStock"
                    checked={showOutOfStock}
                    onCheckedChange={(checked) =>
                      setShowOutOfStock(checked === true)
                    }
                  />
                  <label htmlFor="outOfStock" className="text-sm font-medium">
                    Include Out of Stock
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    min={0}
                    step={100}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Filter Sections */}
              {filterOptions && (
                <>
                  {/* Saree Type */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Saree Type</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                      {filterOptions?.types?.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={() =>
                              toggleFilter(
                                type,
                                selectedTypes,
                                setSelectedTypes
                              )
                            }
                          />
                          <label htmlFor={`type-${type}`} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Color</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                      {filterOptions?.colors?.map((color) => (
                        <div
                          key={color}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() =>
                              toggleFilter(
                                color,
                                selectedColors,
                                setSelectedColors
                              )
                            }
                          />
                          <label htmlFor={`color-${color}`} className="text-sm">
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Occasion</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                      {filterOptions?.occasions?.map((occasion) => (
                        <div
                          key={occasion}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`occasion-${occasion}`}
                            checked={selectedOccasions.includes(occasion)}
                            onCheckedChange={() =>
                              toggleFilter(
                                occasion,
                                selectedOccasions,
                                setSelectedOccasions
                              )
                            }
                          />
                          <label
                            htmlFor={`occasion-${occasion}`}
                            className="text-sm"
                          >
                            {occasion}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pattern */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Pattern</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                      {filterOptions?.patterns?.map((pattern) => (
                        <div
                          key={pattern}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`pattern-${pattern}`}
                            checked={selectedPatterns.includes(pattern)}
                            onCheckedChange={() =>
                              toggleFilter(
                                pattern,
                                selectedPatterns,
                                setSelectedPatterns
                              )
                            }
                          />
                          <label
                            htmlFor={`pattern-${pattern}`}
                            className="text-sm"
                          >
                            {pattern}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fabric */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Fabric</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                      {filterOptions?.fabrics?.map((fabric) => (
                        <div
                          key={fabric}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`fabric-${fabric}`}
                            checked={selectedFabrics.includes(fabric)}
                            onCheckedChange={() =>
                              toggleFilter(
                                fabric,
                                selectedFabrics,
                                setSelectedFabrics
                              )
                            }
                          />
                          <label
                            htmlFor={`fabric-${fabric}`}
                            className="text-sm"
                          >
                            {fabric}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters */}
            {(selectedTypes.length > 0 ||
              selectedColors.length > 0 ||
              selectedOccasions.length > 0 ||
              selectedPatterns.length > 0 ||
              onlyFastDelivery ||
              search) && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Active Filters:</span>
                  {search && (
                    <Badge variant="secondary" className="gap-1">
                      Search: "{search}"
                      <button onClick={() => setSearch("")}>×</button>
                    </Badge>
                  )}
                  {selectedTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="gap-1">
                      {type}
                      <button
                        onClick={() =>
                          toggleFilter(type, selectedTypes, setSelectedTypes)
                        }
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {selectedColors.map((color) => (
                    <Badge key={color} variant="secondary" className="gap-1">
                      {color}
                      <button
                        onClick={() =>
                          toggleFilter(color, selectedColors, setSelectedColors)
                        }
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {selectedOccasions.map((occasion) => (
                    <Badge key={occasion} variant="secondary" className="gap-1">
                      {occasion}
                      <button
                        onClick={() =>
                          toggleFilter(
                            occasion,
                            selectedOccasions,
                            setSelectedOccasions
                          )
                        }
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {selectedPatterns.map((pattern) => (
                    <Badge key={pattern} variant="secondary" className="gap-1">
                      {pattern}
                      <button
                        onClick={() =>
                          toggleFilter(
                            pattern,
                            selectedPatterns,
                            setSelectedPatterns
                          )
                        }
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {onlyFastDelivery && (
                    <Badge variant="secondary" className="gap-1">
                      Fast Delivery
                      <button onClick={() => setOnlyFastDelivery(false)}>
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {isLoading ? (
              <LoadingSkeleton />
            ) : sarees.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No sarees found matching your criteria.
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
                {sarees.map((saree: Saree) => (
                  <Card
                    key={saree.id}
                    className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      !saree.inStock ? "opacity-60" : ""
                    } ${viewMode === "list" ? "flex flex-row" : ""}`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-lg ${
                        viewMode === "list"
                          ? "w-40 h-40 flex-shrink-0" // smaller square in list view
                          : "h-[220px] w-full" // fixed height in grid view
                      }`}
                    >
                      <img
                        src={
                          saree.images?.[0]
                            ? sareeAPI.getImageUrl(saree.images[0])
                            : "/placeholder.svg"
                        }
                        alt={saree.name}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />

                      {saree.discount && saree.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                          {saree.discount}% OFF
                        </Badge>
                      )}

                      {saree.fastDelivery && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                          Fast Delivery
                        </Badge>
                      )}

                      {!saree.inStock && (
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
                            {saree.name}
                          </h3>
                          {saree.rating > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 fill-current text-yellow-500" />
                              <span>{saree.rating}</span>
                              {saree.reviewCount > 0 && (
                                <span className="text-muted-foreground">
                                  ({saree.reviewCount})
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {saree.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {saree.type && (
                            <Badge variant="outline" className="text-xs">
                              {saree.type}
                            </Badge>
                          )}
                          {saree.occasion && (
                            <Badge variant="outline" className="text-xs">
                              {saree.occasion}
                            </Badge>
                          )}
                          {saree.pattern && (
                            <Badge variant="outline" className="text-xs">
                              {saree.pattern}
                            </Badge>
                          )}
                        </div>

                        {saree.brand && (
                          <div className="text-xs text-muted-foreground">
                            by {saree.brand}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-primary">
                            ₹{saree.price.toLocaleString()}
                          </span>
                          {saree.originalPrice &&
                            saree.originalPrice > saree.price && (
                              <span className="line-through text-sm text-muted-foreground">
                                ₹{saree.originalPrice.toLocaleString()}
                              </span>
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 gradient-primary"
                            disabled={!saree.inStock}
                            onClick={() => {
                              toast({
                                title: "Added to Cart",
                                description: `${saree.name} has been added to your cart.`,
                              });
                            }}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!saree.inStock}
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
            {sareesData && sareesData.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm">
                  Page {currentPage} of {sareesData.totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === sareesData.totalPages}
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

export default SareePage;
