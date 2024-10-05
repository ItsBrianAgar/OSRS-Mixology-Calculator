import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [blacklistedProducts, setBlacklistedProducts] = useState([]);
  const [preferredProducts, setPreferredProducts] = useState([]);

  const value = {
    blacklistedProducts,
    setBlacklistedProducts,
    preferredProducts,
    setPreferredProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
