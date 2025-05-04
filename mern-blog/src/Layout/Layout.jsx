import AppSidebar from "@/components/AppSidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <div>
      <SidebarProvider>
        <Topbar />
        <AppSidebar />
        <main className="w-full">
          <div className="w-full min-h-[calc(100vh-40px) py-28 px-10]">
          <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
 