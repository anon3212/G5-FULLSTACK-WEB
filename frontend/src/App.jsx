import "./App.css";
import logo from "./assets/logo.jpg";
import { useMemo, useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Temporary placeholder for products.
  // Later, when your backend is connected, replace this with fetched data.
  const [products] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const search = searchTerm.toLowerCase();

      return (
        String(product.id || "").toLowerCase().includes(search) ||
        String(product.productName || "").toLowerCase().includes(search) ||
        String(product.category || "").toLowerCase().includes(search) ||
        String(product.price || "").toLowerCase().includes(search) ||
        String(product.stock || "").toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm]);

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Logo" className="logo" />

        <div className="header-copy">
          <span className="dashboard-kicker">Group 5</span>
          <h1 className="dashboard-title">Inventory Dashboard</h1>
          <p className="dashboard-subtitle"></p>
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

            <form className="form-row">
              <div className="form-group">
                <label>Product ID</label>
                <input type="text" placeholder="Enter product ID" />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input type="number" placeholder="Enter quantity" />
              </div>

              <div className="form-group full-width">
                <label>Total Price (₱)</label>
                <input type="number" placeholder="Enter total price" />
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
                placeholder="Search by ID, product name, category, price, or stock..."
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
                    filteredProducts.map((product, index) => (
                      <tr key={product.id || index}>
                        <td>{product.id}</td>
                        <td>{product.productName}</td>
                        <td>{product.category}</td>
                        <td>₱{product.price}</td>
                        <td>{product.stock}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-text">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <p className="page-footer-note">GROUP 5</p>
    </div>
  );
}

export default App;