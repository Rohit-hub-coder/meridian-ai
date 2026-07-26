"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import DashBoardCommand from "./dashboard-command";
import { useEffect, useState } from "react";

export default function DashboardNavbar() {
  const [commandOpen, setCommandOpen] = useState(false);
  const { state, toggleSidebar, isMobile } = useSidebar();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <DashBoardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>
        <Button
          variant="outline"
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}>
          <SearchIcon />
          Search
        </Button>
      </nav>
    </>
  );
}
