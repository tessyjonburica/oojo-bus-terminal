"use client"

import { useState, memo } from "react"
import { MapPin, Clock, Users, Ticket, Zap } from "lucide-react"

interface BusCardProps {
  bus: {
    id: string
    route: string
    price: number
    departureTime: string
    arrivalTime?: string
    duration?: string
    seats: number
    availableSeats: number
    busType?: string
    amenities?: string[]
  }
  onBook: (busId: string) => void
}

function BusCard({ bus, onBook }: BusCardProps) {
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
      minimumFractionDigits: 0,
    }).format(price)
  }

  const availabilityPercentage = (bus.availableSeats / bus.seats) * 100
  const isLowAvailability = availabilityPercentage < 30

  return (
    <div className="card p-6 hover:border-[var(--color-primary)] transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text)]">{bus.route}</h3>
            {bus.busType && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {bus.busType}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-[var(--color-text-light)] mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <div>
                <div className="font-medium text-[var(--color-text)]">{bus.departureTime}</div>
                {bus.duration && <div className="text-xs">{bus.duration}</div>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <div>
                <div className="font-medium text-[var(--color-text)]">
                  {bus.availableSeats}/{bus.seats}
                </div>
                <div className="text-xs">seats left</div>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <span className="text-2xl font-bold text-[var(--color-primary)]">{formatPrice(bus.price)}</span>
            </div>
          </div>

          {bus.amenities && bus.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {bus.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  <Zap className="h-3 w-3" />
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {isLowAvailability && bus.availableSeats > 0 && (
            <span className="text-xs text-orange-600 font-medium text-center">
              Only {bus.availableSeats} seats left!
            </span>
          )}

          <button
            onClick={handleBook}
            disabled={isBooking || bus.availableSeats === 0}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
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

export default memo(BusCard)
