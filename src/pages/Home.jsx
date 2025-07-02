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
import { accordionItems, blogData } from "../../data";
import { fetchCourses,selectCourses,selectCourseStatus } from "../store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
   const dispatch = useDispatch();
    const courses = useSelector(selectCourses);
    const Status = useSelector(selectCourseStatus);
    useEffect(() => {
  if (status === "idle") {
    dispatch(fetchCourses());
  }
}, [dispatch, status]);
  return (
    <>
      <HeroMain />
      <FeatureSummary />
      <TopCompanies />
      <CourseTabs to={"/enroll"} label={'Enroll Now'}  />
      <MiniCard />
      <FAQSection faqs={accordionItems} />
      <Upskills />
      <TestimonialSlider />
      <CourseRoadmap />
      <BlogSection
        heading="Blog"
        paragraph="Check back every week for inspiring articles on website design and digital marketing to help build and expand your digital presence."
        blogData={blogData}
        showTabs={true}
        maxBlogs={3}
      />
      <CertificatesSection />
      <ContactFormSection />
    </>
  );
};

export default Home;
