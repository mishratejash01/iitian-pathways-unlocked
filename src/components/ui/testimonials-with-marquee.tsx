import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-6 sm:py-8 md:py-12 px-0", // Reduced vertical padding significantly
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-3 text-center sm:gap-6"> {/* Reduced gaps */}
        <div className="flex flex-col items-center gap-2 px-4 sm:gap-4"> {/* Reduced gaps */}
          <h2 className="max-w-[720px] text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl sm:leading-tight"> {/* Reduced font sizes */}
            {title}
          </h2>
          <p className="text-sm max-w-[600px] font-medium text-muted-foreground sm:text-base md:text-lg"> {/* Reduced font sizes */}
            {description}
          </p>
        </div>
        <div className="testimonial-scroll w-full max-h-48 overflow-hidden"> {/* Added max-height and overflow control */}
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              className="testimonial-card"
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
