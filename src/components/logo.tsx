import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Briefcase className="h-7 w-7 text-primary" />
      <h1 className="text-2xl font-bold font-headline text-primary">ProjectPM</h1>
    </div>
  );
}
