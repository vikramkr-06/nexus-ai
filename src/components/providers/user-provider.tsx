"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/use-user-store";
import type { SessionUser } from "@/types";

interface UserProviderProps {
  children: React.ReactNode;
  user: SessionUser | null;
}

export function UserProvider({ children, user }: UserProviderProps) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
