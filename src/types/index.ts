export type UserRole = "user" | "admin";
export type PlanType = "free" | "starter" | "pro" | "enterprise";
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "paused";
export type AuthProvider = "google" | "github";
export type Theme = "light" | "dark" | "system";
export type ToolCategory =
  | "resume"
  | "content"
  | "translation"
  | "assignment"
  | "interview"
  | "business"
  | "travel"
  | "legal"
  | "tax";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  country: string | null;
  language: string | null;
  timezone: string | null;
  bio: string | null;
  occupation: string | null;
  company: string | null;
  website: string | null;
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string | null;
  avatarUrl: string | null;
  plan: PlanType;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanType;
  status: SubscriptionStatus;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  createdAt: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
  roles?: UserRole[];
}

export interface SidebarNavGroup {
  title: string;
  items: NavItem[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HistoryItem {
  id: string;
  toolId: string;
  toolName: string;
  category: ToolCategory;
  title: string;
  preview: string;
  createdAt: string;
  isFavorite: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "support";
  createdAt: string;
  read: boolean;
}

export interface UsageStats {
  toolsUsed: number;
  toolsLimit: number;
  creditsUsed: number;
  creditsLimit: number;
  savedResults: number;
  period: string;
}
