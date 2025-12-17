import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../components/Sidebar.css";
import "../components/Topbar.css";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f5c55" }}>
      
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: "40px", color: "#fff" }}>
          <h1>
            <span style={{ color: "#f4d03f" }}>Get Medicines Fast</span>{" "}
            with Superfast Delivery in your city
          </h1>

          <p style={{ marginTop: "10px", opacity: 0.8 }}>
            ONLY ON PHARMEASY
          </p>

          {/* SEARCH BOX */}
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "30px",
              maxWidth: "600px",
            }}
          >
            <input
              type="text"
              placeholder="Search for Medicines..."
              style={{
                width: "75%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                marginLeft: "10px",
                background: "#0f766e",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
