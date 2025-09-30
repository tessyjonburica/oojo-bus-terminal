"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Home, Ticket, LogOut, Bus, Menu, X, User } from "lucide-react"
import { apiClient } from "@/lib/api"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("user_name") || "User"
      setUserName(name)
    }
  }, [])

  const handleLogout = () => {
    apiClient.clearToken()
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_name")
      localStorage.removeItem("user_email")
    }
    router.push("/login")
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/bookings", label: "Bookings", icon: Ticket },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Bus className="h-8 w-8 text-[var(--color-primary)]" />
            <span className="ml-2 text-xl font-bold text-[var(--color-primary)]">Oojo Bus Terminal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text)] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-[var(--color-text)]">
              <User className="h-4 w-4" />
              <span>{userName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-[var(--color-text)] hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-[var(--color-text)] bg-gray-50 rounded-lg">
                <User className="h-4 w-4" />
                <span>{userName}</span>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text)] hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
