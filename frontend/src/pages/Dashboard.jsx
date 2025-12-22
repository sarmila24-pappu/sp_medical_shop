import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../components/Sidebar.css";
import "../components/Topbar.css";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Inventory from localStorage or default
    const data =
      JSON.parse(localStorage.getItem("inventory")) || [
        { name: "Paracetamol", price: 20, stock: 50 },
        { name: "Cetrizine", price: 15, stock: 8 },
        { name: "Azithromycin", price: 120, stock: 25 },
        { name: "Vitamin C", price: 60, stock: 5 },
      ];

    setInventory(data);
  }, []);

  const lowStock = inventory.filter((i) => i.stock <= 10);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#7fd3b0",
      }}
    >
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1 }}>
        <Topbar />

        {/* ================= FRONT PAGE ================= */}
        <div
          style={{
            height: "calc(100vh - 70px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "36px", fontWeight: "700" }}>
            <span style={{ color: "#facc15" }}>
              Get Medicines Fast
            </span>{" "}
            with Superfast Delivery
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#e5e7eb",
              letterSpacing: "2px",
              fontSize: "14px",
            }}
          >
            CITY ONLY ON
          </p>

          {/* SEARCH BOX */}
          <div
            style={{
              background: "#ffffff",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
              width: "420px",
            }}
          >
            <input
              type="text"
              placeholder="Search for Medicines..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <button
              style={{
                background: "#0f5c55",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* ================= INVENTORY SECTION ================= */}
        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            margin: "30px",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            🏥 Inventory Overview
          </h2>

          {/* Inventory Stats */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                background: "#ecfdf5",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{inventory.length}</h3>
              <p>Total Medicines</p>
            </div>

            <div
              style={{
                flex: 1,
                background: "#fff7ed",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{lowStock.length}</h3>
              <p>Low Stock Items</p>
            </div>
          </div>

          {/* Inventory Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={th}>Medicine Name</th>
                <th style={th}>Price (₹)</th>
                <th style={th}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, i) => (
                <tr key={i}>
                  <td style={td}>{item.name}</td>
                  <td style={td}>₹{item.price}</td>
                  <td
                    style={{
                      ...td,
                      fontWeight: "bold",
                      color:
                        item.stock <= 10
                          ? "red"
                          : "green",
                    }}
                  >
                    {item.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ================= END INVENTORY ================= */}
      </div>
    </div>
  );
};

// Table styles
const th = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default Dashboard;
