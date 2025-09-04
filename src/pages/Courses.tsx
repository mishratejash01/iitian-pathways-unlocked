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
        {/* Hero Section - PW Style */}
        <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 pb-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex justify-center items-center mb-6">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm font-medium">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Premium Learning Experience
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Master Your
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Dream Course
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of students who are achieving their goals with our expertly crafted courses. From IIT entrance to NEET preparation.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                <div className="flex items-center text-white">
                  <Users className="w-6 h-6 mr-2 text-yellow-400" />
                  <span className="text-2xl font-bold">10K+</span>
                  <span className="ml-2 text-blue-200">Students</span>
                </div>
                <div className="flex items-center text-white">
                  <BookOpen className="w-6 h-6 mr-2 text-green-400" />
                  <span className="text-2xl font-bold">{courses.length}+</span>
                  <span className="ml-2 text-blue-200">Courses</span>
                </div>
                <div className="flex items-center text-white">
                  <Star className="w-6 h-6 mr-2 text-orange-400" />
                  <span className="text-2xl font-bold">4.8</span>
                  <span className="ml-2 text-blue-200">Rating</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Now
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg backdrop-blur-sm">
                  Explore Courses
                </Button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-0 focus:ring-4 focus:ring-yellow-400/50 focus:outline-none text-gray-800 placeholder-gray-500 text-lg shadow-xl"
                />
              </div>
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
                <AdminAddButton contentType="courses" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  Add Course
                </AdminAddButton>
                <Button variant="outline" size="sm">
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
