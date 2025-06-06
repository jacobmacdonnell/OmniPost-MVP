"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, UserCircle, Settings, LogOut, Sparkles, X } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Generator", icon: LayoutDashboard },
  { href: "/dashboard/account", label: "Account", icon: UserCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isMobileOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay for mobile to close sidebar on click outside */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "sm:translate-x-0" // Ensures it's always visible on sm+ screens
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between ps-2.5 mb-8">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md mr-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                OmniPost.ai
              </span>
            </Link>
            <Button variant="ghost" size="icon" className="sm:hidden text-slate-300 hover:bg-slate-800 hover:text-white" onClick={toggleSidebar}>
              <X size={20}/>
            </Button>
          </div>
          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => { if (isMobileOpen) toggleSidebar() }} // Close sidebar on nav item click on mobile
                  className={cn(
                    "flex items-center p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white group",
                    isActive && "bg-slate-800 text-white shadow-inner"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 text-slate-400 transition duration-75 group-hover:text-white",
                      isActive && "text-white"
                    )}
                  />
                  <span className="ms-3">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto p-4 border-t border-slate-800 -mx-3 -mb-4">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white">
              <LogOut className="w-5 h-5 mr-3 text-slate-400" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
} 