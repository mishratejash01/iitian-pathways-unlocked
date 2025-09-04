import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Calendar, 
  Users, 
  CheckCircle
} from "lucide-react";
import EnrollButton from "@/components/EnrollButton";
import { Course } from '@/components/admin/courses/types';

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="relative h-full overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
        {/* Bestseller Badge - Repositioned to top left corner */}
        {course.bestseller && (
          <div className="absolute top-3 left-3 z-20">
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-2 py-1 shadow-lg">
              <Star className="h-3 w-3 mr-1 fill-current" /> Bestseller
            </Badge>
          </div>
        )}
        
        {/* Gradient Top Border */}
        <div className={`h-2 bg-gradient-to-r ${
          course.bestseller 
            ? 'from-amber-400 to-amber-600' 
            : 'from-royal to-royal-dark'
        }`} />
        
        <CardHeader className="pb-2 pt-4">
          {/* Add extra top padding when bestseller badge is present */}
          <div className={course.bestseller ? 'mt-8' : 'mt-0'}>
            <CardTitle className="text-lg md:text-xl font-bold text-gray-800">
              {course.title}
            </CardTitle>
          </div>
          
          {/* Premium Calendar Badge - Mobile Enhanced */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              {/* Large Premium Calendar Badge for Mobile */}
              <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-3 py-2 md:px-2 md:py-1">
                <Calendar className="h-5 w-5 md:h-4 md:w-4 mr-2 md:mr-1 text-blue-600" />
                <span className="text-sm md:text-xs font-semibold text-blue-700">
                  {course.duration}
                </span>
              </div>
              
              {/* Students Count */}
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">
                  {course.students_enrolled || 0}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <CardDescription className="text-gray-600 mb-4 leading-relaxed">
            {course.description}
          </CardDescription>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {course.features?.map((feature, i) => (
              <div className="flex items-center text-sm" key={i}>
                <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4 relative">
          {/* Price Tag - Bottom Left Corner */}
          <div className="absolute bottom-4 left-4 z-10">
            {course.discounted_price && course.discounted_price < course.price ? (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">₹{course.discounted_price}</span>
                  <span className="text-xs line-through opacity-80">₹{course.price}</span>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-royal to-royal-dark text-white px-3 py-2 rounded-lg shadow-lg">
                <span className="text-lg font-bold">₹{course.price}</span>
              </div>
            )}
          </div>
          
          {/* Enroll Button - Bottom Right Corner (Floating) */}
          <div className="absolute bottom-4 right-4 z-10">
            <EnrollButton
              courseId={course.id}
              enrollmentLink={course.enroll_now_link || undefined}
              className={`${
                course.bestseller 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-200' 
                  : 'bg-gradient-to-r from-royal to-royal-dark hover:from-royal-dark hover:to-royal shadow-royal/30'
              } text-white px-4 py-2 md:px-5 md:py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
            />
          </div>
          
          {/* Spacer to maintain card height */}
          <div className="w-full h-12" />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
