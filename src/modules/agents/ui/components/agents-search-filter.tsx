import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agent-filters";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [value, setValue] = useState(filters.search);
  const pendingValueRef = useRef<string | null>(null);

  useEffect(() => {
    if (pendingValueRef.current === filters.search) {
      pendingValueRef.current = null;
    }

    if (pendingValueRef.current === null) {
      setValue(filters.search);
    }
  }, [filters.search]);

  useEffect(() => {
    if (value === filters.search) {
      return;
    }

    pendingValueRef.current = value;

    const timeout = setTimeout(() => {
      setFilters({ search: value });
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, filters.search, setFilters]);

  const handleClear = () => {
    pendingValueRef.current = "";
    setValue("");
    setFilters({ search: "" });
  };

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7 pr-8"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      {value ? (
        <Button
          aria-label="Clear search"
          className="absolute right-1 top-1/2 size-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          size="icon-sm"
          type="button"
          variant="ghost"
          onClick={handleClear}
        >
          <XIcon className="size-4" />
        </Button>
      ) : null}
    </div>
  );
};
