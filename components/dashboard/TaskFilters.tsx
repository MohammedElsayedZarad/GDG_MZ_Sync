"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

import { FIELD_CONFIG, type TaskField, type TaskDifficulty } from "@/lib/tasks"

interface TaskFiltersProps {
    selectedField: TaskField | "all"
    selectedDifficulty: TaskDifficulty | "all"
    searchQuery: string
    onFieldChange: (field: TaskField | "all") => void
    onDifficultyChange: (difficulty: TaskDifficulty | "all") => void
    onSearchChange: (query: string) => void
}

const DIFFICULTY_OPTIONS = [
    { value: "all" as const, label: "All Levels" },
    { value: "easy" as const, label: "Easy" },
    { value: "medium" as const, label: "Medium" },
    { value: "hard" as const, label: "Hard" },
]

export function TaskFilters({
    selectedField,
    selectedDifficulty,
    searchQuery,
    onFieldChange,
    onDifficultyChange,
    onSearchChange,
}: TaskFiltersProps) {
    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search simulations..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Field Filter Pills */}
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => onFieldChange("all")}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${selectedField === "all"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                >
                    All Fields
                </button>
                {Object.entries(FIELD_CONFIG).map(([key, config]) => {
                    const Icon = config.icon
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onFieldChange(key as TaskField)}
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${selectedField === key
                                ? `border-current ${config.color} ${config.bg}`
                                : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                                }`}
                        >
                            <Icon className="h-3 w-3" />
                            {config.label}
                        </button>
                    )
                })}
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
                {DIFFICULTY_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onDifficultyChange(opt.value)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${selectedDifficulty === opt.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
