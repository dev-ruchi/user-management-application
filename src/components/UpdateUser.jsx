import React, { useState } from "react";
import axios from "axios";

const UpdateUser = ({ users, updateUserIndex, setupdateUserIndex, setUsers }) => {

  const user = users[updateUserIndex];
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? formData : u))
        );

        setupdateUserIndex(-1);
        setLoading(false); // Stop loading spinner after success
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setLoading(false); // Stop loading spinner in case of error
      });
  };

  return (
    <div className="p-6 fixed bg-white shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-1/2">
      <button
        className="absolute right-4 top-4"
        onClick={() => setupdateUserIndex(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Update User</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block border p-2 rounded w-full"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Phone"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="username">
              UserName
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="street">
              Street
            </label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Street"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="city">
              City
            </label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="zipcode">
              Zipcode
            </label>
            <input
              type="text"
              name="address.zipcode"
              value={formData.address.zipcode}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Zipcode"
            />
          </div>
        </div>

        {/* Conditional rendering for button or spinner */}
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 01-8 8z"
              ></path>
            </svg>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
