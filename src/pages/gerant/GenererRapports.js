import React from 'react';

function GenererRapports() {
  const generateReport = (type) => {
    console.log(`Rapport généré : ${type}`);
    // Logique pour générer des rapports
  };

  return (
    <div>
      <h2>Générer des rapports</h2>
      <button onClick={() => generateReport('Livres retournés')}>Rapport des livres retournés</button>
      <button onClick={() => generateReport('Livres prêtés')}>Rapport des livres prêtés</button>
      <button onClick={() => generateReport('Livres réservés')}>Rapport des livres réservés</button>
    </div>
  );
}

export default GenererRapports;
