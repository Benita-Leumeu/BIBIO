import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/bibliotheque.css' 


function Profile() {
  const [user, setUser] = useState(null); // Stocker l'utilisateur connecté
  const [message, setMessage] = useState(""); // Message pour la redirection ou les erreurs
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et récupérer ses informations depuis localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userToken = localStorage.getItem("userToken");

    if (storedUser && userToken) {
      setUser({ ...storedUser, token: userToken });
    } else {
      navigate("/login"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [navigate]);

  // Rediriger vers la page des livres réservés
  const goToReservedBooks = () => {
    navigate("/reserved-books");
  };

  // Rediriger vers la page des livres empruntés
  const goToBorrowedBooks = () => {
    navigate("/borrowed-books");
  };
  // Rediriger vers la page des livres réservés
  const goTopayerAmende = () => {
    navigate("/Amendes");
  };

  return (
    <div>
      {user && (
        <div>
          <h2>
            Bienvenue dans votre profil, {user.Nom} {user.Prenom} !
          </h2>

          <p>{message}</p>

          {/* Options pour accéder aux livres réservés ou empruntés */}
          <div>
            <h3>Vos options</h3>
            <button onClick={goToReservedBooks}>
              Voir mes livres réservés
            </button>
            <button onClick={goToBorrowedBooks}>
              Voir mes livres empruntés
            </button>
            <button onClick={goTopayerAmende}>Voir mes Amendes</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
