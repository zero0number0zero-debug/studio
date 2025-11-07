"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "./ui/sidebar"
import { cn } from "@/lib/utils"
import placeholderImages from '@/lib/placeholder-images.json';

export function UserNav() {
  const userAvatarUrl = placeholderImages.userAvatar.imageUrl;
  const { state, isMobile } = useSidebar();

  if (state === 'collapsed' && !isMobile) {
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatarUrl} data-ai-hint="person face" alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="group w-full rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatarUrl} data-ai-hint="person face" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col", (state === 'collapsed' && !isMobile) && 'hidden')}>
            <p className="font-medium leading-none">User Name</p>
            <p className="text-xs leading-none text-sidebar-foreground/70">
              user@example.com
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className={cn("h-6 w-6", (state === 'collapsed' && !isMobile) && 'hidden')}>
              <LogOut className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
             <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
