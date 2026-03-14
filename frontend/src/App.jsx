import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  // State for the "Create Sale" form
  const [newSale, setNewSale] = useState({
    product: '',
    quantity: '',
    total_price: ''
  });

  // 1. Fetch data from Django API
  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Handle Form Submission (Create Functionality)
  const handleSaleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if(!newSale.product || !newSale.quantity) {
        alert("Please fill in Product ID and Quantity");
        return;
    }

    axios.post('http://127.0.0.1:8000/api/sales/', newSale)
      .then(res => {
        alert("Sale Recorded Successfully!");
        setNewSale({ product: '', quantity: '', total_price: '' }); // Clear form
        fetchProducts(); // Refresh the list to see updated data
      })
      .catch(err => {
        console.error(err);
        alert("Error recording sale. Check if Product ID exists.");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Inventory Dashboard</h1>

      {/* --- CREATE SECTION: ADD NEW SALE FORM --- */}
      <div className="card shadow mb-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Record New Sale</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSaleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Product ID</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ex: 1"
                value={newSale.product}
                onChange={e => setNewSale({...newSale, product: e.target.value})}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Quantity</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ex: 5"
                value={newSale.quantity}
                onChange={e => setNewSale({...newSale, quantity: e.target.value})}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Total Price (₱)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ex: 500"
                value={newSale.total_price}
                onChange={e => setNewSale({...newSale, total_price: e.target.value})}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100">Submit Sale</button>
            </div>
          </form>
        </div>
      </div>

      {/* --- READ SECTION: PRODUCT TABLE --- */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
            <h5 className="mb-0">Current Inventory</h5>
        </div>
        <div className="card-body">
          <table className="table table-hover">
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
              {products.map(product => (
                <tr key={product.id}>
                  <td><strong>{product.id}</strong></td>
                  <td>{product.name}</td>
                  <td>{product.category_name}</td>
                  <td>₱{product.price}</td>
                  <td>
                    <span className={`badge ${product.stock > 10 ? 'bg-success' : 'bg-danger'}`}>
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="text-center">No products found.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;