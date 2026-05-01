"use client"

import * as React from "react"
import { Suspense } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { CartProvider, useCart } from "@/components/cart-context"
import { cn } from "@/lib/utils"
import { TonConnectUIProvider, TonConnectButton } from "@tonconnect/ui-react"
import { LoadingScreen } from "@/components/loading-screen"
<<<<<<< HEAD:app/[locale]/(app)/layout.tsx
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/language-switcher'
=======
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/layout.tsx

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <SidebarProvider defaultOpen={true}>
        <CartProvider>
          <Suspense fallback={<LoadingScreen />}>
            <div className="flex min-h-svh w-full max-w-full overflow-x-hidden">
              <AppSidebar />
              <SidebarInset className="max-w-full">
                <Header onOpenCart={() => setOpen(true)} />
                <div className="p-3 sm:p-4 md:p-6">{children}</div>
              </SidebarInset>
            </div>
            <CartDrawer open={open} onOpenChange={setOpen} />
          </Suspense>
        </CartProvider>
      </SidebarProvider>
    </TonConnectUIProvider>
  )
}

function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalQty } = useCart()
<<<<<<< HEAD:app/[locale]/(app)/layout.tsx
  const t = useTranslations()
=======
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/layout.tsx
  const [showSearch, setShowSearch] = React.useState(false)

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-1 px-2 md:gap-2 md:px-4">
        <SidebarTrigger />
<<<<<<< HEAD:app/[locale]/(app)/layout.tsx
        <div className="flex flex-1 items-center gap-2 overflow-hidden">
          <h1 className="truncate text-sm font-semibold md:text-lg">{t('app.title')}</h1>
          <div className="ml-auto flex items-center gap-2">
=======
        <div className="flex min-w-0 flex-1 items-center gap-1 md:gap-2">
          <h1 className="truncate text-sm font-semibold md:text-lg">Nomad-Cafe</h1>
          <div className="ml-auto flex items-center gap-1 md:gap-2">
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/layout.tsx
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 sm:hidden"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <div className={cn("transition-all", showSearch ? "flex" : "hidden sm:flex")}>
<<<<<<< HEAD:app/[locale]/(app)/layout.tsx
              <Input placeholder={t('menu.searchPlaceholder')} className="h-9 w-full sm:w-48 md:w-64" aria-label="Search menu" />
            </div>
            <LanguageSwitcher />
            <div className="flex items-center">
=======
              <Input placeholder="Search menu..." className="h-8 w-full sm:h-9 sm:w-48 md:w-64" aria-label="Search menu" />
            </div>
            <div className="flex shrink-0 items-center [&_button]:!h-8 [&_button]:!min-h-0 [&_button]:!px-2 [&_button]:!text-xs sm:[&_button]:!h-9 sm:[&_button]:!px-3">
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/layout.tsx
              <TonConnectButton />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCart}
              aria-label="Open cart"
              className="h-8 shrink-0 bg-transparent px-2 sm:h-9 sm:px-3"
            >
              <ShoppingCart className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">{t('cart.title').replace('Your ', '')}</span>
              <span
                className={cn(
                  "ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded bg-primary px-0.5 text-[10px] font-medium text-primary-foreground sm:ml-2 sm:h-5 sm:min-w-5 sm:px-1 sm:text-xs",
                  totalQty === 0 && "hidden",
                )}
                aria-label={`Items in cart: ${totalQty}`}
              >
                {totalQty}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
