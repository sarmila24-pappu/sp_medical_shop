import { useEffect, useState } from "react";
import "./PatientList.css";

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null); // 👈 NEW

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  // 🔍 SEARCH
  const filteredPatients = patients.filter((p) => {
    const key = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(key) ||
      p.email?.toLowerCase().includes(key) ||
      p.phone?.includes(search)
    );
  });

  // ✏️ START EDIT
  const startEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...patients[index] });
  };

  // ✅ SAVE EDIT
  const saveEdit = () => {
    const updated = [...patients];
    updated[editIndex] = editData;
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
    setEditIndex(null);
  };

  // ❌ CANCEL EDIT
  const cancelEdit = () => {
    setEditIndex(null);
  };

  // 🗑️ ASK DELETE (INLINE)
  const askDelete = (index) => {
    setDeleteIndex(index);
  };

  // ✅ CONFIRM DELETE
  const confirmDelete = (index) => {
    const updated = [...patients];
    updated.splice(index, 1);
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
    setDeleteIndex(null);
  };

  // ❌ CANCEL DELETE
  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  // 🧾 DOWNLOAD
  const downloadInvoice = (patient) => {
    if (patient.invoice || patient.invoiceNo) {
      window.location.href = "/invoice";
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Patients List</h2>
        <input
          className="search-box"
          placeholder="Search Name / Mobile / Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Email ID</th>
            <th>Contact No</th>
            <th>Medicines</th>
            <th>Amount</th>
            <th>Invoice No</th>
            <th>Date & Time</th>
            <th>Invoice</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p, i) => (
              <tr key={i}>
                {/* PATIENT */}
                <td>
                  {editIndex === i ? (
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    p.name
                  )}
                </td>

                {/* DOCTOR */}
                <td>
                  {editIndex === i ? (
                    <input
                      value={editData.doctor}
                      onChange={(e) =>
                        setEditData({ ...editData, doctor: e.target.value })
                      }
                    />
                  ) : (
                    p.doctor
                  )}
                </td>

                {/* EMAIL */}
                <td>
                  {editIndex === i ? (
                    <input
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  ) : (
                    p.email
                  )}
                </td>

                {/* PHONE */}
                <td>
                  {editIndex === i ? (
                    <input
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                  ) : (
                    p.phone
                  )}
                </td>

                <td>{p.medicines}</td>
                <td>₹{p.amount}</td>
                <td>{p.invoiceNo || "-"}</td>
                <td>{p.date}</td>

                {/* ACTIONS */}
                <td>
                  {deleteIndex === i ? (
                    <>
                      <span style={{ color: "red", marginRight: "6px" }}>
                        Delete confirmly?
                      </span>
                      <button onClick={() => confirmDelete(i)}>Yes</button>
                      <button onClick={cancelDelete}>No</button>
                    </>
                  ) : editIndex === i ? (
                    <>
                      <button onClick={saveEdit}>✔</button>
                      <button onClick={cancelEdit}>✖</button>
                    </>
                  ) : (
                    <>
                      {p.invoiceNo ? (
                        <button
                          className="download-btn"
                          onClick={() => downloadInvoice(p)}
                        >
                          Download
                        </button>
                      ) : (
                        "-"
                      )}

                      {/* ✏️ EDIT */}
                      <button
                        style={{ marginLeft: "6px" }}
                        onClick={() => startEdit(i)}
                      >
                        ✏️
                      </button>

                      {/* 🗑️ DELETE */}
                      <button
                        style={{ marginLeft: "6px", color: "red" }}
                        onClick={() => askDelete(i)}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                No Patients Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsList;
