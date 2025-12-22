import { useEffect, useState } from "react";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null); // 👈 NEW

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(data);
  }, []);

  // 🔍 SEARCH
  const filteredDoctors = doctors.filter((d) => {
    const key = search.toLowerCase();
    return (
      d.doctorName?.toLowerCase().includes(key) ||
      d.patient?.toLowerCase().includes(key) ||
      String(d.amount).includes(key) ||
      d.date?.toLowerCase().includes(key)
    );
  });

  // ✏️ EDIT
  const startEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...filteredDoctors[index] });
  };

  const saveEdit = () => {
    const originalIndex = doctors.findIndex(
      (d) => d === filteredDoctors[editIndex]
    );
    const updated = [...doctors];
    updated[originalIndex] = editData;
    setDoctors(updated);
    localStorage.setItem("doctors", JSON.stringify(updated));
    setEditIndex(null);
  };

  const cancelEdit = () => setEditIndex(null);

  // 🗑️ DELETE (INLINE CONFIRM)
  const askDelete = (index) => {
    setDeleteIndex(index);
  };

  const confirmDelete = (index) => {
    const originalIndex = doctors.findIndex(
      (d) => d === filteredDoctors[index]
    );
    const updated = [...doctors];
    updated.splice(originalIndex, 1);
    setDoctors(updated);
    localStorage.setItem("doctors", JSON.stringify(updated));
    setDeleteIndex(null);
  };

  const cancelDelete = () => setDeleteIndex(null);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Doctor List</h2>
        <input
          className="search-box"
          placeholder="Search Doctor / Patient / Amount / Date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table width="100%">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Patient</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((d, i) => (
              <tr key={i}>
                <td>
                  {editIndex === i ? (
                    <input
                      value={editData.doctorName || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          doctorName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    d.doctorName
                  )}
                </td>

                <td>
                  {editIndex === i ? (
                    <input
                      value={editData.patient || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          patient: e.target.value,
                        })
                      }
                    />
                  ) : (
                    d.patient || "-"
                  )}
                </td>

                <td>
                  {editIndex === i ? (
                    <input
                      value={editData.amount || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          amount: e.target.value,
                        })
                      }
                    />
                  ) : (
                    `₹${d.amount}`
                  )}
                </td>

                {/* DATE + ACTIONS */}
                <td style={{ whiteSpace: "nowrap" }}>
                  {deleteIndex === i ? (
                    <>
                      <span style={{ marginRight: "6px", color: "red" }}>
                        Delete confirmly?
                      </span>
                      <button onClick={() => confirmDelete(i)}>Yes</button>
                      <button onClick={cancelDelete}>No</button>
                    </>
                  ) : editIndex === i ? (
                    <>
                      <input
                        value={editData.date || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            date: e.target.value,
                          })
                        }
                      />
                      <button onClick={saveEdit}>✔</button>
                      <button onClick={cancelEdit}>✖</button>
                    </>
                  ) : (
                    <>
                      {d.date}
                      <button
                        style={{ marginLeft: "8px" }}
                        onClick={() => startEdit(i)}
                      >
                        ✏️
                      </button>
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
              <td colSpan="4" align="center">
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorList;
