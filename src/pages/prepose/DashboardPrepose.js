import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPrepose() {
  return (
    <div>
      <h2>Dashboard Préposé</h2>
      <ul>
        <li><Link to="/prepose/inscrire-membre">Inscrire un membre</Link></li>
        <li><Link to="/prepose/enregistrer-emprunt">Enregistrer un emprunt</Link></li>
        <li><Link to="/prepose/enregistrer-retour">Enregistrer un retour</Link></li>
        <li><Link to="/prepose/enregistrer-reservation">Enregistrer une réservation</Link></li>
      </ul>
    </div>
  );
}

export default DashboardPrepose;
