"use client";

import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
import { BotIcon, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DashBoardCommand({ open, setOpen }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const createSearchPath = (pathname: string) => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const onSelect = (pathname: string) => {
    router.push(createSearchPath(pathname));
    setOpen(false);
  };

  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Find a meeting or agent"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={() => onSelect("/agents")}>
            <BotIcon />
            Search agents
          </CommandItem>
          <CommandItem onSelect={() => onSelect("/meetings")}>
            <CalendarIcon />
            Search meetings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
}
