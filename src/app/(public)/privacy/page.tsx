import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — NexusAI",
  description: "Learn how NexusAI collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated: January 1, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            1. Information We Collect
          </h2>
          <p>
            When you sign in with Google or GitHub, we receive your name, email
            address, and profile picture from the OAuth provider. We do not
            collect passwords. We also collect usage data such as which tools you
            use and when, to improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to provide and improve our AI tools,
            personalize your experience, process subscriptions, and communicate
            important updates. We never sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            3. Data Security
          </h2>
          <p>
            We employ industry-standard security measures including encryption
            in transit and at rest, secure OAuth 2.0 authentication, and regular
            security audits. Your AI-generated content is private and accessible
            only to you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            4. Third-Party Services
          </h2>
          <p>
            We use Google Gemini AI to power our tools. Inputs you provide to AI
            tools are sent to Google&apos;s API for processing. We do not store
            your inputs longer than necessary to deliver results.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            5. Your Rights
          </h2>
          <p>
            You can request deletion of your account and all associated data at
            any time from your dashboard settings. Upon deletion, all your data
            is permanently removed from our systems within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            6. Contact
          </h2>
          <p>
            For privacy-related questions, please contact us at
            privacy@nexusai.com.
          </p>
        </section>
      </div>
    </div>
  );
}
