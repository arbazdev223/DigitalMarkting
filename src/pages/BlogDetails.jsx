import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogById,
  clearSelectedBlog,
  addComment,
  fetchBlogs, 
} from "../store/blogSlice";
import Sidebar from "../components/Sidebar";
import { FaStar } from "react-icons/fa";
import { transformHTML } from "../utils/transformHTML";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedBlog, blogs, status, error } = useSelector((state) => state.blog);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
const [selectedBlogContent, setSelectedBlogContent] = useState("");
useEffect(() => {
  if (selectedBlog?.content?.length > 0) {
    const rawHTML = selectedBlog.content
      .map((item) => {
        if (!item?.type || !item?.value) return "";

        if (item.type === "image") {
          return `<img src="${item.value}" alt="blog image"/>`;
        }
        return `<${item.type}>${item.value}</${item.type}>`;
      })
      .join("<br/>");

    const transformed = transformHTML(rawHTML); 
    setSelectedBlogContent(transformed);
  }
}, [selectedBlog]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (id) dispatch(fetchBlogById(id));
    return () => dispatch(clearSelectedBlog());
  }, [dispatch, id]);
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);

  useEffect(() => {
    if (isLoggedIn && user) {
      setName(user.name || "User");
      setEmail(user.email || "");
    } else {
      setName("");
      setEmail("");
    }
  }, [isLoggedIn, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) return;

    const payload = {
      blogId: id,
      name: name || "Anonymous",
      email: email || "",
      text: isLoggedIn && subject ? `${subject}: ${comment}` : comment,
      rating,
    };

    dispatch(addComment(payload));
    setComment("");
    setSubject("");
    setRating(0);
    if (!isLoggedIn) {
      setName("");
      setEmail("");
    }
  };

  if (status === "loading" || !selectedBlog) {
    return <div className="text-center py-10 text-gray-500">Loading blog...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={selectedBlog.coverImage}
            alt={selectedBlog.title}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {selectedBlog.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(selectedBlog.createdAt).toLocaleDateString()} • {selectedBlog.category}
          </p>
       <div
  className="text-gray-700 leading-relaxed space-y-4 mb-10 prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: selectedBlogContent }}
></div>
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Comments</h3>
            {selectedBlog.comments?.length > 0 ? (
              <div className="space-y-4 mb-6">
                {selectedBlog.comments.map((c, idx) => (
                  <div key={idx} className="border rounded p-3">
                    <p className="text-sm font-semibold text-primary">{c.name}</p>
                    <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                    {c.rating && (
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < c.rating ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mb-6">No comments yet. Be the first!</p>
            )}
            <h3 className="text-xl font-semibold mb-4 text-primary">Leave a Comment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoggedIn && (
                <>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border rounded p-3 focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border rounded p-3 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </>
              )}
              {isLoggedIn && (
                <input
                  type="text"
                  placeholder="Subject (optional)"
                  className="w-full border rounded p-3 focus:outline-none"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              )}
              <textarea
                className="w-full border rounded p-3 focus:outline-none"
                rows="4"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <div className="flex items-center gap-1">
                <span className="text-sm mr-2">Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={`cursor-pointer ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-[#092759]"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-1 h-fit">
          <div className="sticky top-20">
            <Sidebar latestPosts={blogs} maxNumber={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
