"use client"

import { Badge } from "@/components/ui/badge"
import {
    BookOpen,
    Briefcase,
    AlertTriangle,
    CheckCircle2,
    XCircle,
} from "lucide-react"

const comparisons = [
    {
        university: "Problems have a single correct answer",
        realWorld: "Problems have deadlines, technical debt, and human ego",
        iconUni: BookOpen,
        iconReal: Briefcase,
    },
    {
        university: "Models built in clean Jupyter Notebooks",
        realWorld: "Systems crash at 3 AM with messy production data",
        iconUni: BookOpen,
        iconReal: AlertTriangle,
    },
    {
        university: "You explain to professors who already understand",
        realWorld: "You explain to stakeholders who don't speak your jargon",
        iconUni: BookOpen,
        iconReal: Briefcase,
    },
    {
        university: "Grade = output quality",
        realWorld: "Success = stakeholder satisfaction + deployed system",
        iconUni: BookOpen,
        iconReal: Briefcase,
    },
]

export function RealityCheck() {
    return (
        <section id="problem" className="relative py-24 sm:py-32">
            {/* Background accent */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-destructive/5 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <Badge
                        variant="outline"
                        className="mb-6 border-destructive/30 bg-destructive/5 text-destructive"
                    >
                        <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                        The Reality Check
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        &ldquo;We&apos;ve decided to proceed with{" "}
                        <span className="text-destructive">other candidates</span>.&rdquo;
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                        The most soul-crushing sentence a fresh graduate hears. You have the
                        degree, the GPA, the certifications. But are you ready for the real
                        world?
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="mt-16 grid gap-6 lg:grid-cols-2">
                    {/* University Column */}
                    <div className="space-y-4">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                <BookOpen className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    In The Classroom
                                </h3>
                            </div>
                        </div>
                        {comparisons.map((item, i) => (
                            <div
                                key={`uni-${i}`}
                                className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5 transition-colors hover:border-border"
                            >
                                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/50" />
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {item.university}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Real World Column */}
                    <div className="space-y-4">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Briefcase className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                                    In The Real World
                                </h3>
                            </div>
                        </div>
                        {comparisons.map((item, i) => (
                            <div
                                key={`real-${i}`}
                                className="group flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 transition-colors hover:border-primary/40"
                            >
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                <p className="text-sm leading-relaxed text-foreground">
                                    {item.realWorld}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom callout */}
                <div className="mx-auto mt-16 max-w-2xl text-center">
                    <p className="font-mono text-sm text-muted-foreground">
                        <span className="text-primary"> &gt;</span> Interna bridges this gap.
                        No more &quot;Notebook Trap.&quot; No more &quot;Jargon Barrier.&quot;
                    </p>
                </div>
            </div>
        </section>
    )
}
