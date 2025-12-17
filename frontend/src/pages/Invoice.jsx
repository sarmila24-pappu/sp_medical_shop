import "./Invoice.css";

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function Invoice() {
  const data = JSON.parse(localStorage.getItem("lastInvoice"));

  if (!data) {
    return <h2>No Invoice Found</h2>;
  }

  const companies = ["Cipla", "Sun Pharma", "Dr Reddy", "Mankind", "Alkem"];
  const racks = ["A1", "B2", "C3", "D4"];
  const packs = ["10 Tab", "15 Tab", "20 Tab"];

  return (
    <div className="invoice-wrapper">
      <h2 className="center">SP MEDICAL SHOP</h2>
      <h3 className="center">GST INVOICE</h3>

      <div className="info-row">
        <div>
          <p><b>Patient:</b> {data.patient}</p>
          <p><b>Doctor:</b> {data.doctor}</p>
        </div>
        <div>
          <p><b>Date:</b> {data.date}</p>
          <p><b>Contact:</b> {data.contact}</p>
        </div>
      </div>

      <table className="invoice-table">
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
          {data.items.map((i, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.date.split(",")[0]}</td>
              <td>{i.name}</td>
              <td>{randomFrom(companies)}</td>
              <td>{randomFrom(racks)}</td>
              <td>{randomFrom(packs)}</td>
              <td>BT{Math.floor(1000 + Math.random() * 9000)}</td>
              <td>12/26</td>
              <td>{i.qty}</td>
              <td>₹{i.price}</td>
              <td>₹{i.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="total">Grand Total: ₹{data.grandTotal}</h3>

      <div className="center">
        <button onClick={() => window.print()}>
          Print / Download
        </button>
      </div>
    </div>
  );
}

export default Invoice;
