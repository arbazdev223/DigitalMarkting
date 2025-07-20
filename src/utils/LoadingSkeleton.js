// utils/LoadingSkeleton.jsx
const LoadingSkeleton = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20 animate-pulse">
      {/* Top section skeleton */}
      <div className="bg-gradient-to-br from-primary to-[#1e4d9c] text-white px-2 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 items-center">
          <div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="hidden md:block">
            <div className="w-full h-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Course body skeleton */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 mt-10">
        <div className="lg:col-span-2 space-y-8 pr-2">
          {/* Learn section */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>

          {/* Curriculum section */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded w-full"></div>
            ))}
          </div>

          {/* Requirements and Description */}
          <div className="h-5 bg-gray-300 rounded w-1/4 mt-6 mb-2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="bg-white shadow-lg rounded-md overflow-hidden border">
          <div className="w-full h-56 bg-gray-300"></div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
);
};

export default LoadingSkeleton;
