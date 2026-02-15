import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Terminal, Github, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-card/30">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-primary" />
                            <span className="text-lg font-bold tracking-tight">
                                INTERNA<span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                            Building Senior Developers. The AI-Driven Virtual Internship
                            Simulator.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Platform
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#features"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#problem"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Why Interna
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/signup"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Changelog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                                aria-label="GitHub"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-border/40" />

                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        &copy; 2026 Interna. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                        Built for GDG Hackathon 2026
                    </p>
                </div>
            </div>
        </footer>
    )
}
