import { useParams } from "react-router-dom";
import { courseData } from "../../data";

const CourseResumePage = () => {
  const { id } = useParams();
  const course = courseData.find((c) => String(c.id) === String(id));

  if (!course) {
    return (
      <div className="bg-[#001932] text-white min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#001932] text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="mb-4">
        {course.description || "No description available."}
      </p>

      <div className="bg-white text-black rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Progress</h2>
        <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${
                course.totalHours && course.watchedHours
                  ? Math.round((course.watchedHours / course.totalHours) * 100)
                  : 0
              }%`,
            }}
          ></div>
        </div>
        <p className="mt-1 text-green-700">
          {course.totalHours && course.watchedHours
            ? Math.round((course.watchedHours / course.totalHours) * 100)
            : 0}
          % Completed
        </p>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Your Performance Status</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Module 1: Introduction - 100%</li>
            <li>Module 2: Basics - 100%</li>
            <li>Module 3: Intermediate - 80%</li>
            <li>Module 4: Advanced - 0%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseResumePage;
