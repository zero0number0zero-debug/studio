import * as React from "react";
import { CreateProjectForm } from "@/components/create-project-form"
import { ProjectCard } from "@/components/project-card"
import { getProjects } from "@/lib/projects-service";

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline text-foreground">Dashboard</h1>
        <CreateProjectForm />
      </div>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Active Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.filter(p => p.status !== 'Completed').map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold font-headline mb-4">Completed Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.filter(p => p.status === 'Completed').map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
