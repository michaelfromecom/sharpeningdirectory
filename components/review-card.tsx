import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Review {
  id: string
  customer_name: string
  rating: number
  review_text: string
  service_type: string
  created_at: string
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-gray-900">{review.customer_name}</h4>
            {review.service_type && <p className="text-sm text-gray-600">Service: {review.service_type}</p>}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        {review.review_text && <p className="text-gray-700 mb-2">{review.review_text}</p>}
        <p className="text-xs text-gray-500">{formatDate(review.created_at)}</p>
      </CardContent>
    </Card>
  )
}
