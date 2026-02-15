import Link from "next/link"
import { Terminal, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

import { signout } from "@/app/(auth)/actions"

interface DashboardNavbarProps {
    userEmail: string
    userName: string
}

export function DashboardNavbar({ userEmail, userName }: DashboardNavbarProps) {
    const initials = userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold tracking-tight">
                        INTERNA<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium">{userName}</p>
                            <p className="text-xs text-muted-foreground">
                                {userEmail}
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {initials}
                        </div>
                    </div>

                    {/* Sign Out */}
                    <form action={signout}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    )
}
