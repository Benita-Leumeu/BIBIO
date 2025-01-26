import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header_temp';

function DashboardGerant() {
  return (
    <div>
      <h2>Dashboard Gérant</h2>
      <ul>
        <li><Link to="/gerant/generer-rapports">Générer des rapports</Link></li>
      </ul>
    </div>
  );
}

export default DashboardGerant;
