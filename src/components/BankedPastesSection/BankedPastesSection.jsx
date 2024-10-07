import React, { useState, useEffect } from "react";
import BankedPasteList from "../BankedPasteList/BankedPasteList";
import "./BankedPastesSection.css";

function BankedPastesSection({ updatePasteTotals, colorsLoaded }) {
  const [selectedPastes, setSelectedPastes] = useState({});

  const pastes = [
    { key: "mox", name: "Mox" },
    { key: "aga", name: "Aga" },
    { key: "lye", name: "Lye" },
  ];

  const handlePasteSelect = (pasteKey, quantity) => {
    setSelectedPastes((prevPastes) => {
      if (quantity > 0) {
        return { ...prevPastes, [pasteKey]: quantity };
      } else {
        const { [pasteKey]: _, ...rest } = prevPastes;
        return rest;
      }
    });
  };

  useEffect(() => {
    const totals = {
      totalMox: selectedPastes.mox || 0,
      totalAga: selectedPastes.aga || 0,
      totalLye: selectedPastes.lye || 0,
    };
    updatePasteTotals(totals);
  }, [selectedPastes, updatePasteTotals]);

  return (
    <div className="banked-pastes-section">
      <h2>What pastes do you have?</h2>
      <p>Log the pastes you have banked</p>
      <BankedPasteList
        onPasteSelect={handlePasteSelect}
        pastesData={pastes}
        colorsLoaded={colorsLoaded}
      />
    </div>
  );
}

export default BankedPastesSection;
