import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogHeroSection from "../components/BlogHeroSection";
import BlogSection from "../components/BlogSection";
import { fetchBlogs, clearBlogError, setBlogStatusIdle } from "../store/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchBlogs());

    return () => {
      dispatch(clearBlogError());
      dispatch(setBlogStatusIdle()); 
    };
  }, [dispatch]);

  return (
    <>
      <BlogHeroSection />
      <BlogSection
        heading="Latest Tech Blogs"
        paragraph="Explore the latest trends and insights in technology, design, and marketing."
        blogData={blogs}
        showTabs={true}
        maxBlogs={100}
        status={status}
        error={error}
      />
    </>
  );
};

export default Blog;
