"use client";

import Logo from "../../assets/logo";
import {
  Briefcase,
  Home,
  LucideLogOut,
  MessageSquareText,
  MonitorCog,
  Moon,
  PanelLeftClose,
  Settings,
  Sparkle,
  Sun,
  User,
  GraduationCap,
  ShieldCheck,
  Search,
  CircleDollarSign,
  Contact,
  MessageCircleReply,
  CalendarCheck2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppSidebar({ data, handleSignOut }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Menu items.
  const items = data?.data?.isAdmin
    ? [
        {
          title: "Home",
          url: "/home",
          icon: Home,
        },
        {
          title: "Profile",
          url: "/profile",
          icon: User,
        },
        {
          title: "Directory",
          url: "/directory",
          icon: Search,
        },
        {
          title: "Content",
          url: "https://alumini-sanity.vercel.app",
          icon: Contact,
        },
      ]
    : [
        {
          title: "Home",
          url: "/home",
          icon: Home,
        },
        {
          title: "Profile",
          url: "/profile",
          icon: User,
        },
        {
          title: "Job Postings",
          url: "/jobs",
          icon: Briefcase,
        },
        {
          title: "Chats",
          url: "/chats",
          icon: MessageSquareText,
        },
        {
          title: "Community & News",
          url: "/community",
          icon: Sparkle,
        },
        {
          title: "Student Corner",
          url: "/student-corner",
          icon: GraduationCap,
        },
        {
          title: "Donation Portal",
          url: "/donation",
          icon: CircleDollarSign,
        },
      ];

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="pl-2 pt-2 flex items-center gap-2 text-lg font-bold tracking-tight">
          <Logo height={18} color={theme === "dark" ? "#ffffff" : "#000000"} />
          Alumni Connects
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Alumni Connects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col items-start gap-3 noselect">
            {data?.data?.isAlumni ? (
              <div className="py-0.5 px-3 bg-zinc-100 dark:bg-zinc-800 rounded-full border-[1.5px] border-zinc-300 dark:border-2 dark:border-zinc-700 ">
                <p className="flex gap-1 text-sm rounded-full">
                  Alumni
                  <ShieldCheck className="size-5 text-green-500" />
                </p>
              </div>
            ) : data?.data?.isAdmin ? (
              <div className="py-0.5 px-3 dark:bg-zinc-800 rounded-full border border-zinc-300 dark:border-2 dark:border-zinc-700 ">
                <p className="flex gap-1 text-sm rounded-full">
                  Admin
                  <ShieldCheck className="size-5 text-pink-500" />
                </p>
              </div>
            ) : (
              <div className="py-0.5 px-3 dark:bg-zinc-800 rounded-full border border-zinc-300 dark:border-2 dark:border-zinc-700 ">
                <p className="flex gap-1 text-sm rounded-full">
                  Student
                  <ShieldCheck className="size-5 text-blue-500" />
                </p>
              </div>
            )}
            <SidebarMenu className="mb-2 bg-black/5 dark:bg-white/5 rounded-lg">
              <SidebarMenuItem className="py-0 px-2 transition-all rounded-lg hover:bg-black/15 dark:hover:bg-white/15">
                <SidebarMenuButton className="h-auto hover:bg-transparent">
                  {data?.name === "" ? (
                    <Skeleton className="w-full h-12" />
                  ) : (
                    <>
                      <Image src={data?.data?.imageUrl} alt="" width={32} height={32} className="w-8 h-8 rounded-full bg-white" />
                      <div className="flex flex-col  items-start justify-center py-2">
                        <span className="font-semibold">{data?.name}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-400">{data?.email}</span>
                      </div>
                    </>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <Separator className="w-full bg-zinc-200 dark:bg-white/5" />

            <SidebarMenu className="mt-2">
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Settings />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent side="top" align="start">
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
                      <Sun /> Light
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
                      <Moon /> Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
                      <MonitorCog />
                      System
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => handleSignOut(e)} className="text-red-500 cursor-pointer">
                      <LucideLogOut /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarCustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 h-auto self-start bg-white/5 sticky z-50 top-2 left-2 ml-2 backdrop-blur-lg font-semibold flex items-center gap-2 lg:hidden rounded-md hover:bg-white/15"
    >
      <PanelLeftClose /> Open Sidebar
    </button>
  );
}
