import { Routes, Route } from "react-router-dom";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Inventory from "./pages/Inventory";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sales from "./pages/Sales";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import PatientsList from "./pages/PatientsList";
import DoctorList from "./pages/DoctorList";

function App() {
  return (
    <>
      {/* TOP BAR NEVER CHANGES */}
      <Topbar />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR NEVER CHANGES */}
        <Sidebar />

        {/* 🔥 ONLY THIS PART CHANGES */}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* ✅ FRONT PAGE / DASHBOARD */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />

            {/* OTHER PAGES */}
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/doctors" element={<DoctorList />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
