import { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

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

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const checkout = async () => {
    if (!window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    if (!patient || !doctor || !email || !contact) {
      alert("Fill all details");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      }
    );

    const order = await res.json();

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "SP Medical Shop",
      description: "Medicine Payment",
      order_id: order.id,

      handler: async function (response) {
        const date = new Date().toLocaleString();
        // ===== SAVE TO PATIENT LIST =====
const patients = JSON.parse(localStorage.getItem("patients")) || [];

patients.push({
  name: patient,
  email,
  phone: contact,
  doctor,
  medicines: cart.map(i => i.name).join(", "),
  amount: total,
  date: new Date().toLocaleString(),
});

localStorage.setItem("patients", JSON.stringify(patients));


// ===== SAVE TO DOCTOR LIST =====
const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

doctors.push({
  doctorName: doctor,
  patient,
  amount: total,
  date: new Date().toLocaleString(),
});

localStorage.setItem("doctors", JSON.stringify(doctors));

        // 🔹 Invoice data
        const invoiceData = {
          patient,
          doctor,
          email,
          contact,
          items: cart.map((i) => ({
            name: i.name,
            price: i.price,
            qty: i.qty,
            total: i.price * i.qty,
          })),
          grandTotal: total,
          paymentId: response.razorpay_payment_id,
          date,
        };

        // 🔹 SAVE PATIENT LIST
        const oldPatients =
          JSON.parse(localStorage.getItem("patientsList")) || [];

        oldPatients.push({
          patient,
          email,
          contact,
          amount: total,
          date,
        });

        localStorage.setItem(
          "patientsList",
          JSON.stringify(oldPatients)
        );

        // 🔹 SAVE DOCTOR LIST
        const oldDoctors =
          JSON.parse(localStorage.getItem("doctorsList")) || [];

        oldDoctors.push({
          doctor,
          patient,
          amount: total,
          date,
        });

        localStorage.setItem(
          "doctorsList",
          JSON.stringify(oldDoctors)
        );

        // 🔹 Save invoice
        localStorage.setItem(
          "lastInvoice",
          JSON.stringify(invoiceData)
        );

        // 🔹 Clear cart
        localStorage.removeItem("cart");
        setCart([]);

        // 🔹 Go to invoice page
        window.location.href = "/invoice";
      },

      prefill: {
        name: patient,
        email,
        contact,
      },

      theme: { color: "#0f5c55" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {/* Patient Details */}
      <div className="form-grid">
        <input
  placeholder="Patient Name"
  value={patient}
  onChange={(e) => setPatient(e.target.value)}
  onBlur={() => {
    if (!patient) return;

    const oldPatients =
      JSON.parse(localStorage.getItem("patientsList")) || [];

    const alreadyExists = oldPatients.some(
      (p) => p.patient === patient
    );

    if (!alreadyExists) {
      oldPatients.push({
        patient,
        email,
        contact,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "patientsList",
        JSON.stringify(oldPatients)
      );
    }
  }}
/>

        <input
  placeholder="Doctor Name"
  value={doctor}
  onChange={(e) => setDoctor(e.target.value)}
  onBlur={() => {
    if (!doctor) return;

    const oldDoctors =
      JSON.parse(localStorage.getItem("doctorsList")) || [];

    const alreadyExists = oldDoctors.some(
      (d) => d.doctor === doctor
    );

    if (!alreadyExists) {
      oldDoctors.push({
        doctor,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "doctorsList",
        JSON.stringify(oldDoctors)
      );
    }
  }}
/>

        <input
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Contact Number"
          value={contact}
          maxLength="10"
          onChange={(e) =>
            setContact(e.target.value.replace(/\D/g, ""))
          }
        />
      </div>

      {/* Cart Items */}
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="img-box">No image</div>

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
      ))}

      {/* Footer */}
      <div className="cart-footer">
        <h3>Total: ₹{total}</h3>
        <div>
          <button className="clear" onClick={clearCart}>
            Clear
          </button>
          <button className="checkout" onClick={checkout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
