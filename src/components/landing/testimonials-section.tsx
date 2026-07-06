"use client";

import { Section, SectionHeader } from "@/components/shared/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    initials: "SC",
    rating: 5,
    text: "The AI Content Studio saved my team 20+ hours per week. The quality of blog posts and ad copy it generates is genuinely impressive.",
  },
  {
    name: "James Okafor",
    role: "Freelance Developer",
    initials: "JO",
    rating: 5,
    text: "I used the Resume Studio to land 3 interviews in one week. The ATS optimization feature actually works — my response rate doubled.",
  },
  {
    name: "Priya Sharma",
    role: "Law Student",
    initials: "PS",
    rating: 5,
    text: "The Legal Draft tool helped me understand contract structures while preparing for exams. It's like having a mentor available 24/7.",
  },
  {
    name: "Marcus Thompson",
    role: "Small Business Owner",
    initials: "MT",
    rating: 5,
    text: "NexusAI's Business Consultant gave me a competitive analysis that would've cost $5,000 from a consulting firm. Incredible value.",
  },
  {
    name: "Elena Volkov",
    role: "Travel Blogger",
    initials: "EV",
    rating: 5,
    text: "The Travel Planner created a 2-week Japan itinerary that was better than anything I found online. Every day was perfectly planned.",
  },
  {
    name: "David Kim",
    role: "CS Graduate",
    initials: "DK",
    rating: 5,
    text: "Interview Coach prepared me for my Google interview. The behavioral question practice and feedback were spot-on. Got the offer!",
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <FadeIn>
        <SectionHeader
          badge="Testimonials"
          title="Loved by Thousands of Users"
          description="See what professionals, students, and businesses say about NexusAI."
        />
      </FadeIn>

      <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.name}>
            <div className="flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-warning text-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 pt-4 border-t">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
