import React from 'react';
import Header from '../../components/Header_temp';
import Footer from '../../components/Footer';
import EncaisserFrais from '../../components/EncaisserFrais';

function EncaisserFraisPage() {
  return (
    <div>
      <Header />
      <main>
        <h2>Encaisser les frais</h2>
        <EncaisserFrais />
      </main>
      <Footer />
    </div>
  );
}

export default EncaisserFraisPage;
