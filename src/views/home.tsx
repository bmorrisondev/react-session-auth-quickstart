import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription } from "@/components/ui/card"
import { Github } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <main className="container mx-auto px-4 py-16 space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            React Session Auth
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Quickstart Template
            </span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A minimal template demonstrating session-based authentication using React, Express, and Neon PostgreSQL.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open('https://github.com/bmorrisondev/react-session-auth-quickstart', '_blank')}
            >
              <Github className="mr-2 h-4 w-4" /> View on GitHub
            </Button>
          </div>
        </section>

        <Card className="border-purple-200 bg-white/80 backdrop-blur-sm shadow-md max-w-2xl mx-auto">
          <CardHeader>
            <CardDescription className="text-gray-600 space-y-2">
              <p>🥞 Full-stack authentication implementation</p>
              <p>🔒 Secure session management with HTTP-only cookies</p>
              <p>📦 Built with React, Express, and Neon PostgreSQL</p>
              <p>🎨 Styled with Tailwind CSS and shadcn/ui</p>
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  )
}
