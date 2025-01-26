import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header_temp";
import Footer from "./Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/connexion",
        userData
      );

      if (response.data.success) {
        const user = response.data.user;
        setMessage(`Bienvenue ${user.Nom} ${user.Prenom}`);

        // Stocker les informations de l'utilisateur dans localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirection basée sur le rôle de l'utilisateur
        if (user.role === "Préposé") {
          navigate("/AccueilPrepose");
        } else if (user.role === "Bibliothécaire") {
          navigate("/AccueilBibliothecaire");
        } else if (user.role === "Gérant") {
          navigate("/AccueilGerant");
        } else if (user.role === "Comptabilité") {
          navigate("/AccueilComptabilite");
        } else {
          // Rediriger vers la page d'accueil des membres simples par défaut
          navigate("/Acceuil");
        }
      } else {
        setMessage("Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div>
      <Header />
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
      <Footer />
    </div>
  );
}

export default Login;
