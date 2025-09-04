import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import AdminAddButton from "@/components/admin/AdminAddButton";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import CourseCardSkeleton from "@/components/courses/CourseCardSkeleton";
import CourseCard from "@/components/courses/CourseCard";
import CoursesHeader from "@/components/courses/CoursesHeader";
import WhyChooseUsSection from "@/components/courses/WhyChooseUsSection";
import CategoryFilter from "@/components/courses/CategoryFilter";
import HeroCarousel from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, Users, Star, Play } from "lucide-react";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { courses, contentLoading } = useBackend();

  const categories = [
    { id: "all", name: "All Courses", count: courses.length },
    { id: "IITM BS", name: "IITM BS", count: courses.filter(c => c.exam_category === "IITM BS" || c.exam_category === "IITM_BS").length },
    { id: "NEET", name: "NEET", count: courses.filter(c => c.exam_category === "NEET").length },
    { id: "JEE", name: "JEE", count: courses.filter(c => c.exam_category === "JEE").length }
  ];

  // Filter courses based on category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" ||
      (selectedCategory === "IITM BS" && (course.exam_category === "IITM BS" || course.exam_category === "IITM_BS")) ||
      course.exam_category === selectedCategory;
    
    const matchesSearch = searchQuery === "" ||
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <NavBar />
      <EmailPopup />
      
      <main className="min-h-screen">
        {/* Hero Carousel Section */}
        <HeroCarousel />
        
        {/* Search Bar Section */}
        <section className="py-8 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for courses, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-500 text-lg shadow-sm"
              />
            </div>
          </div>
        </section>
        
        {/* Category Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105"
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  {category.name}
                  <Badge className="ml-2 bg-gray-100 text-gray-600 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Results Header */}
        <section className="py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "all" ? "All Courses" : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <AdminAddButton className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" contentType="courses">
                  Add Course
                </AdminAddButton>
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Courses Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {contentLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    className="transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No courses match "${searchQuery}" in the ${selectedCategory === "all" ? "selected" : selectedCategory} category.`
                      : `No courses available in the ${selectedCategory} category yet.`
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {searchQuery && (
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery("")}
                      >
                        Clear Search
                      </Button>
                    )}
                    <Button 
                      onClick={() => {
                        setSelectedCategory("all");
                        setSearchQuery("");
                      }}
                    >
                      View All Courses
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <WhyChooseUsSection />
        
      </main>
      
      <Footer />
    </>
  );
};

export default Courses;
