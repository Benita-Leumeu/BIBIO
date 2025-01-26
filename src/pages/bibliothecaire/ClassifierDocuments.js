import React, { useState } from 'react';
import Header from '../../components/Header_temp'; // Assure-toi d'avoir un composant Header importé
import Footer from '../../components/Footer'; // Assure-toi d'avoir un composant Footer importé
import './ClassifierDocuments.scss'; // Import du fichier SCSS

function ClassifierDocuments() {
  const [document, setDocument] = useState({ title: '', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Document classé:', document);
    // Appel API pour classifier un document
  };

  return (
    <div className="classifier-documents-page">
      <Header />
      <main>
        <div className="classifier-documents">
          <h2>Classifier un document</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titre du document"
              value={document.title}
              onChange={(e) => setDocument({ ...document, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={document.category}
              onChange={(e) => setDocument({ ...document, category: e.target.value })}
              required
            />
            <button type="submit">Classifier</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ClassifierDocuments;
