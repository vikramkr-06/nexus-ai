import {
  FileText,
  Scale,
  Calculator,
  GraduationCap,
  Mic,
  Briefcase,
  Languages,
  ClipboardCheck,
  PenTool,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export type ToolTier = "free" | "premium";

export interface AiTool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  tier: ToolTier;
  category: string;
  color: string;
  gradient: string;
  href: string;
}

export const aiTools: AiTool[] = [
  {
    id: "resume-studio",
    name: "AI Resume Studio",
    description:
      "Create ATS-friendly, professional resumes tailored to any job in seconds.",
    longDescription:
      "Generate polished, ATS-optimized resumes by inputting your experience and target role. Our AI crafts compelling bullet points, formats sections, and ensures keyword alignment.",
    icon: FileText,
    tier: "free",
    category: "Career",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-blue-600/5",
    href: "/tools/resume-studio",
  },
  {
    id: "legal-draft",
    name: "AI Legal Draft",
    description:
      "Draft contracts, NDAs, and legal documents with AI precision and clarity.",
    longDescription:
      "Generate professional legal documents including contracts, NDAs, terms of service, and more. Customizable clauses with jurisdiction-aware language.",
    icon: Scale,
    tier: "premium",
    category: "Legal",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-purple-600/5",
    href: "/tools/legal-draft",
  },
  {
    id: "tax-assistant",
    name: "AI Tax Assistant",
    description:
      "Simplify tax preparation with AI-guided calculations and deduction suggestions.",
    longDescription:
      "Get personalized tax guidance, deduction optimization, and document preparation. Supports individual and small business tax scenarios.",
    icon: Calculator,
    tier: "premium",
    category: "Finance",
    color: "text-green-500",
    gradient: "from-green-500/10 to-green-600/5",
    href: "/tools/tax-assistant",
  },
  {
    id: "assignment-helper",
    name: "AI Assignment Helper",
    description:
      "Get structured guidance, outlines, and research for academic assignments.",
    longDescription:
      "Break down complex assignments into manageable steps. Get outlines, research summaries, citation assistance, and structured responses.",
    icon: GraduationCap,
    tier: "free",
    category: "Education",
    color: "text-amber-500",
    gradient: "from-amber-500/10 to-amber-600/5",
    href: "/tools/assignment-helper",
  },
  {
    id: "interview-coach",
    name: "AI Interview Coach",
    description:
      "Practice interviews with AI feedback on answers, tone, and presentation.",
    longDescription:
      "Simulate real interview scenarios with industry-specific questions. Get instant feedback on your responses, phrasing, and areas for improvement.",
    icon: Mic,
    tier: "free",
    category: "Career",
    color: "text-rose-500",
    gradient: "from-rose-500/10 to-rose-600/5",
    href: "/tools/interview-coach",
  },
  {
    id: "business-consultant",
    name: "AI Business Consultant",
    description:
      "Get data-driven business strategies, market analysis, and growth plans.",
    longDescription:
      "Receive AI-powered business insights including competitive analysis, marketing strategies, financial projections, and actionable growth plans.",
    icon: Briefcase,
    tier: "premium",
    category: "Business",
    color: "text-indigo-500",
    gradient: "from-indigo-500/10 to-indigo-600/5",
    href: "/tools/business-consultant",
  },
  {
    id: "document-translator",
    name: "AI Document Translator",
    description:
      "Translate documents across 50+ languages while preserving formatting.",
    longDescription:
      "Accurate, context-aware document translation that preserves structure, tone, and industry terminology. Supports PDFs, Word documents, and plain text.",
    icon: Languages,
    tier: "free",
    category: "Productivity",
    color: "text-teal-500",
    gradient: "from-teal-500/10 to-teal-600/5",
    href: "/tools/document-translator",
  },
  {
    id: "cv-review",
    name: "AI CV Review",
    description:
      "Get instant feedback and improvement suggestions for your CV.",
    longDescription:
      "Upload your CV and receive detailed analysis covering formatting, content strength, keyword optimization, and ATS compatibility scoring.",
    icon: ClipboardCheck,
    tier: "free",
    category: "Career",
    color: "text-cyan-500",
    gradient: "from-cyan-500/10 to-cyan-600/5",
    href: "/tools/cv-review",
  },
  {
    id: "content-studio",
    name: "AI Content Studio",
    description:
      "Generate blog posts, marketing copy, social media content, and more.",
    longDescription:
      "Create high-quality content for any platform. From blog articles and ad copy to social posts and email campaigns — all optimized for engagement.",
    icon: PenTool,
    tier: "premium",
    category: "Marketing",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-orange-600/5",
    href: "/tools/content-studio",
  },
  {
    id: "travel-planner",
    name: "AI Travel Planner",
    description:
      "Plan perfect trips with personalized itineraries, budgets, and tips.",
    longDescription:
      "Get AI-curated travel itineraries with day-by-day plans, budget estimates, local tips, accommodation suggestions, and must-see attractions.",
    icon: MapPin,
    tier: "free",
    category: "Lifestyle",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    href: "/tools/travel-planner",
  },
];
