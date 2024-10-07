import React from "react";
import PasteCard from "../PasteCard/PasteCard";
import "./BankedPasteList.css";

function BankedPasteList({ onPasteSelect, pastesData, colorsLoaded }) {
  return (
    <div className="banked-paste-list">
      {pastesData.map((paste) => (
        <PasteCard
          key={paste.key}
          paste={paste}
          onSelect={onPasteSelect}
          colorsLoaded={colorsLoaded}
        />
      ))}
    </div>
  );
}

export default BankedPasteList;
