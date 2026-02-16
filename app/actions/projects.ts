"use server"

import { createClient } from "@/lib/supabase/server"
import { TASKS, FIELD_CONFIG, type SimulationTask, type TaskField } from "@/lib/tasks"

export type ProjectType = "predefined" | "custom"
export type ProjectStatus = "in_progress" | "completed"

export interface UserProject {
    id: string
    title: string
    description: string
    field: TaskField
    fieldLabel: string
    type: ProjectType
    status: ProjectStatus
    lastActivity: string
    difficulty: string
    level: number
    duration: string
    tools: string[]
    clientPersona: string
    clientMood: string
    /** Only set for custom simulations */
    simulationId?: string
}

/**
 * Fetches all projects the authenticated user has interacted with.
 * Merges predefined tasks (from intern_progress) with custom simulations.
 */
export async function getUserProjects(): Promise<{
    projects: UserProject[]
    error?: string
}> {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return { projects: [], error: "Not authenticated" }

    // Fetch both sources in parallel
    const [progressResult, simulationsResult] = await Promise.all([
        supabase
            .from("intern_progress")
            .select("*")
            .eq("user_id", user.id)
            .order("last_activity_at", { ascending: false }),
        supabase
            .from("simulations")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false }),
    ])

    const projects: UserProject[] = []

    // --- Predefined tasks from intern_progress ---
    if (progressResult.data) {
        for (const row of progressResult.data) {
            const task = TASKS.find((t) => t.id === row.project_id)
            if (!task) continue // skip unknown project_ids

            projects.push({
                id: row.project_id,
                title: task.title,
                description: task.description,
                field: task.field,
                fieldLabel: FIELD_CONFIG[task.field]?.label ?? task.field,
                type: "predefined",
                status: row.status === "completed" ? "completed" : "in_progress",
                lastActivity: row.last_activity_at ?? row.created_at,
                difficulty: task.difficulty,
                level: task.level,
                duration: task.duration,
                tools: task.tools,
                clientPersona: task.clientPersona,
                clientMood: task.clientMood,
            })
        }
    }

    // --- Custom simulations ---
    if (simulationsResult.data) {
        for (const sim of simulationsResult.data) {
            const field = (sim.field as TaskField) ?? "fullstack"
            projects.push({
                id: `sim-${sim.id}`,
                title: sim.title ?? "Untitled Simulation",
                description: sim.description ?? "Custom AI-generated simulation",
                field,
                fieldLabel: FIELD_CONFIG[field]?.label ?? field,
                type: "custom",
                status: "in_progress", // custom simulations don't have a completed state yet
                lastActivity: sim.updated_at ?? sim.created_at,
                difficulty: sim.difficulty ?? "medium",
                level: sim.level ?? 1,
                duration: sim.duration ?? "Variable",
                tools: sim.tools ?? [],
                clientPersona: sim.client_persona ?? "AI Client",
                clientMood: sim.client_mood ?? "Neutral",
                simulationId: sim.id,
            })
        }
    }

    // Sort by most recent activity
    projects.sort(
        (a, b) =>
            new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    )

    return { projects }
}
