import React, { useState } from "react";
import "./ProductListManager.css";

function ProductListManager({
  blacklistedProducts,
  preferredProducts,
  onBlacklistChange,
  onPreferredChange,
}) {
  const [newProduct, setNewProduct] = useState("");

  const addToList = (list, setList) => {
    if (newProduct && !list.includes(newProduct)) {
      const updatedList = [...list, newProduct];
      setList(updatedList);
      setNewProduct("");
    }
  };

  const removeFromList = (product, list, setList) => {
    const updatedList = list.filter((item) => item !== product);
    setList(updatedList);
  };

  return (
    <div className="product-list-manager">
      <div className="product-list">
        <h4>Blacklisted Products</h4>
        <ul>
          {blacklistedProducts.map((product) => (
            <li key={product}>
              {product}
              <button
                onClick={() =>
                  removeFromList(
                    product,
                    blacklistedProducts,
                    onBlacklistChange
                  )
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => addToList(blacklistedProducts, onBlacklistChange)}
        >
          Add to Blacklist
        </button>
      </div>
      <div className="product-list">
        <h4>Preferred Products</h4>
        <ul>
          {preferredProducts.map((product) => (
            <li key={product}>
              {product}
              <button
                onClick={() =>
                  removeFromList(product, preferredProducts, onPreferredChange)
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => addToList(preferredProducts, onPreferredChange)}>
          Add to Preferred
        </button>
      </div>
      <input
        type="text"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
        placeholder="Enter product name"
      />
    </div>
  );
}

export default ProductListManager;
