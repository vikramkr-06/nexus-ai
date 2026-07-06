"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/ui/motion";
import { profileSchema, type ProfileFormValues } from "@/lib/validations/profile";
import { getInitials, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import type { SessionUser } from "@/types";
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  Crown,
  Save,
  Link as LinkIcon,
} from "lucide-react";

interface ProfileContentProps {
  user: SessionUser;
  profile: {
    fullName: string | null;
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
  } | null;
  joinedAt: string;
}

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Brazil",
  "Other",
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "pt", label: "Portuguese" },
  { value: "ar", label: "Arabic" },
];

const timezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function ProfileContent({ user, profile, joinedAt }: ProfileContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.fullName ?? user.fullName ?? "",
      phone: profile?.phone ?? "",
      country: profile?.country ?? "",
      language: profile?.language ?? "en",
      timezone: profile?.timezone ?? "UTC",
      bio: profile?.bio ?? "",
      occupation: profile?.occupation ?? "",
      company: profile?.company ?? "",
      website: profile?.website ?? "",
      twitter: profile?.twitter ?? "",
      linkedin: profile?.linkedin ?? "",
      github: profile?.github ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </div>
      </FadeIn>

      {/* Profile Header Card */}
      <FadeIn delay={0.1}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl">
                {user.avatarUrl && (
                  <AvatarImage src={user.avatarUrl} alt={user.fullName ?? ""} />
                )}
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user.fullName ? getInitials(user.fullName) : "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {profile?.fullName || user.fullName || "Your Name"}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge
                    variant={user.plan !== "free" ? "default" : "secondary"}
                  >
                    {user.plan !== "free" ? (
                      <>
                        <Crown className="h-3 w-3 mr-1" />
                        {user.plan.toUpperCase()}
                      </>
                    ) : (
                      "FREE PLAN"
                    )}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {formatDate(joinedAt)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <FadeIn delay={0.2}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    {...form.register("fullName")}
                    error={form.formState.errors.fullName?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="pl-9"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      className="pl-9"
                      {...form.register("phone")}
                      error={form.formState.errors.phone?.message}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={form.watch("country")}
                    onValueChange={(value) => form.setValue("country", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={form.watch("language")}
                    onValueChange={(value) => form.setValue("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={form.watch("timezone")}
                    onValueChange={(value) => form.setValue("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  {...form.register("bio")}
                  error={form.formState.errors.bio?.message}
                />
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Professional Information */}
        <FadeIn delay={0.3}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Information
              </CardTitle>
              <CardDescription>
                Add your work details and professional links.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Software Engineer"
                    {...form.register("occupation")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      className="pl-9"
                      {...form.register("company")}
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      className="pl-9"
                      {...form.register("website")}
                      error={form.formState.errors.website?.message}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base">Social Links</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your social profiles
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <TwitterIcon className="h-4 w-4" />
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      placeholder="username"
                      {...form.register("twitter")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <LinkedInIcon className="h-4 w-4" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="username"
                      {...form.register("linkedin")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <GitHubIcon className="h-4 w-4" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      placeholder="username"
                      {...form.register("github")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Save Button */}
        <FadeIn delay={0.4}>
          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </FadeIn>
      </form>
    </div>
  );
}
