import React, { useEffect, useState } from "react";
import axios from "axios";

function UserBooks() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const userToken = localStorage.getItem("userToken");

    if (loggedUser && userToken) {
      setUser({ ...loggedUser, token: userToken });

      // Récupérer les livres réservés, empruntés, retournés par l'utilisateur
      axios
        .get(`http://localhost:5000/api/userBooks/${loggedUser.id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          if (response.data.success) {
            setBooks(response.data.books);
          } else {
            alert("Erreur lors de la récupération des livres.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des livres : ", error);
        });
    }
  }, []);

  return (
    <div>
      <h2>Mes livres</h2>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <h3>{book.nom}</h3>
              <p>Auteur: {book.autheur}</p>
              <p>Statut: {book.status}</p> {/* Statut (réservé, emprunté, retourné) */}
            </div>
          ))
        ) : (
          <p>Aucun livre réservé ou emprunté.</p>
        )}
      </div>
    </div>
  );
}

export default UserBooks;
