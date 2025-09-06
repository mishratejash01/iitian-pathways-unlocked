import React, { useRef, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, Users, GraduationCap, Network } from "lucide-react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

type Testimonial = {
  content: string;
  name: string;
  course: string;
  rating?: number;
  achievement?: string;
};

const testimonialsData = [
  {
    text: "I've always had trouble with maths. Group classes used to make me feel even more behind. But here, I could go topic by topic and understand at my own pace. It was simple, but powerful. I wish I had found this earlier.",
    name: "Saket",
    role: "JEE Preparation",
  },
  {
    text: "I didn't do well in JEE the first time and felt stuck. I needed something that didn't feel overwhelming. This website gave me just that. It felt calm, clear, and like a fresh start. I actually enjoy studying again.",
    name: "Moksha",
    role: "JEE Preparation",
  },
  {
    text: "This platform just made everything easier. No ads, no complicated logins. I could find my subject, download the notes, and get started. One of my Kota teachers suggested it and now I tell all my friends too.",
    name: "Harshita",
    role: "NEET Preparation",
  },
  {
    text: "I used to waste hours scrolling through Telegram groups looking for notes. Now, I don't have to. Everything's here, well arranged, and accurate. It's like someone finally understood what we students really need.",
    name: "Tarun",
    role: "NEET Preparation",
  },
  {
    text: "Preparing for both exams used to drain me out. I didn't know where to start or what to focus on. This site gave me a direction. I followed their study plans and just trusted the process. It worked.",
    name: "Ananya",
    role: "JEE & NEET Preparation",
  },
  {
    text: "I come from a non-maths background, so the thought of even attempting the qualifier gave me anxiety. But once I joined the classes, things actually started making sense. The way they explained every small step made me feel included, not behind. I genuinely didn't think I'd pass, but I did.",
    name: "Aanya",
    role: "IITM BS - Qualifier",
  },
  {
    text: "I started preparing just using their free videos and notes. A week later, I joined the batch and things got even better. The teachers actually cared about what we understood. For the first time, I didn't feel like I was studying alone.",
    name: "Riya",
    role: "IITM BS - Qualifier",
  },
  {
    text: "I'm from a non-maths background and honestly, I was scared. But the way the teachers approached maths made it so doable. The regular practice and tips actually helped me enjoy solving things.",
    name: "Yash",
    role: "IITM BS - Qualifier",
  },
  {
    text: "I've always struggled to stay consistent, but the way the classes were scheduled helped me build a routine. The notes were easy to refer to, especially before deadlines. It felt like everything I needed was already thought of and kept ready for me.",
    name: "Kriti",
    role: "IITM BS - Foundation",
  },
  {
    text: "Joining the classes was a good decision for me. But what made the real difference were the tools and notes. I could revise on my own between classes, and I didn't feel lost like I usually do.",
    name: "Raghav",
    role: "IITM BS - Foundation",
  },
  {
    text: "I'm working alongside studying, so I didn't have time to attend live lectures regularly. But their content was always updated and clear. I could watch what I needed, when I needed it, and that made a huge difference.",
    name: "Siddharth",
    role: "IITM BS - Foundation",
  },
  {
    text: "I work full-time, so I couldn't commit to live classes. Still, the notes and tools on the website were more than enough. I didn't need to waste time searching anywhere else. Everything was clear, simple, and exactly what I needed to stay on track.",
    name: "Divya",
    role: "IITM BS - Diploma",
  },
  {
    text: "I was just looking for good-quality notes and I ended up using almost everything they had. The mock tests helped me figure out what I was missing and I didn't need to use any other source after that.",
    name: "Priya",
    role: "IITM BS - Diploma",
  },
  {
    text: "I didn't attend any classes. I just used their free notes, previous year questions, and mock tests. And even then, I felt more confident this term than I ever have. Everything was neatly arranged and easy to access.",
    name: "Arjun",
    role: "IITM BS - Diploma",
  },
  {
    text: "At first, I thought I'd have to buy a bunch of courses. But the resources here were already enough. The layout of the syllabus, exam tips, and short revision notes helped me sail through without any extra pressure.",
    name: "Tanya",
    role: "IITM BS - Diploma",
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Pixels per frame
    
    const animate = () => {
      if (container) {
        scrollPosition += scrollSpeed;
        
        // Check if we've scrolled to the end
        if (scrollPosition >= container.scrollWidth - container.clientWidth) {
          scrollPosition = 0; // Loop back to start
        }
        
        container.scrollLeft = scrollPosition;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg font-semibold text-royal">Testimonials</div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our community has to say about Unknown IITians.
          </p>
        </div>
        
        {/* Auto-scrolling marquee container */}
        <div 
          ref={containerRef}
          className="flex gap-6 mt-10 overflow-hidden whitespace-nowrap"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)'
          }}
        >
          {/* Render testimonials multiple times for seamless loop */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {testimonialsData.map((testimonial, index) => (
                <div 
                  key={`${setIndex}-${index}`} 
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm w-80 shrink-0"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star key={starIndex} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Quote className="text-royal mb-2" size={20} />
                  <p className="text-gray-700 mb-4 whitespace-normal leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
