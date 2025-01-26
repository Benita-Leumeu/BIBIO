import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Pour rediriger si nécessaire
import "../styles/bibliotheque.css";

function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [user, setUser] = useState(null); // Stocker l'utilisateur connecté
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Pour redirection

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userToken = localStorage.getItem("userToken");

    if (storedUser && userToken) {
      setUser({ ...storedUser, token: userToken });

      // Récupérer les livres empruntés par l'utilisateur
      axios
        .get(`http://localhost:5000/api/borrowed_books/${storedUser.ID_User}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          if (response.data.success) {
            setBorrowedBooks(response.data.data);
          } else {
            setMessage("Erreur lors de la récupération des livres empruntés.");
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des livres empruntés : ",
            error
          );
          setMessage("Erreur lors de la récupération des livres empruntés.");
        });
    } else {
      setMessage("Veuillez vous connecter pour voir vos livres empruntés.");
      // Redirection possible si nécessaire
      navigate("/login");
    }
  }, [navigate]);

  // Retourner un livre emprunté
  const handleReturn = (reservationId) => {
    axios
      .patch(
        "http://localhost:5000/api/livre/return",
        {
          reservation_id: reservationId,
          return_date: new Date().toISOString().split("T")[0],
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((response) => {
        if (response.data.success) {
          setMessage("Livre retourné avec succès !");
          // Retirer le livre retourné de la liste des emprunts
          setBorrowedBooks(
            borrowedBooks.filter(
              (book) => book.reservation_id !== reservationId
            )
          );
        } else {
          setMessage("Erreur lors du retour.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du retour :", error);
        setMessage("Erreur lors du retour.");
      });
  };

  return (
    <div>
      <h2>Mes livres empruntés</h2>
      <p>{message}</p>

      {borrowedBooks.length > 0 ? (
        <ul className="book-list">
          {borrowedBooks.map((book) => (
            <li className="book-item" key={book.reservation_id}>
              <h3>{book.titre}</h3>
              <p>Auteur: {book.auteur}</p>
              <p>Emprunté le: {book.date_emprunt}</p>
              <p>Date de retour prévue: {book.date_retour}</p>
              {book.chemin_livre && (
                <img
                  src={book.chemin_livre}
                  alt={book.titre}
                  style={{ width: "150px", height: "200px" }}
                />
              )}
              <button onClick={() => handleReturn(book.reservation_id)}>
                Retourner
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>{user ? "Aucun livre emprunté." : "Veuillez vous connecter."}</p>
      )}
    </div>
  );
}

export default BorrowedBooks;
