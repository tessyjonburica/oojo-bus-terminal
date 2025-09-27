"use client"

import type React from "react"

import { useState } from "react"
import { Check, Users, X } from "lucide-react"

interface BookingFormProps {
  bus: {
    id: string
    route: string
    price: number
    departureTime: string
    availableSeats: number
  }
  onConfirm: (busId: string, seatNumber?: number) => Promise<void>
  onCancel: () => void
  isOpen: boolean
}

export default function BookingForm({ bus, onConfirm, onCancel, isOpen }: BookingFormProps) {
  const [seatNumber, setSeatNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const seat = seatNumber ? Number.parseInt(seatNumber, 10) : undefined

      if (seat && (seat < 1 || seat > 50)) {
        setError("Please enter a valid seat number (1-50)")
        setIsSubmitting(false)
        return
      }

      await onConfirm(bus.id, seat)
      setSeatNumber("")
      onCancel() // Close the form
    } catch (err) {
      setError("Failed to confirm booking")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Confirm Booking</h3>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-[var(--color-text)] mb-2">{bus.route}</h4>
              <div className="text-sm text-[var(--color-text-light)] space-y-1">
                <p>Departure: {bus.departureTime}</p>
                <p>Available Seats: {bus.availableSeats}</p>
                <p className="text-lg font-bold text-[var(--color-primary)]">Price: {formatPrice(bus.price)}</p>
              </div>
            </div>

            <div>
              <label htmlFor="seatNumber" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Seat Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="seatNumber"
                  type="number"
                  min="1"
                  max="50"
                  className="input-field pl-10"
                  placeholder="Leave empty for auto-assignment"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                />
              </div>
              <p className="text-xs text-[var(--color-text-light)] mt-1">
                If not specified, a seat will be automatically assigned
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={onCancel} className="btn-secondary flex-1" disabled={isSubmitting}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
