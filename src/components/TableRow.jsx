import React, { useState } from "react";
import "./TableRow.css";

function TableRow({
  user,
  users,
  setUsers,
  selectedRows,
  setSelectedRows,
  editingId,
  setEditingId,
}) {
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEdit = () => {
    setEditingId(user.id);
  };

  const saveEdit = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, name: editName, email: editEmail } : u
      )
    );
    setEditingId(null);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== user.id));
  };

  const handleToggleStatus = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(user.id)}
          onChange={() => handleRowSelect(user.id)}
        />
      </td>
      <td>{user.id}</td>
      <td>
        {editingId === user.id ? (
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {editingId === user.id ? (
          <input
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        ) : (
          user.email
        )}
      </td>
      <td>{user.status}</td>
      <td>
        {editingId === user.id ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleToggleStatus}>
          {user.status === "Active" ? "Deactivate" : "Activate"}
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
