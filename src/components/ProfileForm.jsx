import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/authSlice";
import { toast } from "react-toastify";

const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    linkedin: user?.linkedin || "",
    facebook: user?.facebook || "",
    instagram: user?.instagram || "",
    profileImage: user?.profileImage || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      linkedin: user?.linkedin || "",
      facebook: user?.facebook || "",
      instagram: user?.instagram || "",
      profileImage: user?.profileImage || "",
    });
  }, [user]);
  const imageRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profile: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUser(formData));
    if (updateUser.fulfilled.match(result)) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(result.payload || "Profile update failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4 w-full">
          {formData.profile ? (
            <img
              src={formData.profileImage}
              alt="Profile"
              onClick={() => isEditing && imageRef.current.click()}
              className="w-20 h-20 rounded-full object-cover border cursor-pointer"
            />
          ) : (
            <div
              onClick={() => isEditing && imageRef.current.click()}
              className="w-20 h-20 rounded-full flex items-center justify-center bg-[#0e3477] text-white text-3xl font-bold font-nunito select-none cursor-pointer"
            >
              {formData.profileImage || ""}
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-xl font-bold font-nunito">
              {formData.name || "Your Name"}
            </h2>
            <p className="text-gray-600 font-nunito">
              {formData.email || "email@example.com"}
            </p>

            {isEditing && (
              <div className="mt-2">
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="sm:hidden mt-3 bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-nunito hover:bg-blue-700 transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="hidden sm:inline-block bg-blue-600 text-white px-5 py-2 rounded text-sm font-nunito hover:bg-blue-700 transition"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium font-nunito">Name</label>
          <input
            type="text"
            name="name"
            disabled={!isEditing}
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-nunito ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium font-nunito">Email</label>
          <input
            type="email"
            name="email"
            disabled={!isEditing}
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-nunito ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium font-nunito">Phone</label>
          <input
            type="tel"
            name="phone"
            disabled={!isEditing}
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-nunito ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium font-nunito">
            Address
          </label>
          <textarea
            name="address"
            disabled={!isEditing}
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-nunito ${
              isEditing
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium font-nunito">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              disabled={!isEditing}
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Profile URL"
              className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-nunito ${
                isEditing
                  ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium font-nunito">
              Facebook
            </label>
            <input
              type="url"
              name="facebook"
              disabled={!isEditing}
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Facebook Profile URL"
              className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-nunito ${
                isEditing
                  ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium font-nunito">
              Instagram
            </label>
            <input
              type="url"
              name="instagram"
              disabled={!isEditing}
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Instagram Profile URL"
              className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-nunito ${
                isEditing
                  ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {isEditing && (
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-nunito text-base"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Updating..." : "Update"}
          </button>
        )}
        {error && (
          <div className="text-red-600 font-nunito text-sm mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
