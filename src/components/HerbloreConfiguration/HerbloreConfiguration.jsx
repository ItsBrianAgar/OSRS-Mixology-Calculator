import React from "react";
import "./HerbloreConfiguration.css";
import BankedHerbsSection from "../BankedHerbsSection/BankedHerbsSection";
import BlacklistedProductsSection from "../BlacklistedProductsSection/BlacklistedProductsSection";
import PreferredProductsSection from "../PreferredProductsSection/PreferredProductsSection";

function HerbloreConfiguration({ updateHerbTotals }) {
  return (
    <div>
      <BankedHerbsSection updateHerbTotals={updateHerbTotals} />
      <BlacklistedProductsSection />
      <PreferredProductsSection />
    </div>
  );
}

export default HerbloreConfiguration;
