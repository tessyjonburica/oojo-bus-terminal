interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "white" | "gray"
  className?: string
}

export default function LoadingSpinner({ size = "md", color = "primary", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const colorClasses = {
    primary: "border-[var(--color-primary)]",
    white: "border-white",
    gray: "border-gray-400",
  }

  return (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]} ${className}`} />
  )
}
