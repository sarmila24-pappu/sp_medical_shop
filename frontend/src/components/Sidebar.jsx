import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>SP Medical Shop</h2>

      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/sales">Sales</Link>
        </li>

        <li>
          <Link to="/invoice">Invoice</Link>
        </li>

        <li>
          <Link to="/patients">Patients List</Link>
        </li>

        <li>
          <Link to="/doctors">Doctor List</Link>
        </li>

        {/* ✅ Medicines */}
        <li>
          <Link to="/medicines">Medicines</Link>
        </li>

        {/* ✅ Cart */}
        <li>
          <Link to="/cart">Cart</Link>
        </li>

        <li>
          <Link to="/login">Logout / Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
