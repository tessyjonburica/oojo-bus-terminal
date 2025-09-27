"use client"

import { useState } from "react"
import { MapPin, Clock, Users, Ticket } from "lucide-react"

interface BusCardProps {
  bus: {
    id: string
    route: string
    price: number
    departureTime: string
    seats: number
    availableSeats: number
  }
  onBook: (busId: string) => void
}

export default function BusCard({ bus, onBook }: BusCardProps) {
  const [isBooking, setIsBooking] = useState(false)

  const handleBook = async () => {
    setIsBooking(true)
    try {
      await onBook(bus.id)
    } finally {
      setIsBooking(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price)
  }

  return (
    <div className="card p-6 hover:border-[var(--color-primary)] transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text)]">{bus.route}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[var(--color-text-light)]">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{bus.departureTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                {bus.availableSeats}/{bus.seats} seats
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[var(--color-primary)]">{formatPrice(bus.price)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleBook}
            disabled={isBooking || bus.availableSeats === 0}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBooking ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <Ticket className="h-4 w-4" />
                <span>{bus.availableSeats === 0 ? "Sold Out" : "Book Now"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
