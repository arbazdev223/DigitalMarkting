import React from "react";

const Sidebar = ({
  latestPosts = [],
  maxNumber = 5, 
  bannerTitle = "Boost Your Skills!",
  bannerDesc = "Join our premium courses and get certified today.",
  showForm = true,
}) => {
  const displayedPosts = latestPosts.slice(0, maxNumber); 

  return (
    <aside className="space-y-10 sticky top-20 h-fit">
      {displayedPosts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#0e3477]">
            Latest Posts
          </h3>
          <div className="space-y-4">
            {displayedPosts.map((item) => (
              <div key={item.id} className="border-b pb-3">
                <h4 className="font-bold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600">
                  {item.excerpt?.slice(0, 60)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#0e3477] text-white p-6 rounded-lg shadow-lg text-center">
        <h4 className="text-lg font-semibold mb-2">{bannerTitle}</h4>
        <p className="text-sm">{bannerDesc}</p>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-lg font-semibold mb-4 text-[#0e3477]">
            Get in Touch
          </h4>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded focus:outline-none"
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 border rounded focus:outline-none"
              rows="3"
            ></textarea>
            <button className="bg-[#0e3477] text-white px-4 py-2 rounded hover:bg-[#092759]">
              Submit
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
