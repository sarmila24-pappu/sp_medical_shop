import { useEffect, useRef, useState } from "react";
import "./Inventory.css";

function Inventory() {
  const [medicines, setMedicines] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [expiry, setExpiry] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  // inline delete confirm
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // file input ref (to reset file input)
  const fileRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(data);
  }, []);

  // image upload + preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // SAVE / UPDATE medicine
  const saveMedicine = () => {
    if (!name || !price || !stock || !expiry) {
      alert("Please fill all required fields");
      return;
    }

    let updated;

    if (editId) {
      updated = medicines.map((m) =>
        m.id === editId
          ? {
              ...m,
              name,
              price: Number(price),
              stock: Number(stock),
              expiry,
              description,
              image,
            }
          : m
      );
    } else {
      updated = [
        ...medicines,
        {
          id: Date.now(),
          name,
          price: Number(price),
          stock: Number(stock),
          expiry,
          description,
          image,
        },
      ];
    }

    setMedicines(updated);
    localStorage.setItem("medicines", JSON.stringify(updated));
    clearForm();
  };

  // edit medicine
  const editMedicine = (m) => {
    setEditId(m.id);
    setName(m.name);
    setPrice(m.price);
    setStock(m.stock);
    setExpiry(m.expiry);
    setDescription(m.description);
    setImage(m.image);
  };

  // delete medicine (inline confirm)
  const confirmDelete = (id) => {
    const updated = medicines.filter((m) => m.id !== id);
    setMedicines(updated);
    localStorage.setItem("medicines", JSON.stringify(updated));
    setConfirmDeleteId(null);
  };

  // clear form
  const clearForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setStock("");
    setExpiry("");
    setDescription("");
    setImage("");

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className="inventory-page">
      <h2>💊 Inventory Management</h2>

      {/* FORM */}
      <div className="inventory-form">
        <input
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleImage}
        />

        {/* IMAGE PREVIEW */}
        {image && (
          <div className="image-preview">
            <img src={image} alt="preview" />
          </div>
        )}

        {/* SAVE BUTTON */}
        <button onClick={saveMedicine}>
          {editId ? "Update Medicine" : "Save Medicine"}
        </button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Medicine</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No medicines added
              </td>
            </tr>
          ) : (
            medicines.map((m) => {
              const expired = new Date(m.expiry) < new Date();

              return (
                <tr key={m.id}>
                  <td>
                    {m.image && <img src={m.image} alt="" width="45" />}
                  </td>
                  <td>{m.name}</td>
                  <td>₹{m.price}</td>
                  <td
                    style={{
                      color: m.stock <= 10 ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {m.stock}
                  </td>
                  <td style={{ color: expired ? "red" : "black" }}>
                    {m.expiry}
                  </td>
                  <td>{m.description}</td>
                  <td>
                    {confirmDeleteId === m.id ? (
                      <>
                        <span style={{ color: "red", marginRight: "6px" }}>
                          Confirm?
                        </span>
                        <button onClick={() => confirmDelete(m.id)}>
                          Yes
                        </button>
                        <button
                          style={{ marginLeft: "5px" }}
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          No
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => editMedicine(m)}>
                          Edit
                        </button>
                        <button
                          style={{ marginLeft: "6px" }}
                          onClick={() => setConfirmDeleteId(m.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
