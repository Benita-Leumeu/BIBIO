import React, { useState } from 'react';

function EnregistrerEmprunt() {
  const [emprunt, setEmprunt] = useState({ bookId: '', memberId: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Emprunt enregistré:', emprunt);
    // Appel API pour enregistrer un emprunt
  };

  return (
    <div>
      <h2>Enregistrer un emprunt</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="ID du livre" value={emprunt.bookId} onChange={(e) => setEmprunt({ ...emprunt, bookId: e.target.value })} />
        <input type="text" placeholder="ID du membre" value={emprunt.memberId} onChange={(e) => setEmprunt({ ...emprunt, memberId: e.target.value })} />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default EnregistrerEmprunt;
