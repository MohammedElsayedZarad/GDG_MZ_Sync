"use client"

import { Clock, Zap, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
    type SimulationTask,
    FIELD_CONFIG,
    DIFFICULTY_CONFIG,
} from "@/lib/tasks"

interface TaskCardProps {
    task: SimulationTask
}

export function TaskCard({ task }: TaskCardProps) {
    const fieldConfig = FIELD_CONFIG[task.field]
    const diffConfig = DIFFICULTY_CONFIG[task.difficulty]
    const FieldIcon = fieldConfig.icon

    return (
        <Card className="group border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
            <CardContent className="flex flex-col gap-4 p-5">
                {/* Header: Field + Difficulty */}
                <div className="flex items-center justify-between">
                    <div
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${fieldConfig.bg} ${fieldConfig.color}`}
                    >
                        <FieldIcon className="h-3 w-3" />
                        {fieldConfig.label}
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full ${i < diffConfig.dots
                                        ? diffConfig.color.replace("text-", "bg-")
                                        : "bg-muted"
                                    }`}
                            />
                        ))}
                        <span
                            className={`ml-1 text-xs ${diffConfig.color}`}
                        >
                            {diffConfig.label}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold leading-tight">
                    {task.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {task.description}
                </p>

                {/* Client Persona */}
                <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-muted/20 px-3 py-2">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-xs">
                        <span className="text-muted-foreground">Client: </span>
                        <span className="font-medium">{task.clientPersona}</span>
                    </span>
                    <Badge
                        variant="secondary"
                        className="ml-auto text-[10px]"
                    >
                        {task.clientMood}
                    </Badge>
                </div>

                {/* Footer: Duration + Tools + CTA */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {task.duration}
                        </div>
                        <div className="flex gap-1">
                            {task.tools.slice(0, 2).map((tool) => (
                                <span
                                    key={tool}
                                    className="rounded bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                >
                                    {tool}
                                </span>
                            ))}
                            {task.tools.length > 2 && (
                                <span className="rounded bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                    +{task.tools.length - 2}
                                </span>
                            )}
                        </div>
                    </div>
                    <Button
                        size="sm"
                        className="h-8 gap-1 text-xs opacity-80 transition-opacity group-hover:opacity-100"
                    >
                        Start
                        <ArrowRight className="h-3 w-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
