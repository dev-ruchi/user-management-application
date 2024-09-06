import React from "react";
import { useState, useEffect } from "react";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [updateUserIndex, setupdateUserIndex] = useState(-1);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // fetch users from api
  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch tha data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((err) => {
        setUsers("");
        setError(err.message);
      });
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setDeleteUserId(null); // Close the delete confirmation dialog
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Update User</th>
              <th className="py-3 px-6 text-left">Delete User</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.name}
                </td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.phone}</td>
                <td className="py-3 px-6 text-left">{user.username}</td>
                <td className="py-3 px-6 text-left">{`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => setupdateUserIndex(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => setDeleteUserId(user.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {updateUserIndex !== -1 && (
          <UpdateUser
            users={users}
            setUsers={setUsers}
            updateUserIndex={updateUserIndex}
            setupdateUserIndex={setupdateUserIndex}
          />
        )}

        {deleteUserId !== null && (
          <DeleteUser
            userId={deleteUserId}
            onDelete={handleDelete}
            onClose={() => setDeleteUserId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
