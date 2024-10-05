import React from "react";
import "./HerbloreConfiguration.css";
import BankedHerbsSection from "../BankedHerbsSection/BankedHerbsSection";
import BlacklistedProductsSection from "../BlacklistedProductsSection/BlacklistedProductsSection";
import PreferredProductsSection from "../PreferredProductsSection/PreferredProductsSection";
// import ProductListsManager from "../ProductListsManager/ProductListsManager";]
import { ProductProvider } from "../../context/ProductContext";

function HerbloreConfiguration({}) {
  return (
    <div>
      {/* Banked herbs */}
      <BankedHerbsSection />
      <ProductProvider>
        {/* Blacklisted Products */}
        <BlacklistedProductsSection />
        {/* Preferred Products */}
        <PreferredProductsSection />
      </ProductProvider>
    </div>
  );
}

export default HerbloreConfiguration;
