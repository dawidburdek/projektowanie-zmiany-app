"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "manualUnread";

type ManualUnreadMap = Record<string, string>; // queryId → projectId

interface ManualUnreadContextValue {
  add: (queryId: string, projectId: string) => void;
  remove: (queryId: string) => void;
  hasQuery: (queryId: string) => boolean;
  hasProject: (projectId: string) => boolean;
}

const ManualUnreadContext = createContext<ManualUnreadContextValue>({
  add: () => {},
  remove: () => {},
  hasQuery: () => false,
  hasProject: () => false,
});

export function ManualUnreadProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<ManualUnreadMap>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setMap(JSON.parse(stored));
    } catch {}
  }, []);

  function update(next: ManualUnreadMap) {
    setMap(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function add(queryId: string, projectId: string) {
    update({ ...map, [queryId]: projectId });
  }

  function remove(queryId: string) {
    const next = { ...map };
    delete next[queryId];
    update(next);
  }

  function hasQuery(queryId: string) {
    return queryId in map;
  }

  function hasProject(projectId: string) {
    return Object.values(map).includes(projectId);
  }

  return (
    <ManualUnreadContext.Provider value={{ add, remove, hasQuery, hasProject }}>
      {children}
    </ManualUnreadContext.Provider>
  );
}

export function useManualUnread() {
  return useContext(ManualUnreadContext);
}

export function ManualUnreadQueryDot({ queryId }: { queryId: string }) {
  const { hasQuery } = useManualUnread();
  if (!hasQuery(queryId)) return null;
  return (
    <span className="shrink-0 w-2 h-2 rounded-full bg-orange-400" title="Oznaczone do przejrzenia" />
  );
}

export function ManualUnreadProjectDot({ projectId }: { projectId: string }) {
  const { hasProject } = useManualUnread();
  if (!hasProject(projectId)) return null;
  return (
    <span className="shrink-0 w-2 h-2 rounded-full bg-orange-400" title="Zapytanie oznaczone do przejrzenia" />
  );
}
