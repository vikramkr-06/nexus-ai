"use client";

import { Section, SectionHeader } from "@/components/shared/section";
import { FadeIn } from "@/components/ui/motion";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What AI model powers NexusAI?",
    answer:
      "NexusAI is powered by Google's Gemini AI — one of the most advanced large language models available. This ensures high-quality, accurate, and context-aware results across all our tools.",
  },
  {
    question: "Do I need an account to browse tools?",
    answer:
      "No! You can freely browse all tool listings and learn about features without creating an account. You only need to sign in when you want to use a tool, save results, or access your dashboard.",
  },
  {
    question: "How does authentication work?",
    answer:
      "We use secure OAuth 2.0 authentication through Google and GitHub. There are no passwords to remember — just click 'Continue with Google' or 'Continue with GitHub' and you're in.",
  },
  {
    question: "Is the Free plan really free?",
    answer:
      "Yes, absolutely. The Free plan gives you access to free-tier tools with 5 uses per day. No credit card required, no trial period — it's free forever.",
  },
  {
    question: "What's included in the Premium plan?",
    answer:
      "Premium unlocks all 10+ AI tools, removes daily usage limits, provides priority processing speed, advanced export formats (PDF, DOCX), history management, and priority support — all for $19/month.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption, secure OAuth authentication, and never share your data with third parties. Your inputs and generated results are private to your account.",
  },
  {
    question: "Can I cancel my Premium subscription?",
    answer:
      "Yes, you can cancel anytime from your dashboard settings. Your Premium access will continue until the end of your billing period, and you'll never be charged again.",
  },
  {
    question: "Will more AI tools be added?",
    answer:
      "Yes! We're continuously developing new AI tools. Premium members get early access to every new tool we release. Check our roadmap for upcoming features.",
  },
];

export function FaqSection() {
  return (
    <Section id="faq" className="bg-muted/20">
      <FadeIn>
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about NexusAI. Can't find your answer? Contact our support team."
        />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} title={faq.question}>
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
