// Install required dependencies:
// npm install @radix-ui/react-avatar
// Ensure Tailwind config includes animation keyframes:
// @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
// @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

import React from 'react';
import { TestimonialCard, type Testimonial } from './testimonial-card';

export interface TestimonialsWithMarqueeProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsWithMarqueeProps> = ({
  title,
  description,
  testimonials,
}) => {
  return (
    <section className="bg-background my-20 relative overflow-hidden">
      <div className="container z-10 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg font-semibold text-royal">
              Testimonials
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            {title}
          </h2>
          {description && (
            <p className="text-center mt-5 opacity-75">{description}</p>
          )}
        </div>
        
        {/* Horizontal Marquee */}
        <div className="mt-10 relative">
          {/* First marquee row - left to right */}
          <div
            className="flex gap-6 mb-6"
            style={{
              animation: 'marqueeLeft 60s linear infinite',
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                className="min-w-[350px] flex-shrink-0"
              />
            ))}
          </div>
          
          {/* Second marquee row - right to left */}
          <div
            className="flex gap-6"
            style={{
              animation: 'marqueeRight 60s linear infinite',
            }}
          >
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                className="min-w-[350px] flex-shrink-0"
              />
            ))}
          </div>
        </div>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
      </div>
      
      {/* Global styles for marquee animations */}
      <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export { TestimonialCard, type Testimonial };
export default TestimonialsSection;
