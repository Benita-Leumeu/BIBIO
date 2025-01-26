import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header_temp";
import Footer from "../../components/Footer";
import "./Homepage.scss";

function HomePages() {
  return (
    <div>
      <Header />
      <main>
        {/* Section Bannière */}
        <section className="banner">
          <div className="banner-content">
            <h1>Bienvenue à BookManager</h1>
            <p>
              Gérez vos emprunts, réservations et paiements en ligne avec facilité.
            </p>
            <div className="banner-search">
              <select className="search-dropdown">
                <option value="catalogue">catalogue</option>
                <option value="genre">genre</option>
                {/* <option value="document">Document</option> */}
              </select>
              <input type="text" placeholder="Saisissez les termes de votre recherche" className="search-input" />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </section>

        {/* Section Nos Services arrangée en grille */}
        <section className="features">
          <h2>Nos Services</h2>
          <div className="feature-list">
            <div className="feature-item">
              <img src={require("../../assets/images/image1.jpg")} alt="Membre" />
              <h3>Membres</h3>
              <p>
                Inscrivez-vous, réservez des livres, consultez vos emprunts, et payez vos amendes en ligne.
              </p>
              <Link to="/membre/dashboard" className="btn-secondary">
                Voir le tableau de bord
              </Link>
            </div>

            <div className="feature-item">
              <img src={require("../../assets/images/image2.jpg")} alt="Préposé" />
              <h3>Préposés</h3>
              <p>
                Gérez les emprunts, retours et réservations pour les membres.
              </p>
              <Link to="/prepose/dashboard" className="btn-secondary">
                Voir le tableau de bord
              </Link>
            </div>

            <div className="feature-item">
              <img src={require("../../assets/images/image3.jpg")} alt="Gérants" />
              <h3>Gérants</h3>
              <p>
                Générez des rapports sur les emprunts, retours et réservations.
              </p>
              <Link to="/gerant/dashboard" className="btn-secondary">
                Voir le tableau de bord
              </Link>
            </div>

            <div className="feature-item">
              <img src={require("../../assets/images/image4.jpg")} alt="Comptabilité" />
              <h3>Comptabilité</h3>
              <p>Encaisser les frais.</p>
              <Link to="/comptabilite/encaisser-frais" className="btn-secondary">
                Voir le tableau de bord
              </Link>
            </div>

            <div className="feature-item">
              <img src={require("../../assets/images/image5.jpg")} alt="Bibliothécaire" />
              <h3>Bibliothécaire</h3>
              <p>Classifier les livres ou documents.</p>
              <Link to="/bibliothecaire/classifier-documents" className="btn-secondary">
                Voir le tableau de bord
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePages;
