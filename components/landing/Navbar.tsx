"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold tracking-tight">
                        INTERNA<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center gap-8 md:flex">
                    <a
                        href="#problem"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        The Problem
                    </a>
                    <a
                        href="#features"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Features
                    </a>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/signup">Start Free</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
