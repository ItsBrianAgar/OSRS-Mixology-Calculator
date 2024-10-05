import React from "react";
import "./HerbloreConfiguration.css";
import BankedHerbsSection from "../BankedHerbsSection/BankedHerbsSection";
import BlacklistedProductsSection from "../BlacklistedProductsSection/BlacklistedProductsSection";
import PreferredProductsSection from "../PreferredProductsSection/PreferredProductsSection";
import { ProductProvider } from "../../context/ProductContext";

function HerbloreConfiguration({ updateHerbTotals }) {
  return (
    <div>
      <BankedHerbsSection updateHerbTotals={updateHerbTotals} />
      <ProductProvider>
        <BlacklistedProductsSection />
        <PreferredProductsSection />
      </ProductProvider>
    </div>
  );
}

export default HerbloreConfiguration;
