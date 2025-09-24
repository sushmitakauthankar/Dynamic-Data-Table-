import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./Export.css";

const ExportButtons = ({ users, filteredUsers, selectedRows }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const getData = (type) =>
    type === "all" ? filteredUsers : users.filter(u => selectedRows.includes(u.id));

  const exportCSVExcel = (type, format = "csv") => {
    const data = getData(type);
    if (!data.length) return alert("No rows to export!");

    const csv = [
      ["ID", "Name", "Email", "Status"].join(","),
      ...data.map(u => `${u.id},"${u.name}","${u.email}",${u.status}`)
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = format === "excel" ? "users_export.xls" : "users_export.csv";
    link.click();
    setOpenMenu(null);
  };

  const exportPDF = (type) => {
    const data = getData(type);
    if (!data.length) return alert("No rows to export!");

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Users Export", 14, 15);

    const rows = data.map(u => [u.id, u.name, u.email, u.status]);

    autoTable(doc, {
      head: [["ID", "Name", "Email", "Status"]],
      body: rows,
      startY: 20,
    });

    doc.save("users_export.pdf");
    setOpenMenu(null);
  };

  return (
    <div className="export-buttons-container">
      <div className="main-buttons">
        <div className="export-btn-wrapper">
          <button onClick={() => setOpenMenu(openMenu === "all" ? null : "all")}>
            Export All ▼
          </button>
          {openMenu === "all" && (
            <div className="dropdown">
              <div onClick={() => exportPDF("all")}>PDF</div>
              <div onClick={() => exportCSVExcel("all", "csv")}>CSV</div>
              <div onClick={() => exportCSVExcel("all", "excel")}>Excel</div>
            </div>
          )}
        </div>

        <div className="export-btn-wrapper">
          <button onClick={() => setOpenMenu(openMenu === "selected" ? null : "selected")}>
            Export Selected ▼
          </button>
          {openMenu === "selected" && (
            <div className="dropdown">
              <div onClick={() => exportPDF("selected")}>PDF</div>
              <div onClick={() => exportCSVExcel("selected", "csv")}>CSV</div>
              <div onClick={() => exportCSVExcel("selected", "excel")}>Excel</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportButtons;
