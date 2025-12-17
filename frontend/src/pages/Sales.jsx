import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DATA = {
  today: [
    { name: "Medicines", value: 400 },
    { name: "Consultation", value: 200 },
    { name: "Others", value: 100 },
  ],
  week: [
    { name: "Medicines", value: 2400 },
    { name: "Consultation", value: 1398 },
    { name: "Others", value: 800 },
  ],
  month: [
    { name: "Medicines", value: 5400 },
    { name: "Consultation", value: 3398 },
    { name: "Others", value: 1800 },
  ],
  year: [
    { name: "Medicines", value: 15400 },
    { name: "Consultation", value: 9398 },
    { name: "Others", value: 5800 },
  ],
};

export default function Sales() {
  const [filter, setFilter] = useState("today");

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>📊 Sales Dashboard</h2>

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        {["today", "week", "month", "year"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: 10,
              padding: "8px 16px",
              fontWeight: "bold",
              background: filter === f ? "#222" : "#ddd",
              color: filter === f ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div style={cardStyle}>
          <h3>🆕 New Customers</h3>
          <p style={numStyle}>25</p>
        </div>
        <div style={cardStyle}>
          <h3>👥 Clients</h3>
          <p style={numStyle}>120</p>
        </div>
      </div>

      {/* CHARTS */}
      <div style={{ display: "flex", gap: 40 }}>
        {/* PIE */}
        <PieChart width={350} height={300}>
          <Pie
            data={DATA[filter]}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {DATA[filter].map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        {/* BAR */}
        <BarChart width={400} height={300} data={DATA[filter]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#f4f4f4",
  padding: 20,
  width: 200,
  borderRadius: 8,
  textAlign: "center",
};

const numStyle = {
  fontSize: 28,
  fontWeight: "bold",
};
