import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  function fetchUserDetail() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }

  if (!user) {
    return <p>Loading user details...</p>; // Show loading state or an error
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{user.name}</h1>

        <p className="text-lg text-gray-600 mb-2">
          <strong>Phone: </strong>
          {user.phone}
        </p>

        <p className="text-lg text-gray-600 mb-2">
          <strong>Email: </strong>
          {user.email}
        </p>

        {user.address && (
          <p className="text-lg text-gray-600 mb-2">
            <strong>Address: </strong>
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </p>
        )}

        <p className="text-lg text-gray-600 mb-2">
          <strong>Website: </strong>
          <a
            href={`http://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {user.website}
          </a>
        </p>

        {user.company && (
          <p className="text-lg text-gray-600">
            <strong>Company: </strong>
            {user.company.name} - {user.company.catchPhrase}, {user.company.bs}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
