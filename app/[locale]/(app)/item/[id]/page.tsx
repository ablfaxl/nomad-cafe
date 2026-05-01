"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { formatTon } from "@/utils/ton"
import { ArrowLeft, Plus, Star } from "lucide-react"
import { SAMPLE_MENU } from "../../menu-data"
import { useTranslations } from 'next-intl'

type Comment = {
  id: string
  phone: string
  name?: string
  text: string
  rating: number
  date: string
}

const SAMPLE_COMMENTS: Record<string, Comment[]> = {
  latte: [
    { id: "1", phone: "+1234567890", name: "Sarah", text: "Best latte in town!", rating: 5, date: "2025-01-15" },
    { id: "2", phone: "+9876543210", text: "Smooth and creamy, highly recommend", rating: 5, date: "2025-01-14" },
  ],
  americano: [
    {
      id: "3",
      phone: "+1122334455",
      name: "John",
      text: "Perfect strength, great taste",
      rating: 4,
      date: "2025-01-13",
    },
  ],
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null)

  React.useEffect(() => {
    Promise.resolve(params).then(setResolvedParams)
  }, [params])

  if (!resolvedParams) {
    return null
  }

  const item = SAMPLE_MENU.find((m) => m.id === resolvedParams.id)

  if (!item) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <ItemNotFound />
        <div className="text-center">
          <h2 className="text-2xl font-bold">Item not found</h2>
          <Button asChild className="mt-4">
            <Link href="/">Back to Menu</Link>
          </Button>
        </div>
      </div>
    )
  }

  return <ItemDetailClient item={item} />
}

<<<<<<< HEAD:app/[locale]/(app)/item/[id]/page.tsx
function ItemNotFound() {
  const t = useTranslations()
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">{t('item.notFound')}</h2>
      <Button asChild className="mt-4">
        <Link href="/">{t('menu.backToMenu')}</Link>
      </Button>
    </div>
  )
}

