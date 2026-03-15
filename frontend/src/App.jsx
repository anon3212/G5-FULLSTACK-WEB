import "./App.css";

function App() {
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
              <input type="text" placeholder="Ex: 1" />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input type="text" placeholder="Ex: 5" />
            </div>

            <div className="form-group">
              <label>Total Price (₱)</label>
              <input type="number" placeholder="Ex: 500" />
            </div>

            <button className="submit-btn">Submit Sale</button>
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
              <tr>
                <td colSpan="5" className="empty-text">
                  No products found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;