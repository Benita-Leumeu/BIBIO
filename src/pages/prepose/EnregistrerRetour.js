import React, { useState } from "react";
import Header from "../../components/Header_temp";
import Footer from "../../components/Footer";

function EnregistrerRetour() {
  const [retour, setRetour] = useState({ bookId: "", memberId: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Retour enregistré:", retour);
    // Appel API pour enregistrer un retour
  };

  const handleChange = (e) => {
    setRetour({ ...retour, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Enregistrer un retour</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID du livre</label>
            <input
              type="text"
              name="bookId"
              placeholder="ID du livre"
              value={retour.bookId}
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
              value={retour.memberId}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Enregistrer le retour</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default EnregistrerRetour;
