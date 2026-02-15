"use client"

import type { SimulationTask } from "@/lib/tasks"
import { ProjectChat } from "./ProjectChat"
import { ProjectIDE } from "./ProjectIDE"

interface ProjectViewProps {
  task: SimulationTask
}

export function ProjectView({ task }: ProjectViewProps) {
  return (
    <div className="flex flex-1 min-h-0">
      {/* Left: AI Customer Chat */}
      <div className="flex w-1/2 min-w-0 flex-col border-r border-white/10">
        <ProjectChat task={task} />
      </div>
      {/* Right: IDE Sandbox */}
      <div className="flex w-1/2 min-w-0 flex-col">
        <ProjectIDE task={task} />
      </div>
    </div>
  )
}
