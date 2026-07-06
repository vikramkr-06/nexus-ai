import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — NexusAI",
  description: "Terms and conditions for using the NexusAI platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated: January 1, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using NexusAI, you agree to be bound by these Terms
            of Service. If you disagree with any part, you may not access the
            service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            2. Description of Service
          </h2>
          <p>
            NexusAI provides AI-powered tools including resume generation, legal
            document drafting, tax assistance, and more. Tools are powered by
            Google Gemini AI and results are for informational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            3. User Accounts
          </h2>
          <p>
            You must authenticate via Google or GitHub to use our tools. You are
            responsible for maintaining the security of your account. You must
            not share access or use the platform for unauthorized purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            4. Acceptable Use
          </h2>
          <p>
            You agree not to use NexusAI for illegal activities, generating
            harmful content, attempting to reverse-engineer AI models, or any
            activity that violates applicable laws or regulations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            5. Subscriptions & Billing
          </h2>
          <p>
            Premium subscriptions are billed monthly. You may cancel at any time
            and retain access until the end of the billing period. Refunds are
            handled on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            6. Disclaimer
          </h2>
          <p>
            AI-generated content is provided &quot;as is&quot; without
            warranties. NexusAI is not liable for decisions made based on AI
            outputs. Legal, tax, and financial content should be reviewed by
            qualified professionals.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            7. Contact
          </h2>
          <p>
            For questions about these terms, please contact us at
            legal@nexusai.com.
          </p>
        </section>
      </div>
    </div>
  );
}
