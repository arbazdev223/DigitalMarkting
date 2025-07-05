import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogById,
  clearSelectedBlog,
  addComment,
} from "../store/blogSlice";
import Sidebar from "../components/Sidebar";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Blog state
  const { selectedBlog, blogs, status, error } = useSelector((state) => state.blog);

  // Auth state
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

  // Load blog on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
    return () => {
      dispatch(clearSelectedBlog());
    };
  }, [dispatch, id]);

  // Prefill name/email if logged in
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
    if (!comment.trim()) return;

    const payload = {
      blogId: id,
      name: name || "Anonymous",
      email: email || "",
      text: isLoggedIn && subject ? `${subject}: ${comment}` : comment,
    };

    dispatch(addComment(payload));

    // Reset fields
    setComment("");
    setSubject("");
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
            src={selectedBlog.img}
            alt={selectedBlog.title}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#0e3477] mb-2">
            {selectedBlog.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(selectedBlog.date).toLocaleDateString()} • {selectedBlog.category}
          </p>
          <div className="text-gray-700 leading-relaxed space-y-4 mb-10">
            <p>{selectedBlog.content}</p>
          </div>

          {/* 💬 Comments */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-[#0e3477]">
              Comments
            </h3>
            {selectedBlog.comments?.length > 0 ? (
              <div className="space-y-4 mb-6">
                {selectedBlog.comments.map((c, idx) => (
                  <div key={idx} className="border rounded p-3">
                    <p className="text-sm font-semibold text-[#0e3477]">{c.name}</p>
                    <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mb-6">No comments yet. Be the first!</p>
            )}

            {/* 📝 Comment Form */}
            <h3 className="text-xl font-semibold mb-4 text-[#0e3477]">Leave a Comment</h3>
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
              <button
                type="submit"
                className="bg-[#0e3477] text-white px-6 py-2 rounded hover:bg-[#092759]"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
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
