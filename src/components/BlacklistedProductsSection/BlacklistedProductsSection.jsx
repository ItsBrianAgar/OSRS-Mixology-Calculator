import React, { useState, useCallback } from "react";
import SearchOverlay from "../SearchOverlay/SearchOverlay";
import { herbloreProducts } from "../../data/herblore-product-list";
import useBlacklistedProducts from "../../hooks/useBlacklistedProducts";
import "./BlacklistedProductsSection.css";
import { capitalizeWords } from "../../utils/capitaliseWord";

function BlacklistedProductsSection() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const { blacklistedProducts, addProduct, removeProduct, message } =
    useBlacklistedProducts();

  const handleProductSelect = useCallback(
    (product) => {
      addProduct(product);
      setShowSearchOverlay(false);
    },
    [addProduct]
  );

  return (
    <section className="blacklisted-products-section">
      <h2>Blacklisted Products</h2>
      <p>List the herblore products you'd rather avoid making</p>
      <button
        className="button--secondary"
        onClick={() => setShowSearchOverlay(true)}
      >
        Add Product
      </button>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <BlacklistedProductsList
        products={blacklistedProducts}
        onRemove={removeProduct}
      />
      <SearchOverlay
        isVisible={showSearchOverlay}
        onClose={() => setShowSearchOverlay(false)}
        onSelect={handleProductSelect}
        items={herbloreProducts}
        itemKey="name"
      />
    </section>
  );
}

function BlacklistedProductsList({ products, onRemove }) {
  if (!products || products.length === 0)
    return <p>No products blacklisted yet.</p>;

  return (
    <ul className="blacklisted-products-list">
      {products.map((product) => (
        <BlacklistedProductItem
          key={product.key}
          product={product}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

function BlacklistedProductItem({ product, onRemove }) {
  return (
    <li className="blacklisted-product-item">
      <span>
        {product.name} ({capitalizeWords(product.ingredientType)}:{" "}
        {product.primaryIngredient}, XP: {product.xp})
      </span>
      <button onClick={() => onRemove(product.key)}>Remove</button>
    </li>
  );
}

export default BlacklistedProductsSection;
