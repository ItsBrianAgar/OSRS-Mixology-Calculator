import React from "react";
import "./PageHeader.css";

const PageHeader = () => {
  return (
    <section className="page-header">
      <h1 className="page-title">Mixology Calculator</h1>
      <p className="page-description">
        This calculator works out how much paste you need for Mixology Rewards
        based on the herbs and paste you already have
      </p>
    </section>
  );
};

export default PageHeader;
