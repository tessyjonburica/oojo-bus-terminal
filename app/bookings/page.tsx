"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Clock, Users, Trash2, CheckCircle, XCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import { apiClient, DEMO_BOOKINGS } from "@/lib/api"

interface Booking {
  id: string
  busRoute: string
  seatNumber: number
  price: number
  status: "active" | "canceled"
  bookingDate: string
  departureTime: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(DEMO_BOOKINGS)
  const [loading, setLoading] = useState(false)
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (!token) {
      router.push("/login")
      return
    }

    loadBookings()
  }, [router])

  const loadBookings = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getBookings()
      if (response.data) {
        setBookings(response.data)
      } else {
        // Use demo data if API fails
        setBookings(DEMO_BOOKINGS)
      }
    } catch (error) {
      // Use demo data on error
      setBookings(DEMO_BOOKINGS)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return
    }

    setCancelingId(bookingId)
    try {
      const response = await apiClient.cancelBooking(bookingId)

      if (response.data || response.status === 0) {
        // Update booking status locally for demo
        setBookings((prev) =>
          prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "canceled" as const } : booking)),
        )
      } else {
        alert(response.error || "Failed to cancel booking")
      }
    } catch (error) {
      alert("An error occurred while canceling the booking")
    } finally {
      setCancelingId(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    )
  }

  const getStatusText = (status: string) => {
    return status === "active" ? "Active" : "Canceled"
  }

  const getStatusBadgeClass = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200"
  }

  const activeBookings = bookings.filter((booking) => booking.status === "active")
  const canceledBookings = bookings.filter((booking) => booking.status === "canceled")

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">My Bookings</h1>
          <p className="text-[var(--color-text-light)]">Manage your bus reservations</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-light)] text-lg mb-4">You don't have any bookings yet.</p>
            <button onClick={() => router.push("/dashboard")} className="btn-primary">
              Browse Buses
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
                  Active Bookings ({activeBookings.length})
                </h2>
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="card p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
                            <h3 className="text-lg font-semibold text-[var(--color-text)]">{booking.busRoute}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                                booking.status,
                              )}`}
                            >
                              <div className="flex items-center gap-1">
                                {getStatusIcon(booking.status)}
                                {getStatusText(booking.status)}
                              </div>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[var(--color-text-light)]">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>Seat {booking.seatNumber}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{booking.departureTime}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(booking.bookingDate)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-[var(--color-primary)]">
                                {formatPrice(booking.price)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={cancelingId === booking.id}
                            className="btn-danger flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {cancelingId === booking.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4" />
                                <span>Cancel</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Canceled Bookings */}
            {canceledBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
                  Canceled Bookings ({canceledBookings.length})
                </h2>
                <div className="space-y-4">
                  {canceledBookings.map((booking) => (
                    <div key={booking.id} className="card p-6 opacity-75">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-600">{booking.busRoute}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                                booking.status,
                              )}`}
                            >
                              <div className="flex items-center gap-1">
                                {getStatusIcon(booking.status)}
                                {getStatusText(booking.status)}
                              </div>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>Seat {booking.seatNumber}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{booking.departureTime}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(booking.bookingDate)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-500">{formatPrice(booking.price)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {!loading && bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Booking Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[var(--color-primary)]">{bookings.length}</div>
                <div className="text-sm text-[var(--color-text-light)]">Total Bookings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{activeBookings.length}</div>
                <div className="text-sm text-[var(--color-text-light)]">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{canceledBookings.length}</div>
                <div className="text-sm text-[var(--color-text-light)]">Canceled</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
