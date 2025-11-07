import { FolderKanban, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="group-data-[collapsible=icon]:hidden px-2">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive
                tooltip={{ children: 'Dashboard' }}
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={{ children: 'Projects' }}>
                <Link href="/dashboard">
                  <FolderKanban />
                  <span>Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <div className="p-2">
            <UserNav />
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can add breadcrumbs or global search here later */}
          </div>
          <div className="hidden md:block">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
