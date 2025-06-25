import React, { useState, useEffect, useRef } from "react";
import { blogData } from "../../data";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const BlogHeroSection = () => {
  const latestPosts = blogData.slice(0, 5);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === latestPosts.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [latestPosts.length]);

  const goTo = (idx) => {
    setCurrent(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === latestPosts.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  const prevPost = () => {
    goTo(current === 0 ? latestPosts.length - 1 : current - 1);
  };

  const nextPost = () => {
    goTo(current === latestPosts.length - 1 ? 0 : current + 1);
  };

  const post = latestPosts[current];

  const handleNavigate = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <section className="bg-white w-full py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center rounded-xl overflow-hidden shadow-md">
        <div className="md:w-1/2 w-full flex flex-col justify-center p-6 cursor-pointer" onClick={handleNavigate}>
          <span className="text-xs md:text-sm font-bold text-[#0e3477] uppercase mb-2 tracking-wide font-nunito">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-3xl font-bold text-[#0e3477] mb-4 font-opensans">
            {post.title}
          </h1>
          <p className="text-md text-gray-700 mb-6 font-nunito">
            {post.excerpt}
          </p>
          <div className="flex items-center mb-4">
            {post.avatar ? (
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
            ) : (
              <RxAvatar className="w-10 h-10 text-gray-400" />
            )}
            <span className="text-base font-semibold text-gray-800 font-nunito ml-2">
              {post.author}
            </span>
            <span className="ml-4 text-sm text-gray-500 font-nunito">
              {post.date} | {post.time}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={prevPost}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-[#0e3477] font-bold"
              aria-label="Previous"
            >
              &#8592;
            </button>
            <button
              onClick={nextPost}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-[#0e3477] font-bold"
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        </div>
        <div
          className="md:w-1/2 w-full flex items-center justify-center p-4 cursor-pointer"
          onClick={handleNavigate}
        >
          <img
            src={post.img}
            alt="Blog Banner"
            className="w-full h-56 md:h-80 object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {latestPosts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === idx ? "bg-[#0e3477]" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default BlogHeroSection;
