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

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'PROJ-001',
    name: 'E-commerce Platform',
    description: 'Development of a new online shopping platform with AI-powered recommendations.',
    status: 'Execution',
    progress: 65,
    team: [
      { name: 'Alice', avatarUrl: 'https://picsum.photos/seed/p1-t1/40/40' },
      { name: 'Bob', avatarUrl: 'https://picsum.photos/seed/p1-t2/40/40' },
      { name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/p1-t3/40/40' },
    ],
    lastUpdate: '2 days ago',
  },
  {
    id: 'PROJ-002',
    name: 'Mobile Banking App',
    description: 'A new secure mobile banking application for iOS and Android.',
    status: 'Planning',
    progress: 20,
    team: [
      { name: 'David', avatarUrl: 'https://picsum.photos/seed/p2-t1/40/40' },
      { name: 'Eve', avatarUrl: 'https://picsum.photos/seed/p2-t2/40/40' },
    ],
    lastUpdate: '5 days ago',
  },
  {
    id: 'PROJ-003',
    name: 'Data Warehouse Migration',
    description: 'Migrating legacy data warehouse to a cloud-based solution.',
    status: 'Monitoring & Controlling',
    progress: 80,
    team: [
      { name: 'Frank', avatarUrl: 'https://picsum.photos/seed/p3-t1/40/40' },
      { name: 'Grace', avatarUrl: 'https://picsum.photos/seed/p3-t2/40/40' },
      { name: 'Heidi', avatarUrl: 'https://picsum.photos/seed/p3-t3/40/40' },
      { name: 'Ivan', avatarUrl: 'https://picsum.photos/seed/p3-t4/40/40' },
    ],
    lastUpdate: '1 day ago',
  },
  {
    id: 'PROJ-004',
    name: 'Website Redesign',
    description: 'Complete overhaul of the corporate website.',
    status: 'Completed',
    progress: 100,
    team: [
        { name: 'Judy', avatarUrl: 'https://picsum.photos/seed/p4-t1/40/40' },
        { name: 'Mallory', avatarUrl: 'https://picsum.photos/seed/p4-t2/40/40' },
    ],
    lastUpdate: '1 month ago'
  },
   {
    id: 'PROJ-005',
    name: 'Internal CRM Tool',
    description: 'Building a new Customer Relationship Management tool for the sales team.',
    status: 'Initiation',
    progress: 5,
    team: [
      { name: 'Oscar', avatarUrl: 'https://picsum.photos/seed/p5-t1/40/40' },
    ],
    lastUpdate: '3 hours ago',
  }
];

export const createNewProject = (name: string, description: string): Project => {
  const newId = `PROJ-${String(MOCK_PROJECTS.length + 1).padStart(3, '0')}`;
  return {
    id: newId,
    name,
    description,
    status: 'Initiation',
    progress: 0,
    team: [{ name: 'User', avatarUrl: 'https://picsum.photos/seed/user/40/40' }],
    lastUpdate: 'Just now',
  };
};