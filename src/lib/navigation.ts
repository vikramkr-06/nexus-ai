import {
  LayoutDashboard,
  User,
  Settings,
  CreditCard,
  Shield,
  Users,
  Activity,
  BarChart3,
  Sparkles,
  Wrench,
  History,
  BookmarkCheck,
  Star,
  MessageCircle,
  Bell,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/types";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  roles?: UserRole[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const dashboardNavigation: NavGroup[] = [
  {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "AI Tools",
        href: "/dashboard/tools",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Activity",
    items: [
      {
        title: "My History",
        href: "/dashboard/history",
        icon: History,
      },
      {
        title: "Saved Results",
        href: "/dashboard/saved",
        icon: BookmarkCheck,
      },
      {
        title: "Favorite Tools",
        href: "/dashboard/favorites",
        icon: Star,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
      {
        title: "Subscription",
        href: "/dashboard/subscription",
        icon: CreditCard,
      },
      {
        title: "Support",
        href: "/dashboard/support",
        icon: MessageCircle,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export const adminNavigation: NavGroup[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Overview",
        href: "/admin",
        icon: Shield,
        roles: ["admin"],
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
        roles: ["admin"],
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: Activity,
        roles: ["admin"],
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Wrench,
        roles: ["admin"],
      },
    ],
  },
];

export const publicNavItems: NavItem[] = [
  { title: "Features", href: "/#features", icon: Sparkles },
  { title: "Pricing", href: "/#pricing", icon: CreditCard },
];
