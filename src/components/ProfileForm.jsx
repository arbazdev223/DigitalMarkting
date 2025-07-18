import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitials, loadUser, updateUser, clearError } from "../store/authSlice";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const [isEditing, setIsEditing] = useState(false);
  const imageRef = useRef();
const [passwordVisibility, setPasswordVisibility] = useState({
  old: false,
  new: false,
  confirm: false,
});
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    linkedin: user?.linkedin || "",
    facebook: user?.facebook || "",
    instagram: user?.instagram || "",
    profileImage: user?.profileImage || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      linkedin: user?.linkedin || "",
      facebook: user?.facebook || "",
      instagram: user?.instagram || "",
      profileImage: user?.profileImage || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    dispatch(clearError());
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
const togglePasswordVisibility = (field) => {
  setPasswordVisibility((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    name: formData.name,
    phone: formData.phone,
    address: formData.address,
    profileImage: formData.profileImage,
    linkedin: formData.linkedin,
    facebook: formData.facebook,
    instagram: formData.instagram,
  };

  if (
    formData.oldPassword ||
    formData.newPassword ||
    formData.confirmNewPassword
  ) {
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmNewPassword
    ) {
      toast.error("All password fields are required.");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    data.oldPassword = formData.oldPassword;
    data.newPassword = formData.newPassword;
    data.confirmNewPassword = formData.confirmNewPassword;
  }

  const result = await dispatch(updateUser(data));

  if (updateUser.fulfilled.match(result)) {
    toast.success("Profile updated successfully!");
    setIsEditing(false); 
  } else {
    toast.error(result.payload || "Update failed");
  }
};





  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4 w-full">
          {formData.profileImage ? (
            <img
              src={formData.profileImage}
              alt="Profile"
              onClick={() => isEditing && imageRef.current.click()}
              className="w-20 h-20 rounded-full object-cover border cursor-pointer"
            />
          ) : (
            <div
              onClick={() => isEditing && imageRef.current.click()}
              className="w-20 h-20 rounded-full flex items-center justify-center bg-primary text-white text-2xl font-bold font-nunito select-none cursor-pointer"
            >
              {getInitials(formData.name)}
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-xl font-bold font-nunito">
              {formData.name || "Your Name"}
            </h2>
            <p className="text-gray-600 font-nunito">
              {user?.email || "email@example.com"}
            </p>

            {isEditing && (
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
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
        {["name", "phone", "address"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium font-nunito capitalize">{field}</label>
            {field === "address" ? (
              <textarea
                name={field}
                rows={3}
                disabled={!isEditing}
                value={formData[field]}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm font-nunito ${
                  isEditing ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            ) : (
              <input
                type={field === "phone" ? "tel" : "text"}
                name={field}
                disabled={!isEditing}
                value={formData[field]}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm font-nunito ${
                  isEditing ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            )}
          </div>
        ))}

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["linkedin", "facebook", "instagram"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium font-nunito capitalize">{field}</label>
              <input
                type="url"
                name={field}
                disabled={!isEditing}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`${field} Profile URL`}
                className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm font-nunito ${
                  isEditing ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Password Section */}
       {isEditing && (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="relative">
        <label className="block text-sm font-medium font-nunito">Old Password</label>
        <input
          type={passwordVisibility.old ? "text" : "password"}
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-nunito pr-10"
        />
        <span
          onClick={() => togglePasswordVisibility("old")}
          className="absolute bottom-2.5 right-3 cursor-pointer text-gray-500"
        >
          {passwordVisibility.old ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
      </div>

      {/* New Password */}
      <div className="relative">
        <label className="block text-sm font-medium font-nunito">New Password</label>
        <input
          type={passwordVisibility.new ? "text" : "password"}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-nunito pr-10"
        />
        <span
          onClick={() => togglePasswordVisibility("new")}
          className="absolute bottom-2.5 right-3 cursor-pointer text-gray-500"
        >
          {passwordVisibility.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label className="block text-sm font-medium font-nunito">Confirm New Password</label>
        <input
          type={passwordVisibility.confirm ? "text" : "password"}
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-nunito pr-10"
        />
        <span
          onClick={() => togglePasswordVisibility("confirm")}
          className="absolute bottom-2.5 right-3 cursor-pointer text-gray-500"
        >
          {passwordVisibility.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
      </div>
    </div>

    <button
      type="submit"
      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-nunito text-base"
      disabled={status === "loading"}
    >
      {status === "loading" ? "Updating..." : "Update"}
    </button>
  </>
)}

      </form>
    </div>
  );
};

export default ProfileForm;
