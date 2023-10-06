// Import des dépendances nécessaires
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Composant NavBar avec les props isLoggedIn et onLogout
function NavBar({ isLoggedIn, onLogout }) {
  // Utilisation de useNavigate pour la redirection
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    onLogout(); // Appelle la fonction onLogout passée en props
    navigate("/login"); // Redirige vers la page de connexion
  };

  // Fonction pour gérer la redirection vers la page de connexion
  const handleLogin = () => {
    navigate("/login"); // Redirige vers la page de connexion
  };

  // Fonction pour gérer la navigation vers la liste des terms
  const handleNavigateToTerms = () => {
    navigate("/dashboard/terms"); // Ajustez cette URL en fonction de l'emplacement de ThemeTabs
  };

  // Rendu du composant
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Memo App
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          {/* Bouton pour aller à la liste des terms */}
          <li className="nav-item">
            <button
              className="btn btn-link nav-link"
              onClick={handleNavigateToTerms}
            >
              Terms List
            </button>
          </li>
        </ul>
        {/* Boutons de déconnexion ou de connexion en fonction de l'état de connexion */}
        {isLoggedIn ? (
          <button className="btn btn-primary" onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

// Export du composant
export default NavBar;
