import React, { useState } from "react";
import axios from "axios";
import { X } from "react-feather";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateUser = ({
  users,
  updateUserIndex,
  setupdateUserIndex,
  setUsers,
}) => {
  const user = users[updateUserIndex];
  const [loading, setLoading] = useState(false); // Loading state

  // Yup validation
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    username: Yup.string().required("Username is required"),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      zipcode: Yup.string().required("Zipcode is required"),
    }),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      username: user.username,
      address: {
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true); // Start loading spinner

      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, values)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === user.id ? values : u))
          );

          setupdateUserIndex(-1);
          setLoading(false); // Stop loading spinner after success
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          setLoading(false); // Stop loading spinner in case of error
        });
    },
  });

  return (
    <div className="p-6 fixed bg-white shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-1/2">
      <button
        className="absolute right-4 top-4"
        onClick={() => setupdateUserIndex(-1)}
      >
        <X />
      </button>
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Update User</h2>
      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block border p-2 rounded w-full ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border p-2 rounded w-full ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label className="block mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border p-2 rounded w-full ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Phone"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>
          <div>
            <label className="block mb-1" htmlFor="username">
              UserName
            </label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border p-2 rounded w-full ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm">
                {formik.errors.username}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1" htmlFor="street">
              Street
            </label>
            <input
              type="text"
              name="address.street"
              value={formik.values.address.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border p-2 rounded w-full ${
                formik.touched.address?.street && formik.errors.address?.street
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Street"
            />
            {formik.touched.address?.street &&
              formik.errors.address?.street && (
                <div className="text-red-500 text-sm">
                  {formik.errors.address.street}
                </div>
              )}
          </div>
          <div>
            <label className="block mb-1" htmlFor="city">
              City
            </label>
            <input
              type="text"
              name="address.city"
              value={formik.values.address.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border p-2 rounded w-full ${
                formik.touched.address?.city && formik.errors.address?.city
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="City"
            />
            {formik.touched.address?.city && formik.errors.address?.city && (
              <div className="text-red-500 text-sm">
                {formik.errors.address.city}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1" htmlFor="zipcode">
              Zipcode
            </label>
            <input
              type="text"
              name="address.zipcode"
              value={formik.values.address.zipcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border p-2 rounded w-full ${
                formik.touched.address?.zipcode &&
                formik.errors.address?.zipcode
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Zipcode"
            />
            {formik.touched.address?.zipcode &&
              formik.errors.address?.zipcode && (
                <div className="text-red-500 text-sm">
                  {formik.errors.address.zipcode}
                </div>
              )}
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