function ItemDetailClient({ item }: { item: typeof SAMPLE_MENU[0] }) {
  const { addItem } = useCart()
  const t = useTranslations()
function ItemDetailClient({ item }: { item: typeof SAMPLE_MENU[0] }) {
=======
function ItemDetailClient({ item }: { item: (typeof SAMPLE_MENU)[0] }) {
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/item/[id]/page.tsx
  const { addItem } = useCart()
  const [comments, setComments] = React.useState<Comment[]>(SAMPLE_COMMENTS[item.id] || [])
  const [phone, setPhone] = React.useState("")
  const [name, setName] = React.useState("")
  const [commentText, setCommentText] = React.useState("")
  const [rating, setRating] = React.useState(5)

  const discountedPrice = item.discount ? item.priceTon * (1 - item.discount / 100) : item.priceTon

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !commentText) return

    const newComment: Comment = {
      id: Date.now().toString(),
      phone,
      name: name || undefined,
      text: commentText,
      rating,
      date: new Date().toISOString().split("T")[0],
    }

    setComments((prev) => [newComment, ...prev])
    setPhone("")
    setName("")
    setCommentText("")
    setRating(5)
  }

  const itemTitle = t(`items.${item.id}.title`)
  const itemDescription = t(`items.${item.id}.description`)

  return (
    <main className="pb-8">
      <Button asChild variant="ghost" className="mb-4 gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Link>
      </Button>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={item.imageUrl || "/placeholder.svg?height=600&width=600&query=cafe+item"}
              alt={`${itemTitle} from ${t('app.title')}`}
              alt={`${item.title} from Nomad-Cafe`}
              fill
              className="object-cover"
              priority
            />
<<<<<<< HEAD:app/[locale]/(app)/item/[id]/page.tsx
            <Badge className="absolute left-4 top-4 bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {t('app.title')}
            </Badge>
            {item.discount && (
              <Badge className="absolute right-4 top-4 bg-secondary/90 text-secondary-foreground backdrop-blur-sm">
                -{item.discount}% {t('item.off')}
=======
            <Badge className="absolute left-3 top-3 bg-primary/90 text-xs text-primary-foreground backdrop-blur-sm sm:left-4 sm:top-4">
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/item/[id]/page.tsx
              Nomad-Cafe
            </Badge>
            {item.ageRestriction === "all-ages" && (
              <Badge className="absolute left-3 top-12 bg-green-500/90 text-xs text-white backdrop-blur-sm sm:left-4 sm:top-14">
                All Ages ✓
              </Badge>
            )}
            {item.discount && (
              <Badge className="absolute right-3 top-3 bg-secondary/90 text-xs text-secondary-foreground backdrop-blur-sm sm:right-4 sm:top-4">
                -{item.discount}% OFF
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
<<<<<<< HEAD:app/[locale]/(app)/item/[id]/page.tsx
            <h1 className="text-balance text-3xl font-bold">{itemTitle}</h1>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              {itemDescription}
            <h1 className="text-balance text-3xl font-bold">{item.title}</h1>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
=======
            <h1 className="text-balance text-2xl font-bold sm:text-3xl">{item.title}</h1>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/item/[id]/page.tsx
              {item.description}
            </p>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              {item.discount ? (
                <>
                  <span className="text-2xl font-bold text-primary sm:text-3xl">{formatTon(discountedPrice)}</span>
                  <span className="text-base text-muted-foreground line-through sm:text-lg">
                    {formatTon(item.priceTon)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary sm:text-3xl">{formatTon(item.priceTon)}</span>
              )}
            </div>
          </div>

          {item.ingredients && item.ingredients.length > 0 && (
            <div>
<<<<<<< HEAD:app/[locale]/(app)/item/[id]/page.tsx
              <h3 className="mb-2 text-lg font-semibold">{t('ingredients.title')}</h3>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient) => {
                  const ingredientKey = ingredient.toLowerCase().replace(/ /g, '_')
                  const translatedIngredient = t(`ingredients.${ingredientKey}`)
                  return (
                    <Badge key={ingredient} variant="secondary">
                      {translatedIngredient}
                    </Badge>
                  )
                })}
              <h3 className="mb-2 text-lg font-semibold">Ingredients</h3>
=======
              <h3 className="mb-2 text-base font-semibold sm:text-lg">Ingredients</h3>
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/item/[id]/page.tsx
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary" className="text-xs sm:text-sm">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.ageRestriction === "all-ages" && (
            <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
              <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Non-Alcoholic • Suitable for All Ages
              </div>
            </div>
          )}

          <Button
            onClick={() =>
<<<<<<< HEAD:app/[locale]/(app)/item/[id]/page.tsx
              addItem(
                { id: item.id, title: itemTitle, priceTon: item.priceTon, imageUrl: item.imageUrl },
                { id: item.id, title: item.title, priceTon: item.priceTon, imageUrl: item.imageUrl },
                1
              )
=======
              addItem({ id: item.id, title: item.title, priceTon: item.priceTon, imageUrl: item.imageUrl }, 1)
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/item/[id]/page.tsx
            }
            size="lg"
            className="brand-gradient gap-2 text-white"
            style={{ minHeight: "52px" }}
          >
            <Plus className="h-5 w-5" />
            {t('menu.addToCart')}
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">{t('reviews.title')}</h2>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('reviews.leaveReview')}</CardTitle>
        <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Leave a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <Label htmlFor="phone">{t('reviews.phoneNumber')} *</Label>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="name">{t('reviews.fullName')}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('reviews.fullName')}
                <Label htmlFor="name">Full Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="rating">{t('reviews.rating')}</Label>
                <Label htmlFor="rating">Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button key={r} type="button" onClick={() => setRating(r)} className="transition-colors">
                      <Star
                        className={`h-8 w-8 ${
                          r <= rating ? "fill-primary text-primary" : "fill-none text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="comment">{t('reviews.yourReview')} *</Label>
                <Textarea
                  id="comment"
                  placeholder={t('reviews.reviewPlaceholder')}
                <Label htmlFor="comment">Your Review *</Label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts about this item..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  rows={4}
                />
              </div>

<<<<<<< HEAD:app/[locale]/(app)/item/[id]/page.tsx
              <Button type="submit" className="w-full" style={{ minHeight: '48px' }}>
                {t('reviews.submitReview')}
=======
              <Button type="submit" className="w-full" style={{ minHeight: "48px" }}>
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3:app/(app)/item/[id]/page.tsx
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{comment.name || comment.phone}</div>
                    <div className="text-sm text-muted-foreground">{comment.date}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: comment.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-pretty leading-relaxed">{comment.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
