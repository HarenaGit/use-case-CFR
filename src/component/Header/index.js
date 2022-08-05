import React from "react";
import "./index.css";

const Header = () => {
  return (
    <header class="header">
      <div class="header-title">Cas de Transport de Personnel</div>
      <button class="header-button" style={{ marginRight: 20 }}>
        Exporter les donnees en scenario CFR
      </button>
    </header>
  );
};

export default Header;
