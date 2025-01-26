import React, { useState } from 'react';

function InscrireMembre() {
  const [membre, setMembre] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nouveau membre inscrit:', membre);
    // Appel API pour inscrire un membre
  };

  return (
    <div>
      <h2>Inscrire un membre</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={membre.name} onChange={(e) => setMembre({ ...membre, name: e.target.value })} />
        <input type="email" placeholder="Email" value={membre.email} onChange={(e) => setMembre({ ...membre, email: e.target.value })} />
        <button type="submit">Inscrire</button>
      </form>
    </div>
  );
}

export default InscrireMembre;
