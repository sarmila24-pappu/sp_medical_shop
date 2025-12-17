import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>
        <span className="yellow">Get Medicines Fast</span> with
        <span className="white"> Superfast Delivery</span> in your city
      </h1>

      <p>ONLY ON PHARMEASY</p>

      <div className="search-box">
        <input placeholder="Search for Medicines..." />
        <button>Search</button>
      </div>
    </div>
  );
}

export default Home;
