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
export const DEMO_USERS = [
  {
    email: "john.adebayo@oojo.com",
    password: "Lagos2024!",
    name: "John Adebayo",
    token: "demo-token-john",
  },
  {
    email: "sarah.okonkwo@oojo.com",
    password: "Abuja2024!",
    name: "Sarah Okonkwo",
    token: "demo-token-sarah",
  },
]

export const DEMO_BUSES = [
  {
    id: "1",
    route: "Lagos → Abuja",
    price: 12000,
    departureTime: "06:00 AM",
    arrivalTime: "04:00 PM",
    duration: "10 hours",
    seats: 45,
    availableSeats: 28,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port", "Reclining Seats"],
  },
  {
    id: "2",
    route: "Lagos → Abuja",
    price: 15000,
    departureTime: "08:00 PM",
    arrivalTime: "06:00 AM",
    duration: "10 hours",
    seats: 40,
    availableSeats: 15,
    busType: "VIP",
    amenities: ["AC", "WiFi", "Charging Port", "Reclining Seats", "Entertainment"],
  },
  {
    id: "3",
    route: "Abuja → Lagos",
    price: 12000,
    departureTime: "07:00 AM",
    arrivalTime: "05:00 PM",
    duration: "10 hours",
    seats: 45,
    availableSeats: 32,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port"],
  },
  {
    id: "4",
    route: "Lagos → Port Harcourt",
    price: 9000,
    departureTime: "06:30 AM",
    arrivalTime: "02:30 PM",
    duration: "8 hours",
    seats: 40,
    availableSeats: 18,
    busType: "Standard",
    amenities: ["AC", "Charging Port"],
  },
  {
    id: "5",
    route: "Port Harcourt → Lagos",
    price: 9000,
    departureTime: "07:00 AM",
    arrivalTime: "03:00 PM",
    duration: "8 hours",
    seats: 40,
    availableSeats: 22,
    busType: "Standard",
    amenities: ["AC", "Charging Port"],
  },
  {
    id: "6",
    route: "Abuja → Kaduna",
    price: 4500,
    departureTime: "08:00 AM",
    arrivalTime: "10:30 AM",
    duration: "2.5 hours",
    seats: 30,
    availableSeats: 12,
    busType: "Standard",
    amenities: ["AC"],
  },
  {
    id: "7",
    route: "Kaduna → Abuja",
    price: 4500,
    departureTime: "02:00 PM",
    arrivalTime: "04:30 PM",
    duration: "2.5 hours",
    seats: 30,
    availableSeats: 8,
    busType: "Standard",
    amenities: ["AC"],
  },
  {
    id: "8",
    route: "Lagos → Ibadan",
    price: 3500,
    departureTime: "09:00 AM",
    arrivalTime: "11:30 AM",
    duration: "2.5 hours",
    seats: 35,
    availableSeats: 20,
    busType: "Standard",
    amenities: ["AC"],
  },
  {
    id: "9",
    route: "Ibadan → Lagos",
    price: 3500,
    departureTime: "03:00 PM",
    arrivalTime: "05:30 PM",
    duration: "2.5 hours",
    seats: 35,
    availableSeats: 25,
    busType: "Standard",
    amenities: ["AC"],
  },
  {
    id: "10",
    route: "Lagos → Benin City",
    price: 7500,
    departureTime: "07:00 AM",
    arrivalTime: "01:00 PM",
    duration: "6 hours",
    seats: 40,
    availableSeats: 16,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port"],
  },
  {
    id: "11",
    route: "Benin City → Lagos",
    price: 7500,
    departureTime: "08:00 AM",
    arrivalTime: "02:00 PM",
    duration: "6 hours",
    seats: 40,
    availableSeats: 19,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port"],
  },
  {
    id: "12",
    route: "Abuja → Kano",
    price: 8000,
    departureTime: "06:00 AM",
    arrivalTime: "01:00 PM",
    duration: "7 hours",
    seats: 45,
    availableSeats: 30,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port"],
  },
  {
    id: "13",
    route: "Kano → Abuja",
    price: 8000,
    departureTime: "07:00 AM",
    arrivalTime: "02:00 PM",
    duration: "7 hours",
    seats: 45,
    availableSeats: 27,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port"],
  },
  {
    id: "14",
    route: "Lagos → Enugu",
    price: 10000,
    departureTime: "06:00 AM",
    arrivalTime: "03:00 PM",
    duration: "9 hours",
    seats: 40,
    availableSeats: 14,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port", "Reclining Seats"],
  },
  {
    id: "15",
    route: "Enugu → Lagos",
    price: 10000,
    departureTime: "07:00 AM",
    arrivalTime: "04:00 PM",
    duration: "9 hours",
    seats: 40,
    availableSeats: 11,
    busType: "Executive",
    amenities: ["AC", "WiFi", "Charging Port", "Reclining Seats"],
  },
]

export const DEMO_BOOKINGS = [
  {
    id: "1",
    busRoute: "Lagos → Abuja",
    seatNumber: 15,
    price: 12000,
    status: "active",
    bookingDate: "2024-02-15",
    departureTime: "06:00 AM",
    busType: "Executive",
  },
  {
    id: "2",
    busRoute: "Port Harcourt → Lagos",
    seatNumber: 8,
    price: 9000,
    status: "active",
    bookingDate: "2024-02-20",
    departureTime: "07:00 AM",
    busType: "Standard",
  },
  {
    id: "3",
    busRoute: "Abuja → Kaduna",
    seatNumber: 12,
    price: 4500,
    status: "canceled",
    bookingDate: "2024-01-28",
    departureTime: "08:00 AM",
    busType: "Standard",
  },
  {
    id: "4",
    busRoute: "Lagos → Ibadan",
    seatNumber: 5,
    price: 3500,
    status: "active",
    bookingDate: "2024-02-18",
    departureTime: "09:00 AM",
    busType: "Standard",
  },
  {
    id: "5",
    busRoute: "Lagos → Enugu",
    seatNumber: 22,
    price: 10000,
    status: "canceled",
    bookingDate: "2024-01-15",
    departureTime: "06:00 AM",
    busType: "Executive",
  },
]
