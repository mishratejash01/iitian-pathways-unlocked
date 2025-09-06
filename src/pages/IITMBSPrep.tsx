import React, { useEffect } from "react";
import { useLocation, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, Wrench } from "lucide-react";
import BranchNotesTab from "@/components/iitm/BranchNotesTab";
import PYQsTab from "@/components/iitm/PYQsTab";
import NewsTab from "@/components/iitm/NewsTab";
import ImportantDatesTab from "@/components/iitm/ImportantDatesTab";
import SyllabusTab from "@/components/iitm/SyllabusTab";
import PaidCoursesTab from "@/components/iitm/PaidCoursesTab";

const IITMBSPrep = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract current tab from URL path
  const getCurrentTab = () => {
    const pathSegments = location.pathname.split('/');
    const tabSegment = pathSegments[pathSegments.length - 1];
    
    // Valid tab values
    const validTabs = ['notes', 'pyqs', 'syllabus', 'courses', 'news', 'dates'];
    
    // If we're at the base path or invalid tab, default to notes
    if (pathSegments[pathSegments.length - 1] === 'iitm-bs' || !validTabs.includes(tabSegment)) {
      return 'notes';
    }
    
    return tabSegment;
  };
  
  const activeTab = getCurrentTab();
  
  // Handle tab changes by updating URL
  const handleTabChange = (tabValue: string) => {
    navigate(`/exam-preparation/iitm-bs/${tabValue}`);
  };
  
  // Redirect to default tab if at base path
  useEffect(() => {
    if (location.pathname === '/exam-preparation/iitm-bs' || location.pathname === '/exam-preparation/iitm-bs/') {
      navigate('/exam-preparation/iitm-bs/notes', { replace: true });
    }
  }, [location.pathname, navigate]);
  
  // Handle navigation to IITM BS Tools page
  const handleToolsRedirect = () => {
    navigate('/iitm-bs-tools');
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">IITM BS Degree Preparation</h1>
            <p className="text-xl text-gray-600">Comprehensive resources for IITM BS Data Science & Electronic Systems</p>
          </div>
          
          {/* Prominent redirect button to IITM BS Tools */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={handleToolsRedirect}
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 text-lg"
            >
              <Wrench className="h-6 w-6" />
              Access IITM BS Tools
              <ExternalLink className="h-5 w-5" />
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex w-max min-w-full">
                <TabsTrigger value="notes" className="whitespace-nowrap">Notes</TabsTrigger>
                <TabsTrigger value="pyqs" className="whitespace-nowrap">PYQs</TabsTrigger>
                <TabsTrigger value="syllabus" className="whitespace-nowrap">Syllabus</TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="whitespace-nowrap bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:via-yellow-600 data-[state=active]:to-yellow-700 shadow-lg border-2 border-yellow-400"
                >
                  ✨ Courses
                </TabsTrigger>
                <TabsTrigger value="news" className="whitespace-nowrap">News</TabsTrigger>
                <TabsTrigger value="dates" className="whitespace-nowrap">Important Dates</TabsTrigger>
              </TabsList>
            </div>
            
            <Routes>
              <Route path="/" element={<Navigate to="notes" replace />} />
              <Route path="/notes" element={
                <TabsContent value="notes" className="mt-6">
                  <BranchNotesTab />
                </TabsContent>
              } />
              <Route path="/pyqs" element={
                <TabsContent value="pyqs" className="mt-6">
                  <PYQsTab />
                </TabsContent>
              } />
              <Route path="/syllabus" element={
                <TabsContent value="syllabus" className="mt-6">
                  <SyllabusTab />
                </TabsContent>
              } />
              <Route path="/courses" element={
                <TabsContent value="courses" className="mt-6">
                  <PaidCoursesTab />
                </TabsContent>
              } />
              <Route path="/news" element={
                <TabsContent value="news" className="mt-6">
                  <NewsTab />
                </TabsContent>
              } />
              <Route path="/dates" element={
                <TabsContent value="dates" className="mt-6">
                  <ImportantDatesTab />
                </TabsContent>
              } />
            </Routes>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IITMBSPrep;
