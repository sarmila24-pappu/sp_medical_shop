import { useEffect, useState } from "react";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(data);
  }, []);

  return (
    <div className="page">
      <h2>Doctor List</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Patient</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((d, i) => (
            <tr key={i}>
              <td>{d.doctorName}</td>
              <td>{d.patient}</td>
              <td>₹{d.amount}</td>
              <td>{d.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorList;
