import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  
  // 1. State for the Sale Form
  const [saleData, setSaleData] = useState({
    product_id: "",
    quantity: "",
    total_price: ""
  });

  // Fetch Inventory (GET)
  const fetchInventory = () => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // 2. Function to handle input changes
  const handleChange = (e) => {
    setSaleData({ ...saleData, [e.target.name]: e.target.value });
  };

  // 3. Function to send the Sale to Django (POST)
  const handleSaleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sales/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We convert strings to numbers here so Django Serializers don't complain
        body: JSON.stringify({
          product: parseInt(saleData.product_id), 
          quantity: parseInt(saleData.quantity),
          total_price: parseFloat(saleData.total_price)
        }),
      });

      if (response.ok) {
        alert("Sale recorded successfully!");
        fetchInventory(); // Refresh list to see updated stock levels
      } else {
        const errorDetail = await response.json();
        console.error("Django Error:", errorDetail);
        alert("Error: " + JSON.stringify(errorDetail));
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="app-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1 className="dashboard-title">Inventory Dashboard</h1>

      <div className="dashboard-card">
        <div className="dashboard-card-header">Record New Sale</div>
        <div className="dashboard-card-body">
          <div className="form-row">
            <div className="form-group">
              <label>Product ID</label>
              <input 
                name="product_id" 
                type="text" 
                placeholder="Ex: 1" 
                value={saleData.product_id}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input 
                name="quantity" 
                type="text" 
                placeholder="Ex: 5" 
                value={saleData.quantity}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Total Price (₱)</label>
              <input 
                name="total_price" 
                type="number" 
                placeholder="Ex: 500" 
                value={saleData.total_price}
                onChange={handleChange} 
              />
            </div>

            <button className="submit-btn" onClick={handleSaleSubmit}>
              Submit Sale
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card dark">
        <div className="dashboard-card-header">Current Inventory</div>
        <div className="dashboard-card-body">
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
              {products.length > 0 ? (
                products.map((product) => (
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
    </div>
  );
}

export default App;