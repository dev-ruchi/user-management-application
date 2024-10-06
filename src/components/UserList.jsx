import React, { useState, useEffect } from "react";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";
import { Edit, Trash } from "react-feather";
import { ThreeDots } from "react-loader-spinner";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [updateUserIndex, setupdateUserIndex] = useState(-1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [createUser, setCreateUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((err) => {
        setUsers([]);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setDeleteUserId(null); // Close the delete confirmation dialog
  };

  const handleCreateClick = () => {
    setCreateUser(true); // Open form when "Create" button is clicked
  };

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter users by name
  );

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

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {loading ? ( // Show spinner while loading
        <div className="flex justify-center items-center h-40">
          <ThreeDots color="#007BFF" height={50} width={50} />
        </div>
      ) : (
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
              {filteredUsers.map((user, index) => (
                <tr
                  key={`${user.id}-${index}`}
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
        </div>
      )}

      {updateUserIndex !== -1 && (
        <UpdateUser
          users={users}
          setUsers={setUsers}
          updateUserIndex={updateUserIndex}
          setupdateUserIndex={setupdateUserIndex}
        />
      )}

      <CreateUser
        createUser={createUser}
        setCreateUser={setCreateUser}
        setUsers={setUsers}
      />

      {deleteUserId !== null && (
        <DeleteUser
          userId={deleteUserId}
          onDelete={handleDelete}
          onClose={() => setDeleteUserId(null)}
        />
      )}
    </div>
  );
};

export default UserList;
