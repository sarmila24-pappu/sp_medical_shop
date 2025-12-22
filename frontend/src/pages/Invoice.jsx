import { useEffect, useState } from "react";
import "./Invoice.css";

function Invoice() {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("lastInvoice"));
    if (data) setInvoice(data);
  }, []);

  if (!invoice) return <h3>No Invoice Found</h3>;

  return (
    <div className="invoice-page">
      <h2>SP MEDICAL SHOP</h2>
      <h4>GST INVOICE</h4>

      <p><b>Patient:</b> {invoice.patientName}</p>
      <p><b>Doctor:</b> {invoice.doctorName}</p>
      <p><b>Email:</b> {invoice.email}</p>
      <p><b>Contact:</b> {invoice.contact}</p>
      <p><b>Date:</b> {invoice.date}</p>

      <table width="100%">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Medicine Name</th>
            <th>Company</th>
            <th>Rack</th>
            <th>Pack</th>
            <th>Batch</th>
            <th>Exp</th>
            <th>Qty</th>
            <th>MRP</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((i, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{invoice.date.split(",")[0]}</td>
              <td>{i.name}</td>
              <td>{i.company}</td>
              <td>{i.rack}</td>
              <td>{i.pack}</td>
              <td>{i.batch}</td>
              <td>{i.exp}</td>
              <td>{i.qty}</td>
              <td>₹{i.price}</td>
              <td>₹{i.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Grand Total: ₹{invoice.total}</h3>

      <button onClick={() => window.print()}>
        Print / Download
      </button>
    </div>
  );
}

export default Invoice;
