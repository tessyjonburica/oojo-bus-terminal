// API wrapper for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    // Get token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      return {
        data: response.ok ? data : undefined,
        error: response.ok ? undefined : data.message || "An error occurred",
        status: response.status,
      }
    } catch (error) {
      return {
        error: "Network error occurred",
        status: 0,
      }
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string, name: string) {
    return this.request<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    })
  }

  // Bus endpoints
  async getBuses(priceFilter?: number) {
    const query = priceFilter ? `?maxPrice=${priceFilter}` : ""
    return this.request<any[]>(`/buses${query}`)
  }

  async bookBus(busId: string, seatNumber?: number) {
    return this.request<any>("/bookings", {
      method: "POST",
      body: JSON.stringify({ busId, seatNumber }),
    })
  }

  // Booking endpoints
  async getBookings() {
    return this.request<any[]>("/bookings")
  }

  async cancelBooking(bookingId: string) {
    return this.request<any>(`/bookings/${bookingId}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

// Demo data for development
export const DEMO_BUSES = [
  {
    id: "1",
    route: "Lagos → Abuja",
    price: 10000,
    departureTime: "08:00 AM",
    seats: 40,
    availableSeats: 25,
  },
  {
    id: "2",
    route: "Abuja → Kaduna",
    price: 5000,
    departureTime: "02:00 PM",
    seats: 30,
    availableSeats: 18,
  },
  {
    id: "3",
    route: "Lagos → Port Harcourt",
    price: 8000,
    departureTime: "06:00 AM",
    seats: 35,
    availableSeats: 12,
  },
]

export const DEMO_BOOKINGS = [
  {
    id: "1",
    busRoute: "Lagos → Abuja",
    seatNumber: 15,
    price: 10000,
    status: "active",
    bookingDate: "2024-01-15",
    departureTime: "08:00 AM",
  },
  {
    id: "2",
    busRoute: "Abuja → Kaduna",
    seatNumber: 8,
    price: 5000,
    status: "canceled",
    bookingDate: "2024-01-10",
    departureTime: "02:00 PM",
  },
]
