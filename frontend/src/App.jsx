import "./App.css";
import logo from "./assets/react.svg"; // replace with your real logo if you have one

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Logo" className="logo" />

        <div className="header-copy">
          <span className="dashboard-kicker">Group 5</span>
          <h1 className="dashboard-title">Inventory Dashboard</h1>
          <p className="dashboard-subtitle">
           
          </p>
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
          <div className="dashboard-card-header">
            <span>Current Inventory</span>
          </div>

          <div className="dashboard-card-body">
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
                  <tr>
                    <td colSpan="5" className="empty-text">
                      No products found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <p className="page-footer-note">
        GROUP 5
      </p>
    </div>
  );
}

export default App;