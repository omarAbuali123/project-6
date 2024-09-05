
import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Save, Image as ImageIcon } from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/chefinfo";

const Chefinfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/profile/${userId}`);
          setProfile({
            ...response.data,
            password: "",
            imageUrl: response.data.image || "/api/placeholder/150/150",
          });
          setError(null);
        } catch (error) {
          console.error("Error fetching chef profile:", error);
          setError("Failed to fetch profile. Please try again.");
        }
      }
    };

    fetchChefProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const { username, email, password, imageUrl } = profile;
        const response = await axios.put(`${API_BASE_URL}/profile/${userId}`, {
          username,
          email,
          password: password || undefined,
          image: imageUrl,
        });
        setProfile({
          ...response.data,
          password: "",
          imageUrl: response.data.image || "/api/placeholder/150/150",
        });
        setIsEditing(false);
        setError(null);
        console.log("Profile saved:", response.data);
      } catch (error) {
        console.error("Error updating chef profile:", error);
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-700 text-white p-6 text-center">
          <h1 className="text-3xl font-bold italic">Bella Italia Profile</h1>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mb-6 text-center">
            <img
              src={profile.imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
            />
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="flex items-center text-gray-700 mb-1"
              >
                <User size={20} className="mr-2" /> Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-gray-700 mb-1"
              >
                <Mail size={20} className="mr-2" /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="flex items-center text-gray-700 mb-1"
              >
                <Lock size={20} className="mr-2" /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter new password" : "********"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            {isEditing && (
              <div>
                <label
                  htmlFor="imageUrl"
                  className="flex items-center text-gray-700 mb-1"
                >
                  <ImageIcon size={20} className="mr-2" /> Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={profile.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            )}
            <div className="mt-6 flex justify-center">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                  <Save size={20} className="mr-2" /> Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chefinfo;