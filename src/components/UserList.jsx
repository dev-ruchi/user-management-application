import React from "react";
import { useState, useEffect } from "react";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";
import { Edit, Trash } from "react-feather";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [updateUserIndex, setupdateUserIndex] = useState(-1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [createUser, setCreateUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleCreateClick = () => {
    setCreateUser(true); // Open form when "Create" button is clicked
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Users</h2>
        <button
          onClick={handleCreateClick}
          className="bg-blue-500 text-white px-6 py-4 rounded"
        >
          Create
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-3 text-left sticky left-0 bg-gray-200 z-10">
                Name
              </th>
              <th className="py-3 px-3 text-left">Email</th>
              <th className="py-3 px-3 text-left">Phone</th>
              <th className="py-3 px-3 text-left">Username</th>
              <th className="py-3 px-3 text-left">Address</th>
              <th className="py-3 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-3 text-left whitespace-nowrap sticky left-0 z-10">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="py-3 px-3 text-left">{user.email}</td>
                <td className="py-3 px-3 text-left">{user.phone}</td>
                <td className="py-3 px-3 text-left">{user.username}</td>
                <td className="py-3 px-3 text-left">
                  {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
                </td>
                <td className="py-3 px-3 text-left">
                  <button
                    onClick={() => setupdateUserIndex(index)}
                    title="Edit"
                  >
                    <Edit className="mr-2" />
                  </button>
                  <button
                    onClick={() => setDeleteUserId(user.id)}
                    title="Delete"
                  >
                    <Trash className="mr-2" />
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

        <CreateUser createUser={createUser} setCreateUser={setCreateUser} />

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
