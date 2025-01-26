import React from "react";
import "../../styles/Loginpage.css"; // Importer le CSS
import AdminLogin from "../../components/Admin/LoginAd"; // Assurez-vous que le chemin du fichier est correct
import Header from "../../components/Admin/Header_ad";
import Footer from "../../components/Footer";

function AdminLoginPage() {
  return (
    <div className="container">
      {/* Inclure le header */}
      <Header className="header" />

      <div className="loginBox">
        <h1></h1>
        <AdminLogin />
      </div>

      {/* Inclure le footer */}
      <Footer className="footer" />
    </div>
  );
}

export default AdminLoginPage;
