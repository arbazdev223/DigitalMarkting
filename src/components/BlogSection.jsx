import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchBlogs,
  clearBlogError,
} from "../store/blogSlice"; 

const BlogSection = ({
  heading = "Blog",
  paragraph = "Check back every week for inspiring articles on website design and digital marketing to help build and expand your digital presence.",
  showTabs = true,
  maxBlogs = 3,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const { blogs, status, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
    return () => {
      dispatch(clearBlogError());
    };
  }, [status, dispatch]);

  const categories = ["All", ...new Set((Array.isArray(blogs) ? blogs : []).map((b) => b.category))];


  const getFilteredBlogs = () => {
    const sorted = (Array.isArray(blogs) ? blogs : []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    if (activeTab === "All") return sorted.slice(0, maxBlogs);
    return sorted.filter((b) => b.category === activeTab).slice(0, maxBlogs);
  };

  const filteredBlogs = getFilteredBlogs();

  return (
    <section className="bg-white py-12 sm:py-16 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-nunito font-bold uppercase mb-4">
          {heading}
        </h2>
        <p className="text-lg sm:text-xl font-thin font-nunito text-gray-700 max-w-3xl mx-auto">
          {paragraph}
        </p>
      </div>

      {showTabs && (
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md border ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300"
              } hover:bg-black hover:text-white transition text-sm sm:text-base`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {status === "loading" ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden cursor-pointer"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-md font-bold mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600">{blog.excerpt}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No blogs available for this category.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
