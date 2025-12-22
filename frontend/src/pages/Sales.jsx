import React from "react";
import "./Sales.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Sales() {
  /* BAR CHART DATA */
  const barData = {
    labels: ["Today", "This Week", "This Month", "This Year"],
    datasets: [
      {
        label: "Sales Amount (₹)",
        data: [1200, 8200, 25500, 145000],
        backgroundColor: "#2196f3",
        borderRadius: 8,
      },
    ],
  };

  /* LINE CHART DATA */
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [12000, 18000, 15000, 22000, 26000, 24000],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76,175,80,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="sales-page">

      <h2>📊Sales Dashboard</h2>

      {/* SUMMARY CARDS */}
      <div className="sales-cards">
        <div className="sale-card blue">
          <span>Today</span>
          <h3>₹1,200</h3>
        </div>

        <div className="sale-card green">
          <span>This Week</span>
          <h3>₹8,200</h3>
        </div>

        <div className="sale-card purple">
          <span>This Month</span>
          <h3>₹25,500</h3>
        </div>

        <div className="sale-card orange">
          <span>This Year</span>
          <h3>₹1,45,000</h3>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        <div className="chart-box">
          <h3>Sales Analytics (Bar Chart)</h3>
          <div className="chart-container">
            <Bar data={barData} options={options} />
          </div>
        </div>

        <div className="chart-box">
          <h3>Monthly Trend (Line Chart)</h3>
          <div className="chart-container">
            <Line data={lineData} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sales;
