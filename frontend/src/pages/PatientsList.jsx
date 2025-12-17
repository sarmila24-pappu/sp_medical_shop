import { useEffect, useState } from "react";

function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  return (
    <div className="page">
      <h2>Patients List</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Doctor</th>
            <th>Medicines</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.doctor}</td>
              <td>{p.medicines}</td>
              <td>₹{p.amount}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsList;
