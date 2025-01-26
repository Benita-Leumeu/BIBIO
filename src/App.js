import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/membre/Login"; // Correction de l'import du chemin
import DashboardGerant from "./pages/gerant/DashboardGerant";
import GenererRapports from "./pages/gerant/GenererRapports";
import DashboardPrepose from "./pages/prepose/DashboardPrepose";
import InscrireMembre from "./pages/prepose/InscrireMembre";
import EnregistrerEmprunt from "./pages/prepose/EnregistrerEmprunt";
import DashboardMembre from "./pages/membre/DashboardMembre";
import ConsulterLivres from "./pages/membre/ConsulterLivres";
import ClassifierDocuments from "./pages/bibliothecaire/ClassifierDocuments";
import EnregistrerReservation from "./pages/prepose/EnregistrerReservation";
import EnregistrerRetour from "./pages/prepose/EnregistrerRetour";
import HomePages from "./pages/home/Homepage"; // Correction de l'import du chemin
import RegisterPage from "./pages/membre/RegisterPage";
import HomePage from "./pages/home/Homeuser";
import UserBooks from "./components/UserBooks.js";
import Books from "./components/Books.js";
import Accueil from "./pages/membre/Accueil";
import Profile from "./components/profile.js";
import BorrowedBooks from "./components/BorrowedBooks.js";
import ReservedBooks from "./components/ReservedBooks.js";
import Amendes from "./components/Amendes.js";
import HomeAdmin from "./pages/Admin/homeAdmin.jsx";
import AdminLoginPage from "./pages/Admin/LoginAd.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Acceuil" element={<Accueil />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/homeAdmin" element={<HomePages />} />
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
        <Route path="/reserved-books" element={<ReservedBooks />} />
        <Route path="/Amendes"jsx element={<Amendes />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />


        <Route path="/login" element={<LoginPage />} />
        <Route path="/gerant/dashboard" element={<DashboardGerant />} />
        <Route path="/gerant/generer-rapports" element={<GenererRapports />} />
        <Route path="/prepose/dashboard" element={<DashboardPrepose />} />
        <Route path="/prepose/inscrire-membre" element={<InscrireMembre />} />
        <Route
          path="/prepose/enregistrer-reservation"
          element={<EnregistrerReservation />}
        />
        <Route
          path="/prepose/enregistrer-retour"
          element={<EnregistrerRetour />}
        />
        <Route
          path="/prepose/enregistrer-emprunt"
          element={<EnregistrerEmprunt />}
        />
        <Route path="/membre/dashboard" element={<DashboardMembre />} />
        <Route path="/membre/consulter-livres" element={<ConsulterLivres />} />

        <Route path="/accueil" element={<Accueil />} />
        <Route
          path="/bibliothecaire/classifier-documents"
          element={<ClassifierDocuments />}
        />
        <Route path="/" element={<Books />} />
        <Route path="/mes-livres" element={<UserBooks />} />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
