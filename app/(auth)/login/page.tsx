"use client"

import { useTransition } from "react"
import Link from "next/link"
import { Terminal, Loader2, Mail, Lock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { login } from "../actions"

export default function LoginPage() {
    const [isPending, startTransition] = useTransition()

    function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await login(formData)

            if (result?.error) {
                toast.error(result.error)
            }
        })
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center px-4">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <Link
                    href="/"
                    className="mb-8 flex items-center justify-center gap-2"
                >
                    <Terminal className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">
                        INTERNA<span className="text-primary">.</span>
                    </span>
                </Link>

                <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                            Welcome back
                        </CardTitle>
                        <CardDescription>
                            Sign in to continue your internship
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        disabled={isPending}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Min. 6 characters"
                                        required
                                        disabled={isPending}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-xs text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-primary underline-offset-4 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>

                <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                    Built for GDG Hackathon 2026
                </p>
            </div>
        </div>
    )
}
