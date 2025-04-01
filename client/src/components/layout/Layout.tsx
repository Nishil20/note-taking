import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Menu, X } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
}

export function Layout({ children, sidebar }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setSidebarOpen(window.innerWidth >= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          {sidebar}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile menu button */}
        {isMobile && !sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
} 