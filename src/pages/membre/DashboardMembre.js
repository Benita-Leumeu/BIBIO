import React from "react";
import { Link } from "react-router-dom";

function DashboardMembre() {
  return (
    <div>
      <h2>Dashboard Membre</h2>
      <ul>
        <li>
          <Link to="/register">s'inscrire à la bibliothèque</Link>
        </li>
        <li>
          <Link to="/membre/consulter-livres">Consulter mes livres</Link>
        </li>
        <li>
          <Link to="/membre/payer-amende">Payer une amende</Link>
        </li>
        <li>
          <Link to="/membre/emprunter-livre">Emprunter un livre</Link>
        </li>
      </ul>
    </div>
  );
}

export default DashboardMembre;
