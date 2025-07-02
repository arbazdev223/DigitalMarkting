import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
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
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CartPage from "./pages/CartPage";
import CourseResumePage from "./pages/CourseResumePage";
import CheckoutPage from "./pages/CheckoutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CertificatePage from "./pages/CertificatePage";
import { loadUser } from "./store/authSlice";
import { fetchCourses } from "./store/courseSlice"; 

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    const getCookie = (name) => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
    };

    const token = getCookie("token");
    if (token && !isLoggedIn) {
      dispatch(loadUser());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <TopBar />
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
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/courseStudent/:id" element={<CourseResumePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route
          path="/auth"
          element={
            status === "loading"
              ? null // or <LoadingSpinner />
              : isLoggedIn && user
              ? <Navigate to="/" replace />
              : <AuthTabs />
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn && user ? <Profile /> : <Navigate to="/auth" replace />
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
