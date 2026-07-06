import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters"),
  phone: z
    .string()
    .max(50, "Phone must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .max(100, "Country must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  language: z.string().max(10).optional().or(z.literal("")),
  timezone: z.string().max(100).optional().or(z.literal("")),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  occupation: z
    .string()
    .max(255, "Occupation must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(255, "Company must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Must be a valid URL")
    .max(500)
    .optional()
    .or(z.literal("")),
  twitter: z
    .string()
    .max(255)
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .max(255)
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .max(255)
    .optional()
    .or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const userSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  weeklyDigest: z.boolean(),
  marketingEmails: z.boolean(),
});

export type UserSettingsFormValues = z.infer<typeof userSettingsSchema>;
