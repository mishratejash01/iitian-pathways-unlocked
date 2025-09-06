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
      "py-2 sm:py-3 md:py-4 px-0 m-0", // Minimal vertical padding and margins
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-1 text-center sm:gap-2 py-0 my-0"> {/* Minimal gaps and no padding */}
        <div className="flex flex-col items-center gap-1 px-4 sm:gap-2 py-0 my-0"> {/* Minimal gaps */}
          <h2 className="max-w-[720px] text-xl font-semibold leading-tight sm:text-2xl md:text-3xl sm:leading-tight py-0 my-0"> {/* Smaller font sizes and no margins */}
            {title}
          </h2>
          <p className="text-xs max-w-[600px] font-medium text-muted-foreground sm:text-sm md:text-base py-0 my-0"> {/* Smaller font sizes and no margins */}
            {description}
          </p>
        </div>
        <div className="testimonial-scroll w-full h-[180px] max-h-[180px] overflow-hidden my-0 py-0"> {/* Fixed height with strict limits */}
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
