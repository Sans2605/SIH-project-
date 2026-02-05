"use client";

import {
  AppSidebar,
  SidebarCustomTrigger,
} from "@/components/main/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthsContext } from "@/context/AuthsContext";
import ChatbotEmbed from "@/components/main/chatbot-embed";

const Layout = ({ children }) => {
  const router = useRouter();
  const { currentUser, loading, logout } = useContext(AuthsContext);

  useEffect(() => {
    console.log(currentUser);

    if (!currentUser && !loading) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  /*=====[SIGNOUT HANDLER]=====*/
  const signOutHandler = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar data={currentUser} handleSignOut={signOutHandler} />
      <main className="bg-zinc-100 dark:bg-[#0D0D0D] w-full">
        <SidebarCustomTrigger />
        {children}
        <ChatbotEmbed />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
