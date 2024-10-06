import React from "react";
import axios from "axios";
import { X } from "react-feather";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateUser = ({ createUser, setCreateUser, setUsers }) => {
  // Yup validation
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    address: Yup.object().shape({
      street: Yup.string().required("Street is required"),
      suite: Yup.string().required("Suite is required"),
      city: Yup.string().required("City is required"),
      zipcode: Yup.string().required("Zipcode is required"),
    }),
  });

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      ...values,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/users", payload)
      .then((response) => {
        alert("User created successfully!");
        setUsers((prevUsers) => [...prevUsers, response.data]);
        resetForm();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setCreateUser(false); // Close form
  };

  return (
    <>
      {createUser && (
        <div className="p-4 fixed bg-white shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-1/2">
          <button className="absolute right-4 top-4" onClick={handleClose}>
            {/* Remove the user create  page */}

            <X />
          </button>
          <h2 className="text-2xl font-bold mb-4">Create New User</h2>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              username: "",
              address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
              },
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange }) => (
              <Form noValidate>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Phone</label>
                  <Field
                    type="text"
                    name="phone"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <Field
                    type="text"
                    name="username"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Street</label>
                  <Field
                    type="text"
                    name="address.street"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="address.street"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Suite</label>
                  <Field
                    type="text"
                    name="address.suite"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="address.suite"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">City</label>
                  <Field
                    type="text"
                    name="address.city"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="address.city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Zipcode</label>
                  <Field
                    type="text"
                    name="address.zipcode"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="address.zipcode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Create User
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default CreateUser;
