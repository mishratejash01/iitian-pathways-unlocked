import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Star, ChevronDown } from "lucide-react";

const CoursesHeader = () => {
    return (
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
            {/* Background Animation Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/15 rounded-full blur-lg animate-ping"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center">
                    {/* Badge */}
                    <motion.div 
                        className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="text-sm font-medium">Premium Learning Experience</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Unlock Your
                        <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Academic Potential
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Master complex concepts with our expertly designed courses.
                        <span className="block mt-2 text-lg text-blue-200">
                            Join thousands of students achieving excellence in JEE, NEET, and beyond.
                        </span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <span className="flex items-center justify-center">
                                Start Learning
                                <BookOpen className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </span>
                        </button>
                        <button className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/70">
                            View All Courses
                        </button>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-6 h-6 text-blue-400 mr-2" />
                                <span className="text-3xl font-bold text-white">10K+</span>
                            </div>
                            <p className="text-gray-300 text-sm">Active Students</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <BookOpen className="w-6 h-6 text-green-400 mr-2" />
                                <span className="text-3xl font-bold text-white">50+</span>
                            </div>
                            <p className="text-gray-300 text-sm">Expert Courses</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
                                <span className="text-3xl font-bold text-white">95%</span>
                            </div>
                            <p className="text-gray-300 text-sm">Success Rate</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Star className="w-6 h-6 text-purple-400 mr-2" />
                                <span className="text-3xl font-bold text-white">4.9</span>
                            </div>
                            <p className="text-gray-300 text-sm">Average Rating</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            
            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ChevronDown className="w-6 h-6 text-white/70" />
            </motion.div>
        </section>
    );
};

export default CoursesHeader;
