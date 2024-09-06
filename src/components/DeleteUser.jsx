import React from "react";

const DeleteUser = ({ userId, onDelete, onClose }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not delete the user");
          }
          onDelete(userId); // Notify parent to update the list
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Delete User</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
