"use client";

import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  callbackUrl: string | null;
  open: (callbackUrl?: string) => void;
  close: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  callbackUrl: null,
  open: (callbackUrl) => set({ isOpen: true, callbackUrl: callbackUrl ?? null }),
  close: () => set({ isOpen: false, callbackUrl: null }),
}));
