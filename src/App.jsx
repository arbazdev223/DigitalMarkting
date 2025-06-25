import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SocialIcons from "./components/SocialIcons";
import Footer from "./components/Footer";
import CallToAction from "./components/CallToAction";
import AuthTabs from "./components/AuthTabs";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import TopBar from "./components/TopBar";
import BlogDetails from "./pages/BlogDetails";
import CourseDetails from "./pages/CourseDetails";

const App = () => {
  return (
    <>
    <TopBar/>
      <Header />
      <SocialIcons />
      <CallToAction />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/auth" element={<AuthTabs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
