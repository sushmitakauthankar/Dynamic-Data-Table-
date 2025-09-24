import React, { useState } from "react";
import TableRow from "../TableRow/TableRow";
import "./Table.css";

function Table({
  users,
  setUsers,
  selectedRows,
  setSelectedRows,
  sortConfig,
  setSortConfig,
}) {
  const [editingId, setEditingId] = useState(null);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === users.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map((user) => user.id));
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "⇅";
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedRows.length === users.length && users.length > 0}
            />
          </th>
          <th>ID</th>
          <th onClick={() => requestSort("name")} className="sortable">
            Name {getSortIcon("name")}
          </th>
          <th onClick={() => requestSort("email")} className="sortable">
            Email {getSortIcon("email")}
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              users={users}
              setUsers={setUsers}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          ))
        ) : (
          <tr>
            <td colSpan="6">No matching records</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
