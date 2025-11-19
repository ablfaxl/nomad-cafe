"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import * as React from "react"
import { PaymentSheet } from "@/components/payment-sheet"
import { formatTon } from "@/utils/ton"

type MenuItem = {
  id: string
  title: string
  description: string
  priceTon: number
  imageUrl?: string
  category: string
}

const SAMPLE_MENU: MenuItem[] = [
  {
    id: "latte",
    title: "Caffè Latte",
    description: "Rich espresso with steamed milk",
    priceTon: 0.85,
    imageUrl: "/placeholder.svg?height=160&width=160",
    category: "Coffee",
  },
  {
    id: "americano",
    title: "Americano",
    description: "Smooth espresso diluted with hot water",
    priceTon: 0.65,
    imageUrl: "/placeholder.svg?height=160&width=160",
    category: "Coffee",
  },
  {
    id: "croissant",
    title: "Butter Croissant",
    description: "Flaky, buttery pastry",
    priceTon: 0.45,
    imageUrl: "/placeholder.svg?height=160&width=160",
    category: "Bakery",
  },
  {
    id: "matcha",
    title: "Matcha Latte",
    description: "Ceremonial matcha with milk",
    priceTon: 0.9,
    imageUrl: "/placeholder.svg?height=160&width=160",
    category: "Tea",
  },
]

export default function Page() {
  const { addItem, subtotalTon } = useCart()
  const [openPay, setOpenPay] = React.useState(false)
  const [category, setCategory] = React.useState<string>("All")

  const categories = React.useMemo(() => ["All", ...new Set(SAMPLE_MENU.map((m) => m.category))], [])
  const filtered = SAMPLE_MENU.filter((m) => category === "All" || m.category === category)

  return (
    <main className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Menu</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="text-sm text-muted-foreground">
            Category
          </label>
          <select
            id="category"
            className="h-9 rounded border bg-background px-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group rounded-lg border p-3 transition-shadow hover:shadow"
          >
            <div className="relative h-40 w-full overflow-hidden rounded">
              <Image
                src={item.imageUrl || "/placeholder.svg?height=160&width=160&query=cafe%20item"}
                alt={`${item.title} image`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-medium">{item.title}</h3>
                <div className="shrink-0 text-sm font-semibold">
                  {formatTon(item.priceTon)} TON
                </div>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <div className="mt-3">
              <Button
                onClick={() =>
                  addItem(
                    { id: item.id, title: item.title, priceTon: item.priceTon, imageUrl: item.imageUrl },
                    1
                  )
                }
                className="w-full"
              >
                Add to cart
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="sticky bottom-4 mt-8 flex justify-center">
        <Button
          size="lg"
          className="w-full max-w-md"
          disabled={subtotalTon === 0}
          onClick={() => setOpenPay(true)}
        >
          Pay {formatTon(subtotalTon)} TON
        </Button>
      </div>

      <PaymentSheet open={openPay} onOpenChange={setOpenPay} />
    </main>
  )
}
