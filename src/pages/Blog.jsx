import React from "react";
import BlogHeroSection from "../components/BlogHeroSection";
import BlogSection from "../components/BlogSection";
import { blogData } from "../../data";

const Blog = () => {
  return (
    <>
      <BlogHeroSection />
      <BlogSection
        heading="Latest Tech Blogs"
        paragraph="Explore the latest trends and insights in technology, design, and marketing."
        blogData={blogData}
        showTabs={true}
         maxBlogs={100}
      />
    </>
  );
};

export default Blog;
