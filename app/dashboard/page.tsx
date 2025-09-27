"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter } from "lucide-react"
import Navbar from "@/components/navbar"
import BusCard from "@/components/bus-card"
import { apiClient, DEMO_BUSES } from "@/lib/api"

export default function DashboardPage() {
  const [buses, setBuses] = useState(DEMO_BUSES)
  const [filteredBuses, setFilteredBuses] = useState(DEMO_BUSES)
  const [priceFilter, setPriceFilter] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (!token) {
      router.push("/login")
      return
    }

    loadBuses()
  }, [router])

  const loadBuses = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getBuses()
      if (response.data) {
        setBuses(response.data)
        setFilteredBuses(response.data)
      } else {
        // Use demo data if API fails
        setBuses(DEMO_BUSES)
        setFilteredBuses(DEMO_BUSES)
      }
    } catch (error) {
      // Use demo data on error
      setBuses(DEMO_BUSES)
      setFilteredBuses(DEMO_BUSES)
    } finally {
      setLoading(false)
    }
  }

  const handlePriceFilter = () => {
    if (!priceFilter) {
      setFilteredBuses(buses)
      return
    }

    const maxPrice = Number.parseFloat(priceFilter)
    if (isNaN(maxPrice)) {
      setFilteredBuses(buses)
      return
    }

    const filtered = buses.filter((bus) => bus.price <= maxPrice)
    setFilteredBuses(filtered)
  }

  const handleBookBus = async (busId: string) => {
    try {
      const response = await apiClient.bookBus(busId)

      if (response.data || response.status === 0) {
        setBookingSuccess("Booking successful! Check your bookings page.")
        // Update available seats locally for demo
        setBuses((prev) =>
          prev.map((bus) => (bus.id === busId ? { ...bus, availableSeats: Math.max(0, bus.availableSeats - 1) } : bus)),
        )
        setFilteredBuses((prev) =>
          prev.map((bus) => (bus.id === busId ? { ...bus, availableSeats: Math.max(0, bus.availableSeats - 1) } : bus)),
        )

        setTimeout(() => setBookingSuccess(""), 5000)
      } else {
        alert(response.error || "Booking failed")
      }
    } catch (error) {
      alert("An error occurred while booking")
    }
  }

  const clearFilter = () => {
    setPriceFilter("")
    setFilteredBuses(buses)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Available Buses</h1>
          <p className="text-[var(--color-text-light)]">Find and book your next bus journey</p>
        </div>

        {/* Price Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <label htmlFor="priceFilter" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Filter by Maximum Price
              </label>
              <div className="relative">
                <input
                  id="priceFilter"
                  type="number"
                  placeholder="Enter maximum price (₦)"
                  className="input-field pr-10"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handlePriceFilter()}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={handlePriceFilter} className="btn-primary flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </button>

              {priceFilter && (
                <button onClick={clearFilter} className="btn-secondary">
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {bookingSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
            {bookingSuccess}
          </div>
        )}

        {/* Bus Listings */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : filteredBuses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-light)] text-lg">No buses found matching your criteria.</p>
            {priceFilter && (
              <button onClick={clearFilter} className="btn-primary mt-4">
                Show All Buses
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBuses.map((bus) => (
              <BusCard key={bus.id} bus={bus} onBook={handleBookBus} />
            ))}
          </div>
        )}

        {/* Results Summary */}
        {!loading && (
          <div className="mt-8 text-center text-sm text-[var(--color-text-light)]">
            Showing {filteredBuses.length} of {buses.length} buses
            {priceFilter && ` (max price: ₦${priceFilter})`}
          </div>
        )}
      </main>
    </div>
  )
}
