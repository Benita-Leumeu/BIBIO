import React from "react";
import "../../styles/Loginpage.css"; // Importer le CSS
import Login from "../../components/LoginV"; // Assurez-vous que le chemin du fichier est correct
import Header from "../../components/Header_temp";
import Footer from "../../components/Footer";

function LoginPage() {
  return (
    <div className="container">
      {/* Inclure le header */}
      <Header className="header" />

      <div className="loginBox">
        <h1></h1>
        <Login />
      </div>

      {/* Inclure le footer */}
      <Footer className="footer" />
    </div>
  );
}

export default LoginPage;
