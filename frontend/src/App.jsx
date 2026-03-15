import { useState, useEffect, useMemo } from "react";
import "./App.css";
import logo from "./assets/logo.jpg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [saleData, setSaleData] = useState({
    product_id: "",
    quantity: "",
    total_price: ""
  });

  const fetchInventory = () => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleInputChange = (e) => {
    setSaleData({ ...saleData, [e.target.name]: e.target.value });
  };

  const handleSaleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sales/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: parseInt(saleData.product_id),
          quantity: parseInt(saleData.quantity),
          total_price: parseFloat(saleData.total_price)
        }),
      });

      if (response.ok) {
        alert("Sale recorded successfully!");
        setSaleData({ product_id: "", quantity: "", total_price: "" }); 
        fetchInventory(); 
      } else {
        const err = await response.json();
        alert("Error: " + JSON.stringify(err));
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const search = searchTerm.toLowerCase();
      return (
        String(product.id || "").toLowerCase().includes(search) ||
        String(product.name || "").toLowerCase().includes(search) ||
        String(product.category || "").toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm]);

  return (
    <div className="app-container">
      <button className="about-btn" onClick={() => setShowAbout(true)}>
        About
      </button>

      <header className="app-header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-copy">
          <span className="dashboard-kicker">Group 5</span>
          <h1 className="dashboard-title">Inventory Dashboard</h1>
        </div>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <span>Record New Sale</span>
          </div>
          <div className="dashboard-card-body">
            <p className="card-description">
              Enter the sale details below to update stock records.
            </p>
            <form className="form-row" onSubmit={handleSaleSubmit}>
              <div className="form-group">
                <label>Product ID</label>
                <input 
                  type="text" 
                  name="product_id"
                  placeholder="Enter product ID" 
                  value={saleData.product_id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input 
                  type="number" 
                  name="quantity"
                  placeholder="Enter quantity" 
                  value={saleData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Total Price (₱)</label>
                <input 
                  type="number" 
                  name="total_price"
                  placeholder="Enter total price" 
                  value={saleData.total_price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group full-width">
                <button type="submit" className="submit-btn">
                  Submit Sale
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="dashboard-card dark">
          <div className="dashboard-card-header inventory-header">
            <span>Current Inventory</span>
          </div>
          <div className="dashboard-card-body">
            <div className="search-bar-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="inventory-wrapper">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>₱{product.price}</td>
                        <td>{product.stock}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-text">No products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {showAbout && (
        <div className="about-modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <h2>About This System</h2>
              <button className="close-btn" onClick={() => setShowAbout(false)}>×</button>
            </div>
            <div className="about-modal-body">
              <p><strong>Inventory Dashboard System</strong> by <strong>Group 5</strong>.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;