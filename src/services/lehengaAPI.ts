const API_BASE_URL = "https://dakshyani.onrender.com";

export interface Lehenga {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  style: string;
  occasion: string;
  workTypes: string;
  color: string;
  sizes: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  isFastDelivery: boolean;
  discount?: number;
}

export interface LehengaFilters {
  search?: string;
  styles?: string[];
  occasions?: string[];
  workTypes?: string[];
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isFastDelivery?: boolean;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface LehengaResponse {
  lehengas: Lehenga[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  styles: string[];
  occasions: string[];
  workTypes: string[];
  colors: string[];
  sizes: string[];
}

class LehengaAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private buildQueryString(filters: LehengaFilters): string {
    const params = new URLSearchParams();

    if (filters.search?.trim()) params.append("search", filters.search);
    if (filters.styles?.length) params.append("styles", filters.styles.join(","));
    if (filters.colors?.length) params.append("colors", filters.colors.join(","));
    if (filters.occasions?.length) params.append("occasions", filters.occasions.join(","));
    if (filters.workTypes?.length) params.append("workTypes", filters.workTypes.join(","));
    if (filters.sizes?.length) params.append("sizes", filters.sizes.join(","));
      if (typeof filters.minPrice === "number") params.append("minPrice", filters.minPrice.toString());
    if (typeof filters.maxPrice === "number") params.append("maxPrice", filters.maxPrice.toString());
    if (filters.inStock) params.append("inStock", "true");
    if (filters.isBestseller) params.append("isBestseller", "true");
    if (filters.isNew) params.append("isNew", "true");
    if (filters.isFastDelivery) params.append("isFastDelivery", "true");
    if (filters.sortBy?.trim()) params.append("sortBy", filters.sortBy);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    return params.toString();
  }

  async getLehengas(filters: LehengaFilters = {}): Promise<LehengaResponse> {
    try {
      const queryString = this.buildQueryString(filters);
      const url = `${this.baseUrl}/v1/admin/lehenga${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch lehengas: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        lehengas:
          result.data?.map((lehenga: any) => ({
            id: lehenga._id,
            name: lehenga.title,
            description: lehenga.description || "",
            price: lehenga.price || 0,
            originalPrice: lehenga.originalPrice,
            images: lehenga.image ? [this.getImageUrl(lehenga.image)] : [],
            styles: lehenga.styles || "",
            occasion: lehenga.occasion || "",
            workTypes: lehenga.workTypes || "",
            color: lehenga.color || "",
            sizes: lehenga.sizes || [],
            brand: lehenga.brand || "",
            rating: lehenga.rating || 0,
            reviewCount: lehenga.reviews || 0,
            inStock: lehenga.inStock !== false,
            isNew: lehenga.isNew || false,
            isBestseller: lehenga.isBestseller || false,
            isFastDelivery: lehenga.isFastDelivery || false,
            discount: lehenga.discount,
          })) || [],
        total: result.pagination?.total || 0,
        page: result.pagination?.page || 1,
        limit: result.pagination?.limit || 10,
        totalPages: result.pagination?.pages || 1,
      };
    } catch (error) {
      console.error("Error fetching lehengas:", error);
      throw error;
    }
  }

  async getFilterOptions(): Promise<FilterOptions> {
    return {
      styles: ["A-line", "Mermaid", "Sharara", "Anarkali"],
      occasions: ["Wedding", "Reception", "Festival", "Party", "Sangeet"],
      workTypes: ["Embroidered", "Zari Work", "Stone Work", "Thread Work", "Sequin Work"],
      colors: ["Red", "Pink", "Blue", "Green", "Gold", "Black", "White", "Maroon"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Free Size"],
    };
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return "";
    if (imagePath.startsWith("https")) return imagePath;
    return `${this.baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  }
}

export const lehengaAPI = new LehengaAPI();
