import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { blogData } from "../../data";
import Sidebar from "../components/Sidebar";

const BlogDetails = () => {
  const { id } = useParams();
  const post = blogData.find((b) => String(b.id) === String(id));
  const [comment, setComment] = useState("");
  const isLoggedIn = true;

  if (!post) return <div className="text-center py-10">Blog post not found.</div>;

  const latestFive = blogData
    .filter((b) => String(b.id) !== String(id))
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#0e3477] mb-2">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {post.date} • {post.category}
          </p>
          <div className="text-gray-700 leading-relaxed space-y-4 mb-10">
            <p>{post.content}</p>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-[#0e3477]">
              Leave a Comment
            </h3>
            {isLoggedIn ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Comment submitted: " + comment);
                  setComment("");
                }}
                className="space-y-4"
              >
                <textarea
                  className="w-full border rounded p-3 focus:outline-none"
                  rows="4"
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#0e3477] text-white px-6 py-2 rounded hover:bg-[#092759]"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="text-gray-600">Please login to leave a comment.</p>
            )}
          </div>
        </div>
        <div className="lg:col-span-1 h-fit">
          <div className="sticky top-20">
            <Sidebar latestPosts={latestFive} maxNumber={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
