import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeBanner from "../components/HomeBanner";
import CourseTabs from "../components/CourseTabs";
import FAQSection from "../components/FaqSection";
import TestimonialSlider from "../components/TestimonialSlider";
import BlogSection from "../components/BlogSection";
import MiniCard from "../components/MiniCard";
import ContactFormSection from "../components/ContactFormSection";
import Upskills from "../components/Upskills";
import CourseRoadmap from "../components/CourseRoadmap";
import CertificatesSection from "../components/CertificatesSection";
import HeroMain from "../components/HeroMain";
import TopCompanies from "../components/TopCompanies";
import FeatureSummary from "../components/FeatureSummary";

import { accordionItems } from "../../data";
import { fetchCourses, selectCourseStatus } from "../store/courseSlice";
import { fetchBlogs, clearBlogError } from "../store/blogSlice";

const Home = () => {
  const dispatch = useDispatch();

  const courseStatus = useSelector(selectCourseStatus);
  const { blogs, status: blogStatus, error: blogError } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }

    return () => {
      dispatch(clearBlogError());
    };
  }, [dispatch, courseStatus]);

  return (
    <>
      <HeroMain />
      <FeatureSummary />
      <TopCompanies />
      <CourseTabs to={"/enroll"} label={"Enroll Now"} />
      <MiniCard />
      <FAQSection faqs={accordionItems} />
      <Upskills />
      <TestimonialSlider />
      <CourseRoadmap />
      <BlogSection
        heading="Blog"
        paragraph="Check back every week for inspiring articles on website design and digital marketing to help build and expand your digital presence."
        blogData={blogs}
        showTabs={true}
        maxBlogs={3}
        status={blogStatus}
        error={blogError}
      />
      <CertificatesSection />
      <ContactFormSection />
    </>
  );
};

export default Home;
