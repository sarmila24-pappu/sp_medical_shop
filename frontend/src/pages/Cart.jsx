import { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  // ================= LOAD CART =================
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const fixedCart = savedCart.map((i) => ({
      ...i,
      qty: i.qty ? i.qty : 1,
    }));

    setCart(fixedCart);
    localStorage.setItem("cart", JSON.stringify(fixedCart));
  }, []);

  // ================= TOTAL =================
  const total = cart.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.qty),
    0
  );

  // ================= QTY =================
  const increase = (id) => {
    const updated = cart.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decrease = (id) => {
    const updated = cart
      .map((i) =>
        i.id === id ? { ...i, qty: i.qty - 1 } : i
      )
      .filter((i) => i.qty > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ================= CHECKOUT / RAZORPAY =================
  const checkout = () => {
    if (!patient || !doctor || !email || !contact) {
      alert("Please fill all details");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay not loaded. Check index.html");
      return;
    }

    const invoiceNo = "INV" + Date.now();
    const date = new Date().toLocaleString();

    const options = {
      key: "rzp_test_AIEfgCrKyUEdo8",
      amount: total * 100,
      currency: "INR",
      name: "SP Medical Shop",
      description: "Medicine Purchase",

      handler: function (response) {
        // ========== SAVE INVOICE ==========
        const invoice = {
          invoiceNo,
          patientName: patient,
          doctorName: doctor,
          email,
          contact,
          date,
          paymentId: response.razorpay_payment_id,
          items: cart.map((i) => ({
            name: i.name,
            company: i.company || "Cipla",
            rack: i.rack || "D4",
            pack: i.pack || "10 Tabs",
            batch: i.batch || "BT" + Math.floor(Math.random() * 9000),
            exp: i.exp || "12/26",
            qty: i.qty,
            price: i.price,
            amount: i.qty * i.price,
          })),
          total,
        };

        localStorage.setItem("lastInvoice", JSON.stringify(invoice));

        // ========== SAVE PATIENT LIST ==========
        // ========= SAVE PATIENT LIST =========
const patients =
  JSON.parse(localStorage.getItem("patients")) || [];

patients.push({
  name: patient,
  doctor: doctor,
  email: email,
  phone: contact,
  medicines: cart.map(i => i.name).join(", "),
  amount: total,
  invoiceNo: invoiceNo,   // 👈 THIS IS IMPORTANT
  date: date,
});

localStorage.setItem("patients", JSON.stringify(patients));

        // ========= SAVE DOCTOR LIST =========
const doctors =
  JSON.parse(localStorage.getItem("doctors")) || [];

doctors.push({
  doctorName: doctor,
  patient: patient,   // 👈 VERY IMPORTANT (key name)
  email: email,
  phone: contact,
  medicines: cart.map(i => i.name).join(", "),
  amount: total,
  invoiceNo: invoiceNo,
  date: date,
});

localStorage.setItem("doctors", JSON.stringify(doctors));


        localStorage.removeItem("cart");
        window.location.href = "/invoice";
      },

      prefill: {
        name: patient,
        email: email,
        contact: contact,
      },

      theme: {
        color: "#0f5c55",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {/* ===== PATIENT FORM ===== */}
      <div className="form-grid">
        <input
          placeholder="Patient Name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        />
        <input
          placeholder="Doctor Name"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        />
        <input
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Contact Number"
          maxLength="10"
          value={contact}
          onChange={(e) =>
            setContact(e.target.value.replace(/\D/g, ""))
          }
        />
      </div>

      {/* ===== CART ITEMS ===== */}
      {cart.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No medicines added</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="img-box">
              <img
                src={
                  item.img ||
                  item.image ||
                  item.photo ||
                  "https://via.placeholder.com/60"
                }
                alt={item.name}
              />
            </div>

            <div className="item-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>

            <div className="qty">
              <button onClick={() => decrease(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increase(item.id)}>+</button>
            </div>

            <button
              className="remove"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* ===== FOOTER ===== */}
      <div className="cart-footer">
        <h3>Total: ₹{total}</h3>
        <button className="checkout" onClick={checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
