"use client"

import { Bus, Ticket, Search } from "lucide-react"

interface EmptyStateProps {
  type: "buses" | "bookings" | "search"
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ type, title, description, actionLabel, onAction }: EmptyStateProps) {
  const getConfig = (type: string) => {
    switch (type) {
      case "buses":
        return {
          icon: Bus,
          defaultTitle: "No buses available",
          defaultDescription: "There are no buses matching your criteria at the moment.",
          defaultActionLabel: "Refresh",
        }
      case "bookings":
        return {
          icon: Ticket,
          defaultTitle: "No bookings yet",
          defaultDescription: "You haven't made any bus reservations yet.",
          defaultActionLabel: "Browse Buses",
        }
      case "search":
        return {
          icon: Search,
          defaultTitle: "No results found",
          defaultDescription: "Try adjusting your search criteria or browse all available buses.",
          defaultActionLabel: "Clear Filters",
        }
      default:
        return {
          icon: Bus,
          defaultTitle: "Nothing here",
          defaultDescription: "There's nothing to show at the moment.",
          defaultActionLabel: "Go Back",
        }
    }
  }

  const config = getConfig(type)
  const Icon = config.icon

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <Icon className="h-16 w-16 text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{title || config.defaultTitle}</h3>
      <p className="text-[var(--color-text-light)] mb-6 max-w-md mx-auto">{description || config.defaultDescription}</p>
      {onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionLabel || config.defaultActionLabel}
        </button>
      )}
    </div>
  )
}
