import { useEffect, useState } from "react";
import "./Medicines.css";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [qty, setQty] = useState({});

  // 🔹 Load medicines from Inventory
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(data);
  }, []);

  const inc = (id, stock) => {
    if ((qty[id] || 0) < stock) {
      setQty({ ...qty, [id]: (qty[id] || 0) + 1 });
    }
  };

  const dec = (id) => {
    if ((qty[id] || 0) > 0) {
      setQty({ ...qty, [id]: qty[id] - 1 });
    }
  };

  const addToCart = (med) => {
    const q = qty[med.id] || 0;
    if (q === 0) return alert("Select quantity");

    if (q > med.stock) {
      alert("Stock not available");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find((c) => c.id === med.id);

    if (found) {
      found.qty += q;
    } else {
      cart.push({
        id: med.id,
        name: med.name,
        price: med.price,
        img: med.image,
        qty: q,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQty({ ...qty, [med.id]: 0 });
  };

  return (
    <div className="medicines-page">
      <h2>Medicines</h2>

      {medicines.length === 0 ? (
        <p>No medicines added in inventory</p>
      ) : (
        <div className="medicine-grid">
          {medicines.map((m) => (
            <div key={m.id} className="medicine-card">
              {m.image && <img src={m.image} alt={m.name} />}

              <h4>{m.name}</h4>
              <p className="price">₹{m.price}</p>

              <p className="desc">{m.description}</p>
              <p className="expiry">Expiry: {m.expiry}</p>

              <p
                className={
                  m.stock <= 10 ? "stock low-stock" : "stock"
                }
              >
                Stock: {m.stock}
              </p>

              {/* Quantity */}
              <div className="qty-box">
                <button onClick={() => dec(m.id)}>-</button>
                <span>{qty[m.id] || 0}</span>
                <button onClick={() => inc(m.id, m.stock)}>+</button>
              </div>

              <button
                className="add-btn"
                disabled={m.stock === 0}
                onClick={() => addToCart(m)}
              >
                {m.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Medicines;
