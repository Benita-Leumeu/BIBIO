import React from "react";
import Header from "../../components/Header_temp";
import Footer from "../../components/Footer";
// import Books from "../../components/Books";
import "./Homepage.scss";

function HomePage() {
  return (
    <div>
      <Header />
      <main>
        {/* Section Bannière */}
        <section className="banner">
          <div className="banner-content">
            <h1>Bienvenue à BookManager</h1>
            <p>
              Gérez vos emprunts, réservations et paiements en ligne avec
              facilité.
            </p>
          </div>
        </section>
        {/* Section des livres */}
        {/* <Books /> Intégration du composant Books */}
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
