import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

interface StatusBadgeProps {
  status: "active" | "canceled" | "pending" | "completed"
  showIcon?: boolean
  size?: "sm" | "md"
}

export default function StatusBadge({ status, showIcon = true, size = "md" }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          icon: CheckCircle,
          text: "Active",
          className: "bg-green-100 text-green-800 border-green-200",
        }
      case "canceled":
        return {
          icon: XCircle,
          text: "Canceled",
          className: "bg-red-100 text-red-800 border-red-200",
        }
      case "pending":
        return {
          icon: Clock,
          text: "Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        }
      case "completed":
        return {
          icon: CheckCircle,
          text: "Completed",
          className: "bg-blue-100 text-blue-800 border-blue-200",
        }
      default:
        return {
          icon: AlertCircle,
          text: "Unknown",
          className: "bg-gray-100 text-gray-800 border-gray-200",
        }
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon
  const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm"
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4"

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium border ${sizeClasses} ${config.className}`}
    >
      {showIcon && <Icon className={iconSize} />}
      {config.text}
    </span>
  )
}
