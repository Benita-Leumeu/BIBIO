// Suppression des doublons
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header_temp";
import Footer from "../../components/Footer";
import Books from "../../components/Books";
// import "../../styles/bibliotheque.css"; // Importer les styles CSS pour la page

const Accueil = () => {
  return (
    <div>
      <Header />
      <main>
        {/* Section des livres */}
        <Books /> {/* Intégration du composant Books */}
      </main>
      <Footer />
    </div>
  );
};

export default Accueil;
