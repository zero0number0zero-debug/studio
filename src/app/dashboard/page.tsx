import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { MOCK_PROJECTS } from "@/lib/placeholder-data"
import { PlusCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline text-foreground">Dashboard</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Active Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_PROJECTS.filter(p => p.status !== 'Completed').map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Completed Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_PROJECTS.filter(p => p.status === 'Completed').map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
