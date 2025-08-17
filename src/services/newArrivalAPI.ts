const API_BASE_URL = "https://dakshyani.onrender.com";

export interface NewArrival {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string; // <-- only sarees, lehengas
    brand: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    isNew: boolean;
    isBestseller: boolean;
    isFastDelivery: boolean;
    discount?: number;
}

export interface NewArrivalFilters {
    category?: "sarees" | "lehengas";
    page?: number;
    limit?: number;
}

export interface NewArrivalResponse {
    newArrivals: NewArrival[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

class NewArrivalAPI {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    private buildQueryString(filters: NewArrivalFilters): string {
        const params = new URLSearchParams();

        if (filters.category) params.append("category", filters.category);
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());

        return params.toString();
    }

    async getNewArrival(filters: NewArrivalFilters = {}): Promise<NewArrivalResponse> {
        try {
            const queryString = this.buildQueryString(filters);
            const url = `${this.baseUrl}/v1/admin/new-arrival${queryString ? `?${queryString}` : ""}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch new arrivals: ${response.statusText}`);
            }

            const result = await response.json();

            return {
                newArrivals:
                    result.data?.map((newArrival: any) => ({
                        id: newArrival._id,
                        name: newArrival.title,
                        description: newArrival.description || "",
                        price: newArrival.price || 0,
                        originalPrice: newArrival.originalPrice,
                        images: newArrival.image ? [this.getImageUrl(newArrival.image)] : [],
                        category: newArrival.category || "",
                        brand: newArrival.brand || "",
                        rating: newArrival.rating || 0,
                        reviewCount: newArrival.reviews || 0,
                        inStock: newArrival.inStock !== false,
                        isNew: newArrival.isNew || false,
                        isBestseller: newArrival.isBestseller || false,
                        isFastDelivery: newArrival.isFastDelivery || false,
                        discount: newArrival.discount,
                    })) || [],
                total: result.pagination?.total || 0,
                page: result.pagination?.page || 1,
                limit: result.pagination?.limit || 10,
                totalPages: result.pagination?.pages || 1,
            };
        } catch (error) {
            console.error("Error fetching new arrivals:", error);
            throw error;
        }
    }

    getImageUrl(imagePath: string): string {
        if (!imagePath) return "";
        if (imagePath.startsWith("https")) return imagePath;
        return `${this.baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
    }
}

export const newArrivalAPI = new NewArrivalAPI();
