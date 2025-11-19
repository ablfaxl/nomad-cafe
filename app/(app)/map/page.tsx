"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Target } from 'lucide-react'

type Cafe = {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  distance_m: number
  wallet_address: string
}

export default function MapPage() {
  const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>(null)
  const [cafes, setCafes] = React.useState<Cafe[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function locate() {
    setError(null)
    setLoading(true)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      setCoords({ lat, lng })
      const res = await fetch(`/api/cafes/nearest?lat=${lat}&lng=${lng}&limit=5`)
      const data: Cafe[] = await res.json()
      setCafes(data)
    } catch (e: any) {
      setError(e.message || "Failed to get location")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Nearest Cafes</h2>
        <Button onClick={locate} disabled={loading}>
          <Target className="mr-2 h-4 w-4" />
          {loading ? "Locating..." : "Use my location"}
        </Button>
      </div>

      {!coords && (
        <p className="mt-3 text-sm text-muted-foreground">
          Click “Use my location” to find nearby cafes.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <ul className="mt-5 space-y-3">
        {cafes.map((cafe) => (
          <li key={cafe.id} className="rounded border p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-medium">{cafe.name}</div>
                <div className="text-sm text-muted-foreground">{cafe.address}</div>
              </div>
              <div className="text-sm">
                {(cafe.distance_m / 1000).toFixed(2)} km
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <a
                className="inline-flex items-center rounded border px-3 py-1.5 text-sm hover:bg-muted"
                href={`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Directions
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
