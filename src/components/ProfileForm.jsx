import React, { useState, useEffect } from "react";

const ProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-bold">
              {formData.name || "Your Name"}
            </h2>
            <p className="text-gray-600">
              {formData.email || "email@example.com"}
            </p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            disabled={!isEditing}
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            disabled={!isEditing}
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            disabled={!isEditing}
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            disabled={!isEditing}
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {isEditing && (
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
