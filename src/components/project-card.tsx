import type { Project } from "@/lib/placeholder-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<Project['status'], string> = {
  'Initiation': 'bg-chart-1 text-foreground',
  'Planning': 'bg-primary text-primary-foreground',
  'Execution': 'bg-accent text-accent-foreground',
  'Monitoring & Controlling': 'bg-chart-4 text-foreground',
  'Closure': 'bg-chart-5 text-foreground',
  'Completed': 'bg-secondary text-secondary-foreground',
};


export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-xl transition-shadow duration-300 border-transparent hover:border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="font-headline text-lg leading-tight">{project.name}</CardTitle>
          <Badge className={cn("whitespace-nowrap", statusColors[project.status])}>{project.status}</Badge>
        </div>
        <CardDescription className="line-clamp-2 h-10 pt-1">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-semibold">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <TooltipProvider delayDuration={100}>
              {project.team.map((member, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                     <Avatar className="h-8 w-8 border-2 border-card">
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
        <span>{project.lastUpdate}</span>
      </CardFooter>
    </Card>
  );
}
