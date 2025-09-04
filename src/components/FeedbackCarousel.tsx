import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Feedback {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar?: string;
  course?: string;
}

const sampleFeedback: Feedback[] = [
  {
    id: 1,
    name: 'Arjun Sharma',
    role: 'JEE Student',
    rating: 5,
    text: 'Amazing platform! The course structure is very well organized and the instructors are incredibly knowledgeable. Helped me crack JEE Advanced with flying colors!',
    course: 'JEE Advanced Course'
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'NEET Aspirant',
    rating: 5,
    text: 'The study materials and practice questions are top-notch. The doubt clearing sessions were extremely helpful. I cleared NEET in my first attempt!',
    course: 'NEET Complete Package'
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    role: 'IITM BS Student',
    rating: 5,
    text: 'Excellent preparation for IITM BS entrance. The mock tests and study notes are comprehensive. The faculty support is outstanding!',
    course: 'IITM BS Preparation'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'JEE Student',
    rating: 4,
    text: 'Great learning experience! The video lectures are clear and the practice problems are challenging. Improved my scores significantly.',
    course: 'JEE Main Course'
  },
  {
    id: 5,
    name: 'Aditya Singh',
    role: 'NEET Student',
    rating: 5,
    text: 'The best platform for NEET preparation. Mock tests are exactly like the real exam. Teachers are very supportive and always ready to help!',
    course: 'NEET Mock Test Series'
  },
  {
    id: 6,
    name: 'Kavya Jain',
    role: 'IITM BS Student',
    rating: 5,
    text: 'Outstanding quality of education. The course content is updated and relevant. Great platform for IITM BS entrance preparation.',
    course: 'IITM BS Foundation'
  }
];

const FeedbackCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sampleFeedback.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sampleFeedback.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sampleFeedback.length) % sampleFeedback.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our successful students have to say about their journey with us.
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {sampleFeedback.map((feedback, index) => (
                <div key={feedback.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-4xl mx-auto">
                    <CardContent className="p-8 md:p-12">
                      {/* Quote Icon */}
                      <div className="mb-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Quote className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Feedback Text */}
                      <blockquote className="text-center mb-8">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">
                          "{feedback.text}"
                        </p>
                      </blockquote>

                      {/* User Info */}
                      <div className="flex flex-col items-center space-y-4">
                        {/* Avatar */}
                        <Avatar className="w-16 h-16 ring-4 ring-gradient-to-br from-blue-400 to-purple-400">
                          <AvatarImage src={feedback.avatar} alt={feedback.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                            {feedback.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        {/* Name and Role */}
                        <div className="text-center">
                          <h4 className="font-bold text-gray-900 text-lg">{feedback.name}</h4>
                          <p className="text-gray-600 font-medium">{feedback.role}</p>
                          {feedback.course && (
                            <p className="text-sm text-blue-600 mt-1">{feedback.course}</p>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          {renderStars(feedback.rating)}
                          <span className="ml-2 text-sm font-medium text-gray-600">
                            ({feedback.rating}/5)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {sampleFeedback.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
