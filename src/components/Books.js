import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/bibliotheque.css' 

function Books() {
  const [books, setBooks] = useState([]); // Stocker la liste des livres
  const [categories, setCategories] = useState([]); // Stocker les catégories uniques
  const [selectedCategory, setSelectedCategory] = useState(""); // Stocker la catégorie sélectionnée
  const [user, setUser] = useState(null); // Stocker les informations de l'utilisateur connecté
  const [message, setMessage] = useState(""); // Stocker le message de confirmation ou d'erreur
  const navigate = useNavigate();

  // Récupérer les livres et les catégories lors du chargement de la page
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/livre")
      .then((response) => {
        if (response.data.success) {
          const allBooks = response.data.data;
          setBooks(allBooks);

          // Extraire les catégories uniques des livres
          const uniqueCategories = [
            ...new Set(allBooks.map((book) => book.categorie)),
          ];
          setCategories(uniqueCategories);
        } else {
          alert("Erreur lors de la récupération des livres");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête des livres : ", error);
      });

    // Vérifier si l'utilisateur est connecté et récupérer ses informations depuis localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userToken = localStorage.getItem("userToken");

    if (storedUser && userToken) {
      setUser({ ...storedUser, token: userToken });
    }
  }, []);

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return user !== null;
  };

  // Rediriger l'utilisateur vers la page de connexion si non connecté
  const redirectToLogin = () => {
    alert("Veuillez vous connecter pour effectuer cette action.");
    navigate("/login");
  };

  // Gérer la réservation d'un livre
  const handleReserve = (bookId) => {
    if (!isAuthenticated()) {
      return redirectToLogin();
    }

    const reservationData = {
      user_id: user.ID_User, // Utiliser l'ID de l'utilisateur connecté
      book_id: bookId,
      reservation_date: new Date().toISOString().split("T")[0],
      return_date: "", // Date fictive pour l'exemple
    };

    axios
      .post("http://localhost:5000/api/reservation", reservationData, {
        headers: { Authorization: `Bearer ${user.token}` }, // Inclure le token JWT
      })
      .then((response) => {
        if (response.data.success) {
          setMessage(`Le livre a été réservé avec succès.`);
        } else {
          setMessage(response.data.message || "Ce livre a déjà été réservé.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la réservation : ", error);
        setMessage("Erreur lors de la réservation.");
      });
  };

  // Gérer la sélection de la catégorie
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filtrer les livres par catégorie sélectionnée
  const filteredBooks = books.filter((book) => {
    if (selectedCategory === "") return true;
    return book.categorie === selectedCategory;
  });

  return (
    <div>
      {user && (
        <div>
          <h2>
            Bienvenue, {user.Nom} {user.Prenom} !
          </h2>
          {/* Lien vers la page Profil */}
          <button onClick={() => navigate("/profile")}>Profil</button>
        </div>
      )}

      <h2>Liste des livres</h2>
      {/* Affichage du message de confirmation ou d'erreur */}
      {message && (
        <p style={{ color: message.includes("succès") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {/* Menu déroulant pour filtrer par catégorie */}
      <label htmlFor="category">Filtrer par catégorie : </label>
      <select
        id="category"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-item">
              <h3>{book.nom}</h3>
              <p>Auteur: {book.autheur}</p>
              <p>Année: {book.annee}</p>
              <p>Catégorie: {book.categorie}</p>

              {/* Affichage de l'image du livre si elle existe */}
              {book.chemin_livre && (
                <img
                  src={book.chemin_livre}
                  alt={book.nom}
                  style={{ width: "150px", height: "200px" }}
                />
              )}

              {/* Bouton pour réserver un livre */}
              <button onClick={() => handleReserve(book.id)}>Réserver</button>
            </div>
          ))
        ) : (
          <p>Aucun livre disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default Books;
