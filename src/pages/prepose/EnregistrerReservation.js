import React, { useState } from 'react';
import Header from '../../components/Header_temp';
import Footer from '../../components/Footer';

function EnregistrerReservation() {
  const [reservation, setReservation] = useState({ bookId: '', memberId: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Réservation enregistrée:', reservation);
    // Appel API pour enregistrer une réservation
  };

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Enregistrer une réservation</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID du livre</label>
            <input 
              type="text" 
              name="bookId" 
              placeholder="ID du livre" 
              value={reservation.bookId} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>ID du membre</label>
            <input 
              type="text" 
              name="memberId" 
              placeholder="ID du membre" 
              value={reservation.memberId} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit">Enregistrer la réservation</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default EnregistrerReservation;
