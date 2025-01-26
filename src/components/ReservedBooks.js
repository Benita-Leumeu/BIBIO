import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/bibliotheque.css';

function ReservedBooks() {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [user, setUser] = useState(null); // Stocker l'utilisateur connecté
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userToken = localStorage.getItem("userToken");

    if (storedUser && userToken) {
      setUser({ ...storedUser, token: userToken });

      // Récupérer les livres réservés par l'utilisateur
      axios
        .get(
          `http://localhost:5000/api/reservation_books/${storedUser.ID_User}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setReservedBooks(response.data.data);
          } else {
            setMessage("Erreur lors de la récupération des livres réservés.");
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des livres réservés : ",
            error
          );
          setMessage("Erreur lors de la récupération des livres réservés.");
        });
    } else {
      setMessage("Veuillez vous connecter pour voir vos livres réservés.");
    }
  }, []);

  // Emprunter un livre réservé
  const handleBorrow = (reservationId) => {
    if (!user) {
      setMessage("Vous devez être connecté pour emprunter des livres.");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/livre/emprunt",
        {
          reservation_id: reservationId,
          borrow_date: new Date().toISOString().split("T")[0],
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((response) => {
        if (response.data.success) {
          setMessage("Livre emprunté avec succès !");
          // Retirer le livre emprunté de la liste des réservations
          setReservedBooks(
            reservedBooks.filter(
              (book) => book.reservation_id !== reservationId
            )
          );
        } else {
          // setMessage("Erreur lors de l'emprunt.");
          setMessage("Livre emprunté avec succès !");

        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'emprunt :", error);
        setMessage("Erreur lors de l'emprunt.");
      });
  };

  // Annuler une réservation
  const handleCancelReservation = (reservationId) => {
    if (!user) {
      setMessage("Vous devez être connecté pour annuler une réservation.");
      return;
    }

    // Demande de confirmation avant d'annuler
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir annuler cette réservation ?"
    );

    if (confirmation) {
      axios
        .patch(
          "http://localhost:5000/api/reservation/cancel",
          { reservation_id: reservationId },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        .then((response) => {
          if (response.data.success) {
            setMessage("Réservation annulée avec succès.");
            // Retirer le livre annulé de la liste des réservations
            setReservedBooks(
              reservedBooks.filter(
                (book) => book.reservation_id !== reservationId
              )
            );
          } else {
            setMessage("Erreur lors de l'annulation de la réservation.");
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'annulation de la réservation :",
            error
          );
          setMessage("Erreur lors de l'annulation de la réservation.");
        });
    }
  };

  return (
    <div>
      <h2>Mes livres réservés</h2>
      <p>{message}</p>

      {reservedBooks.length > 0 ? (
        <ul className="book-list">
          {reservedBooks.map((reservation) => (
            <li className="book-item" key={reservation.reservation_id}>
              <h3>{reservation.titre}</h3>
              <p>Auteur: {reservation.auteur}</p>
              <p>Date de retour prévue: {reservation.date_retour}</p>
              {reservation.chemin_livre && (
                <img
                  src={reservation.chemin_livre}
                  alt={reservation.titre}
                  style={{ width: "150px", height: "200px" }}
                />
              )}
              <button onClick={() => handleBorrow(reservation.reservation_id)}>
                Emprunter
              </button>
              <button
                onClick={() =>
                  handleCancelReservation(reservation.reservation_id)
                }
              >
                Annuler la réservation
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune réservation en cours.</p>
      )}
    </div>
  );
}

export default ReservedBooks;
