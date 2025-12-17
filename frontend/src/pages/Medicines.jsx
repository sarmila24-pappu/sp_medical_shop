import { useState } from "react";
import "./Medicines.css";

function Medicines() {
  const medicines = [
    { id: 1, name: "Paracetamol", price: 20, img: "https://5.imimg.com/data5/SELLER/Default/2021/12/LK/ON/KX/43755673/paracetamol-500mg-tablet.jpg" },
    { id: 2, name: "Dolo 650", price: 30, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIOVWPsjaP3vOcMyjT2ZHT7mKULY2bjoZo6g&s" },
    { id: 3, name: "Crocin", price: 25, img: "https://ik.imagekit.io/wlfr/wellness/images/products/321214-1.JPG" },
    { id: 4, name: "Azithromycin", price: 120, img: "https://www.biofieldpharma.com/wp-content/uploads/2023/06/BIOFIELD-OZISET-500-TAB-1-scaled.jpg" },
    { id: 5, name: "Cetrizine", price: 15, img: "https://tiimg.tistatic.com/fp/1/007/645/cetirizine-tablets-317.jpg" },
    { id: 6, name: "Vitamin C", price: 60, img: "https://m.media-amazon.com/images/I/61Q-+KR3WcL.jpg" },
    { id: 7, name: "Calcium Tablet", price: 90, img: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/68259e9260274baa816d6a83703b7970.jpg" },
    { id: 8, name: "ORS", price: 25, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfUkn8S0ZhtWpYSbCrsGnJ00ghSt3kmnmjMA&s" },
    { id: 9, name: "Digene", price: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmI7Ot9o44-V7whmUJB_48V8rAdyWM60cLrg&s" },
    { id: 10, name: "Gelusil", price: 55, img: "https://images.apollo247.in/pub/media/catalog/product/G/E/GEL0002_3_1.jpg" },
    { id: 11, name: "Cough Syrup", price: 80, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRypshE9iuEQBKdjzyUjCdBk0rfgXK63NFtzA&s" },
    { id: 12, name: "Vicks", price: 45, img: "https://media.istockphoto.com/id/458642093/photo/vicks-vaporub-package-box-and-bottle.jpg?s=612x612&w=0&k=20&c=D9rxJZNArcnkWCYpjJ8dniDexXSMRChxtpVTpJX4C8Q=" },
    { id: 13, name: "Betadine", price: 70, img: "https://m.media-amazon.com/images/I/511ia5PPpBS.jpg" },
    { id: 14, name: "Ibuprofen", price: 35, img: "https://5.imimg.com/data5/SELLER/Default/2023/7/325863554/WI/JM/SY/135658020/ibuprofen-tablets-ip-200-mg-.jpg" },
    { id: 15, name: "Zinc Tablet", price: 40, img: "https://media.istockphoto.com/id/497124680/photo/pills-with-zinc-zn-element-dietary-supplements-vitamin-capsules.jpg?s=612x612&w=0&k=20&c=V9jK2Gvrf_mblyT80LrjbZ2UPlWDbqpJn2h53mUZmgE=" },
    { id: 16, name: "Pain Relief Gel", price: 110, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeZ79opzFbPJf_wJ8h-uyNE_QcAlOoEsVLOw&s" },
    { id: 17, name: "Eye Drops", price: 65, img: "https://himalayawellness.in/cdn/shop/products/OPHTHACARE-DROPS-10ML.jpg?v=1659002377" },
    { id: 18, name: "Antiseptic Liquid", price: 95, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwXD87nSSq6mypft6VGpYqWYh9OFs2W2BqXQ&s" },
    { id: 19, name: "Hand Sanitizer", price: 75, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRppJkJs1HG2_nwpB74HD5xQanPM0EnIh8rlg&s" },
    { id: 20, name: "Multivitamin", price: 150, img: "https://pacome.in/wp-content/uploads/2024/07/Immunity-and-Health-Booster-1.jpg" }
  ];

  const [qty, setQty] = useState({});

  const inc = (id) => setQty({ ...qty, [id]: (qty[id] || 0) + 1 });
  const dec = (id) => qty[id] > 0 && setQty({ ...qty, [id]: qty[id] - 1 });

  const addToCart = (med) => {
    const q = qty[med.id] || 0;
    if (q === 0) return alert("Select quantity");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find((c) => c.id === med.id);

    if (found) found.qty += q;
    else cart.push({ ...med, qty: q });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
    setQty({ ...qty, [med.id]: 0 });
  };

  return (
    <div className="medicines-page">
      <h2>Medicines</h2>

      <div className="medicine-grid">
        {medicines.map((m) => (
          <div key={m.id} className="medicine-card">
            <img src={m.img} alt={m.name} />
            <h4>{m.name}</h4>
            <p>₹{m.price}</p>

            <div className="qty-box">
              <button onClick={() => dec(m.id)}>-</button>
              <span>{qty[m.id] || 0}</span>
              <button onClick={() => inc(m.id)}>+</button>
            </div>

            <button className="add-btn" onClick={() => addToCart(m)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Medicines;
