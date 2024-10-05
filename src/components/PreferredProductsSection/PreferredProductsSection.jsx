import React, { useState, useCallback } from "react";
import SearchOverlay from "../SearchOverlay/SearchOverlay";
import { herbloreProducts } from "../../data/herblore-product-list";
import usePreferredProducts from "../../hooks/usePreferredProducts";
import "./PreferredProductsSection.css";

function PreferredProductsSection() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const { preferredProducts, addProduct, removeProduct, message } =
    usePreferredProducts();

  const handleProductSelect = useCallback(
    (product) => {
      addProduct(product);
      setShowSearchOverlay(false);
    },
    [addProduct]
  );

  return (
    <div className="preferred-products-section">
      <h2>Preferred Products</h2>
      <p>List the herblore products you prefer making</p>
      <button onClick={() => setShowSearchOverlay(true)}>Add Product</button>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <PreferredProductsList
        products={preferredProducts}
        onRemove={removeProduct}
      />
      <SearchOverlay
        isVisible={showSearchOverlay}
        onClose={() => setShowSearchOverlay(false)}
        onSelect={handleProductSelect}
        items={herbloreProducts}
        itemKey="name"
      />
    </div>
  );
}

function PreferredProductsList({ products, onRemove }) {
  if (!products || products.length === 0) {
    return <p>No preferred products yet.</p>;
  }

  return (
    <ul className="preferred-products-list">
      {products.map((product) => (
        <PreferredProductItem
          key={product.key}
          product={product}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

function PreferredProductItem({ product, onRemove }) {
  return (
    <li className="preferred-product-item">
      <span>
        {product.name} (Herb: {product.herb}, XP: {product.xp})
      </span>
      <button onClick={() => onRemove(product.key)}>Remove</button>
    </li>
  );
}

export default PreferredProductsSection;
