import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Header.css"; // Assure-toi que le chemin vers le fichier CSS est correct

function Header() {
  const user = localStorage.getItem("user");
  const [isStatus, setIsStatus] = useState(false);
  console.log("Informations du User", user);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsStatus(true);
    }
  }, []);
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/HomeAdmin" className="navbar-brand">
          Bibliotheque
        </Link>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/HomeAdmin" className="nav-link">
              Home
            </Link>
          </li>
          {/* <li className="nav-item"> */}
          {/* <Link to="/gerant/dashboard" className="nav-link"> */}
          {/* Gérant Dashboard */}
          {/* </Link> */}
          {/* </li> */}
          {/* <li className="nav-item"> */}
          {/* <Link to="/prepose/dashboard" className="nav-link"> */}
          {/* Préposé Dashboard */}
          {/* </Link> */}
          {/* </li> */}
          {/* <li className="nav-item"> */}
          {/* <Link to="/membre/dashboard" className="nav-link"> */}
          {/* Membre Dashboard */}
          {/* </Link> */}
          {/* </li> */}
          {isStatus && (
            <>
              <li className="nav-item">
                <Link to="/AdminLogin" className="nav-link">
                  Connexion
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Inscription
                </Link>
              </li> */}
            </>
          )}

          <div className="userImage">
            {/* {user?<img src={user.image} alt={user.Nom}/>:''} */}
            {user ? <div>{user.Nom}</div> : null}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
