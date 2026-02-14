import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
            GDG Hackathon 2026
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600">
            Built with Next.js 14, Supabase, and Tailwind CSS
          </p>

          {/* CTA */}
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started →</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>

          {/* Tech Stack Badge */}
          <Card className="mt-12 p-6">
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                ✓ Next.js 14.2.x
              </span>
              <span className="flex items-center gap-2">
                ✓ Supabase
              </span>
              <span className="flex items-center gap-2">
                ✓ Shadcn UI
              </span>
              <span className="flex items-center gap-2">
                ✓ TypeScript
              </span>
              <span className="flex items-center gap-2">
                ✓ Tailwind v4
              </span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
