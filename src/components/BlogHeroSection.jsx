import React, { useState, useEffect, useRef } from "react";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, clearBlogError } from "../store/blogSlice";

const BlogHeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const { blogs, status, error } = useSelector((state) => state.blog);
  const [current, setCurrent] = useState(0);

  const latestPosts = blogs.slice(0, 5);
  const post = latestPosts[current];
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
    return () => {
      dispatch(clearBlogError());
    };
  }, [status, dispatch]);
  useEffect(() => {
    if (latestPosts.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === latestPosts.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [current, latestPosts.length]);

  const goTo = (idx) => {
    setCurrent(idx);
  };

  // const prevPost = () => {
  //   setCurrent((prev) => (prev === 0 ? latestPosts.length - 1 : prev - 1));
  // };

  // const nextPost = () => {
  //   setCurrent((prev) => (prev === latestPosts.length - 1 ? 0 : prev + 1));
  // };

 const handleNavigate = () => {
  if (post?._id) {
    navigate(`/blog/${post._id}`);
  }
};

  if (status === "loading") {
    return (
      <section className="py-10 text-center text-gray-500 font-nunito">
        Loading featured blog...
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="py-10 text-center text-red-500 font-nunito">
        {error || "No featured blog available."}
      </section>
    );
  }

  return (
    <section className="bg-white w-full py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center rounded-xl overflow-hidden shadow-md">
        <div
          className="md:w-1/2 w-full flex flex-col justify-center p-6 cursor-pointer"
          onClick={handleNavigate}
        >
          <span className="text-xs md:text-sm font-bold text-primary uppercase mb-2 tracking-wide font-nunito">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-3xl font-bold text-primary mb-4 font-opensans">
            {post.title}
          </h1>
          <p className="text-md text-gray-700 mb-6 font-nunito">{post.excerpt}</p>
          <div className="flex items-center mb-4">
            {post?.author?.image ? (
              <img src={post.author.image} alt={post.author.name} className="w-10 h-10 rounded-full" />
            ) : (
              <RxAvatar className="w-10 h-10 text-gray-400" />
            )}
            <span className="text-base font-semibold text-gray-800 font-nunito ml-2">
              {post?.author?.name || "Admin"}
            </span>
            <span className="ml-4 text-sm text-gray-500 font-nunito">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          {/* <div className="flex gap-2 mt-2">
            <button
              onClick={prevPost}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-primary font-bold"
              aria-label="Previous"
            >
              &#8592;
            </button>
            <button
              onClick={nextPost}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-primary font-bold"
              aria-label="Next"
            >
              &#8594;
            </button>
          </div> */}
        </div>

        <div
          className="md:w-1/2 w-full flex items-center justify-center p-4 cursor-pointer"
          onClick={handleNavigate}
        >
          <img
            src={post.coverImage}
            alt={post.title}
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
              current === idx ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default BlogHeroSection;
