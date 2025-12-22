import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-content">

        {/* LEFT TEXT */}
        <div className="home-text">
          <h1>
            <span className="yellow">Get Medicines Fast</span>{" "}
            <span className="white">with Superfast Delivery</span>
          </h1>

          <p className="subtitle">CITY ONLY ON SP MEDICAL SHOP</p>

          <div className="search-box">
            <input placeholder="Search for Medicines..." />
            <button>Search</button>
          </div>
        </div>

        {/* RIGHT IMAGE (ONLINE IMAGE URL) */}
        <div className="home-image">
          <img
            src="https://png.pngtree.com/png-vector/20251001/ourmid/pngtree-superhero-nurse-doctor-in-scrubs-flying-super-hero-a-or-surgical-png-image_17643809.webp"
            alt="Doctor Delivery"
          />
        </div>

      </div>
    </div>
  );
}

export default Home;
