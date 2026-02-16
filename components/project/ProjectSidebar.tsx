"use client"

import { FileText, MessageCircle, Users, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SidebarItem {
    id: string
    label: string
    type: "description" | "persona" | "report"
    icon?: React.ReactNode
}

export interface SidebarGroup {
    title: string
    items: SidebarItem[]
}

interface ProjectSidebarProps {
    groups: SidebarGroup[]
    activeId: string
    onSelect: (id: string) => void
}

export function ProjectSidebar({ groups, activeId, onSelect }: ProjectSidebarProps) {
    return (
        <div className="flex h-full w-full flex-col bg-black/60 border-r border-white/10">
            <nav className="flex-1 overflow-y-auto p-2 space-y-6">
                {groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-1">
                        {group.title && (
                            <div className="px-3 py-1.5">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                                    {group.title}
                                </h3>
                            </div>
                        )}
                        {group.items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    activeId === item.id
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm shadow-purple-500/10"
                                        : "text-white/60 hover:bg-white/5 hover:text-white/90 border border-transparent"
                                )}
                            >
                                <span className={cn(
                                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                                    activeId === item.id
                                        ? "bg-purple-500/30 text-purple-300"
                                        : "bg-white/5 text-white/40"
                                )}>
                                    {item.type === "description" ? (
                                        <FileText className="h-3.5 w-3.5" />
                                    ) : item.type === "report" ? (
                                        <BarChart3 className="h-3.5 w-3.5" />
                                    ) : (
                                        <MessageCircle className="h-3.5 w-3.5" />
                                    )}
                                </span>
                                <span className="truncate">{item.label}</span>
                            </button>
                        ))}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="shrink-0 border-t border-white/10 p-3">
                <div className="flex items-center gap-2 text-xs text-white/30">
                    <Users className="h-3 w-3" />
                    <span>Personas Active</span>
                </div>
            </div>
        </div>
    )
}
