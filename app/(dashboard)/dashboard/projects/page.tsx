import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserProjects } from "@/app/actions/projects"
import { MyProjectsPage } from "@/components/dashboard/MyProjectsPage"

export const metadata = {
    title: "My Projects | Interna",
    description: "View and manage your simulation projects",
}

export default async function ProjectsPage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect("/login")

    const { projects } = await getUserProjects()

    return <MyProjectsPage projects={projects} />
}
