"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Bus } from "lucide-react"
import { apiClient, DEMO_USERS } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Login attempt with email:", email)
    console.log(
      "[v0] Available demo users:",
      DEMO_USERS.map((u) => ({ email: u.email, password: u.password })),
    )

    const demoUser = DEMO_USERS.find((user) => user.email === email && user.password === password)

    console.log("[v0] Demo user found:", demoUser ? "Yes" : "No")

    if (demoUser) {
      apiClient.setToken(demoUser.token)
      if (typeof window !== "undefined") {
        localStorage.setItem("user_name", demoUser.name)
        localStorage.setItem("user_email", demoUser.email)
      }
      router.push("/dashboard")
      return
    }

    try {
      const response = await apiClient.login(email, password)

      if (response.data?.token) {
        apiClient.setToken(response.data.token)
        if (typeof window !== "undefined" && response.data.user) {
          localStorage.setItem("user_name", response.data.user.name)
          localStorage.setItem("user_email", response.data.user.email)
        }
        router.push("/dashboard")
      } else {
        setError(response.error || "Login failed")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Bus className="h-12 w-12 text-green-700" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Oojo Bus Terminal</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field-with-icon"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field-with-icon"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-green-700 hover:text-green-600">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
