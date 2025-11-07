export type Project = {
  id: string;
  name: string;
  description: string;
  status: 'Initiation' | 'Planning' | 'Execution' | 'Monitoring & Controlling' | 'Closure' | 'Completed';
  progress: number;
  team: { name: string; avatarUrl: string }[];
  lastUpdate: string;
  createdAt?: any;
};
