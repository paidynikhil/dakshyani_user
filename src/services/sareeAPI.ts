const API_BASE_URL = "https://dakshyani.onrender.com";

export interface Saree {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  type: string;
  color: string;
  occasion: string;
  pattern: string;
  fabric: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  fastDelivery: boolean;
  discount?: number;
}

export interface SareeFilters {
  search?: string;
  types?: string[];
  colors?: string[];
  occasions?: string[];
  patterns?: string[];
  fabrics?: string[];
  minPrice?: number;
  maxPrice?: number;
  showOutOfStock?: boolean;
  onlyFastDelivery?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface SareeResponse {
  sarees: Saree[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  types: string[];
  colors: string[];
  occasions: string[];
  patterns: string[];
  fabrics: string[];
}

class SareeAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private buildQueryString(filters: SareeFilters): string {
    const params = new URLSearchParams();

    if (filters.search?.trim()) params.append("search", filters.search);
    if (filters.types?.length) params.append("types", filters.types.join(","));
    if (filters.colors?.length) params.append("colors", filters.colors.join(","));
    if (filters.occasions?.length) params.append("occasions", filters.occasions.join(","));
    if (filters.patterns?.length) params.append("patterns", filters.patterns.join(","));
    if (filters.fabrics?.length) params.append("fabrics", filters.fabrics.join(","));
    if (typeof filters.minPrice === "number") params.append("minPrice", filters.minPrice.toString());
    if (typeof filters.maxPrice === "number") params.append("maxPrice", filters.maxPrice.toString());
    if (filters.showOutOfStock) params.append("showOutOfStock", "true");
    if (filters.onlyFastDelivery) params.append("onlyFastDelivery", "true");
    if (filters.sortBy?.trim()) params.append("sortBy", filters.sortBy);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    return params.toString();
  }

  async getSarees(filters: SareeFilters = {}): Promise<SareeResponse> {
    try {
      const queryString = this.buildQueryString(filters);
      const url = `${this.baseUrl}/v1/admin/sarees${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch sarees: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        sarees:
          result.data?.map((saree: any) => ({
            id: saree._id,
            name: saree.title,
            description: saree.description || "",
            price: saree.price || 0,
            originalPrice: saree.originalPrice,
            images: saree.image ? [this.getImageUrl(saree.image)] : [],
            type: saree.type || "",
            color: saree.color || "",
            occasion: saree.occasion || "",
            pattern: saree.pattern || "",
            fabric: saree.fabric || "",
            brand: saree.brand || "",
            rating: saree.rating || 0,
            reviewCount: saree.reviews || 0,
            inStock: saree.inStock !== false,
            fastDelivery: saree.fastDelivery || false,
            discount: saree.discount,
          })) || [],
        total: result.pagination?.total || 0,
        page: result.pagination?.page || 1,
        limit: result.pagination?.limit || 10,
        totalPages: result.pagination?.pages || 1,
      };
    } catch (error) {
      console.error("Error fetching sarees:", error);
      throw error;
    }
  }

  // ✅ Stop API call, just return hardcoded options
  async getFilterOptions(): Promise<FilterOptions> {
    return {
      types: ["Silk", "Cotton", "Georgette", "Handloom", "Chiffon", "Crepe", "Net"],
      colors: [ "Maroon", "Gold", "Silver", "Pastel", "Red", "Blue", "Green", "Yellow", "Pink", "Black", "White"],
      occasions: ["Wedding", "Party", "Casual", "Festival", "Office", "Traditional"],
      patterns: ["Floral", "Geometric", "Zari Work", "Embroidered", "Block Print", "Traditional", "Woven"],
      fabrics: ["Pure Silk", "Cotton", "Georgette", "Chiffon", "Crepe", "Art Silk", "Net"],
    };
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return "";
    if (imagePath.startsWith("https")) return imagePath;
    return `${this.baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  }
}

export const sareeAPI = new SareeAPI();
