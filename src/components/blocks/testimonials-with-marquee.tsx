import React from 'react';

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

interface TestimonialsWithMarqueeProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsWithMarqueeProps> = ({
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
          <div className="flex animate-marquee-left gap-6 mb-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 min-w-[350px] flex-shrink-0"
              >
                <p className="text-sm mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-royal to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs opacity-60">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second marquee row - right to left */}
          <div className="flex animate-marquee-right gap-6">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 min-w-[350px] flex-shrink-0"
              >
                <p className="text-sm mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-royal to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs opacity-60">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
      
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }
      `}</style>
    </section>
  );
};

export { TestimonialsSection };
export type { Testimonial, TestimonialsWithMarqueeProps };
export default TestimonialsSection;
