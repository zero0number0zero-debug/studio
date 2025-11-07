import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { getProjectById } from "@/lib/projects-service";


const statusColors: Record<Project['status'], string> = {
  'Initiation': 'bg-chart-1 text-foreground',
  'Planning': 'bg-primary text-primary-foreground',
  'Execution': 'bg-accent text-accent-foreground',
  'Monitoring & Controlling': 'bg-chart-4 text-foreground',
  'Closure': 'bg-chart-5 text-foreground',
  'Completed': 'bg-secondary text-secondary-foreground',
};

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">{project.name}</h1>
          <p className="text-lg text-muted-foreground mt-1">{project.description}</p>
        </div>
        <Badge className={cn("whitespace-nowrap text-base", statusColors[project.status])}>{project.status}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-md text-muted-foreground">Overall Progress</span>
              <span className="text-md font-semibold">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>
          
          <Separator />

          <div>
            <h3 className="text-md font-medium text-muted-foreground mb-3">Project Team</h3>
            <div className="flex items-center">
              <div className="flex -space-x-3">
                <TooltipProvider delayDuration={100}>
                  {project.team.map((member, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                         <Avatar className="h-10 w-10 border-2 border-card">
                          <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person face" />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{member.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </div>
          
          <Separator />

          <div>
             <h3 className="text-md font-medium text-muted-foreground mb-2">Last Update</h3>
             <p className="text-md">{project.lastUpdate}</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
