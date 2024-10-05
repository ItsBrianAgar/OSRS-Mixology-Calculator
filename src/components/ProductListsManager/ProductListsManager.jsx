import React, { useState, useEffect } from "react";
import BlacklistedProductsSection from "../BlacklistedProductsSection/BlacklistedProductsSection";
import PreferredProductsSection from "../PreferredProductsSection/PreferredProductsSection";
import useBlacklistedProducts from "../../hooks/useBlacklistedProducts";
import usePreferredProducts from "../../hooks/usePreferredProducts";

function ProductListsManager() {
  const [preferredProductsList, setPreferredProductsList] = useState([]);
  const [blacklistedProductsList, setBlacklistedProductsList] = useState([]);

  const {
    blacklistedProducts,
    addProduct: addBlacklistedProduct,
    removeProduct: removeBlacklistedProduct,
    message: blacklistMessage,
  } = useBlacklistedProducts(preferredProductsList);

  const {
    preferredProducts,
    addProduct: addPreferredProduct,
    removeProduct: removePreferredProduct,
    message: preferredMessage,
  } = usePreferredProducts(blacklistedProductsList);

  useEffect(() => {
    setPreferredProductsList(preferredProducts);
  }, [preferredProducts]);

  useEffect(() => {
    setBlacklistedProductsList(blacklistedProducts);
  }, [blacklistedProducts]);

  return (
    <div>
      <BlacklistedProductsSection
        blacklistedProducts={blacklistedProducts}
        addProduct={addBlacklistedProduct}
        removeProduct={removeBlacklistedProduct}
        message={blacklistMessage}
      />
      <PreferredProductsSection
        preferredProducts={preferredProducts}
        addProduct={addPreferredProduct}
        removeProduct={removePreferredProduct}
        message={preferredMessage}
      />
    </div>
  );
}

export default ProductListsManager;
