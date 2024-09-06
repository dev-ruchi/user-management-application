import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState({
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  });

  const handleSubmit = (e) => {
    const payload = {
      name: name,
      email: email,
      phone: phone,
      username: username,
      address: {
        street: address.street,
        suite: address.suite,
        city: address.city,
        zipcode: address.zipcode,
      },
    };

    e.preventDefault();

    axios
      .post("https://jsonplaceholder.typicode.com/users", payload)
      .then((response) => {
        console.log("User created:", response.data);
        alert("User created successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setUsername("");
        setAddress({
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Address</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Street</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Suite</label>
          <input
            type="text"
            name="suite"
            value={address.suite}
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Zipcode</label>
          <input
            type="text"
            name="zipcode"
            value={address.zipcode}
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
