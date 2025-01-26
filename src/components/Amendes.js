import React, { useEffect, useState } from "react";
import axios from "axios";

function Amendes() {
  const [amendes, setAmendes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userToken = localStorage.getItem("userToken");

    if (storedUser && userToken) {
      setUser({ ...storedUser, token: userToken });

      // Récupérer les amendes du membre
      axios
        .get(`http://localhost:5000/api/amendes/${storedUser.ID_User}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          if (response.data.success) {
            setAmendes(response.data.data);
          } else {
            alert("Erreur lors de la récupération des amendes.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des amendes : ", error);
        });
    }
  }, []);

  const handlePayerAmende = (amendeId, montant) => {
    const paiementData = {
      amende_id: amendeId,
      montant_paye: montant,
    };

    axios
      .post("http://localhost:5000/api/payer_amende", paiementData)
      .then((response) => {
        if (response.data.success) {
          alert("Amende payée avec succès !");
          // Actualiser la liste des amendes
          setAmendes(amendes.filter((amende) => amende.ID_AMENDE !== amendeId));
        } else {
          alert("Erreur lors du paiement.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du paiement de l'amende : ", error);
      });
  };

  return (
    <div>
      <h2>Mes Amendes</h2>
      {amendes.length > 0 ? (
        <ul>
          {amendes.map((amende) => (
            <li key={amende.ID_AMENDE}>
              Livre: {amende.ID_LIVRE}, Montant: {amende.MONTANT}€
              <button
                onClick={() =>
                  handlePayerAmende(amende.ID_AMENDE, amende.MONTANT)
                }
              >
                Payer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune amende en cours.</p>
      )}
    </div>
  );
}

export default Amendes;
