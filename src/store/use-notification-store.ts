"use client";

import { create } from "zustand";
import type { Notification } from "@/types";

// Demo notifications
const demoNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to NexusAI!",
    message: "Start by exploring our AI tools and creating your first document.",
    type: "success",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New Feature: AI Travel Planner",
    message: "Plan your perfect trip with our new AI-powered travel planner tool.",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Your free trial is active",
    message: "You have 5 free tool uses per day. Upgrade to Premium for unlimited access.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

interface NotificationState {
  notifications: Notification[];
  isOpen: boolean;
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  toggleOpen: () => void;
  close: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: demoNotifications,
  isOpen: false,
  unreadCount: demoNotifications.filter((n) => !n.read).length,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    }),

  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.read ? 0 : 1),
    })),

  removeNotification: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      const notifications = state.notifications.filter((n) => n.id !== id);
      return {
        notifications,
        unreadCount:
          state.unreadCount - (notification && !notification.read ? 1 : 0),
      };
    }),

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
