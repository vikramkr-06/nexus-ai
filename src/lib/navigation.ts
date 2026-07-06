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
    title: "Overview",
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
        badge: "Soon",
      },
      {
        title: "Usage",
        href: "/dashboard/usage",
        icon: BarChart3,
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
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
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
