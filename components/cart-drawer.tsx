"use client"

import { useCart } from "./cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatTon } from "@/utils/ton"

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { items, updateQty, removeItem, subtotalTon } = useCart()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex h-[calc(100dvh-9rem)] flex-col">
          <div className="flex-1 space-y-3 overflow-auto pr-2">
            {items.length === 0 && (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            )}
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded border p-2">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                  <Image
                    src={
                      item.imageUrl ||
                      "/placeholder.svg?height=64&width=64&query=coffee%20cup%20thumbnail"
                     || "/placeholder.svg"}
                    alt={`${item.title} image`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate text-sm font-medium">{item.title}</div>
                    <button
                      className="rounded p-1 text-muted-foreground hover:bg-muted"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {formatTon(item.priceTon)} TON
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="rounded border p-1 hover:bg-muted"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm">{item.qty}</span>
                    <button
                      className="rounded border p-1 hover:bg-muted"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-2 border-t pt-3">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">{formatTon(subtotalTon)} TON</span>
            </div>
            <SheetFooter className="mt-2">
              <Button className="w-full" disabled={items.length === 0} onClick={() => onOpenChange(false)}>
                Continue to Checkout
              </Button>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
