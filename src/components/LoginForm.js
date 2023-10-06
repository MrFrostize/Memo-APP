// Import des dépendances
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Composant LoginForm avec la prop onLogin
function LoginForm({ onLogin }) {
  // Définition des états locaux pour le nom d'utilisateur, le mot de passe et les erreurs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Utilisation de useNavigate pour la redirection
  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();  // Empêche la soumission classique du formulaire
    setError(null);  // Réinitialise l'erreur avant chaque soumission

    // Requête à l'API pour vérifier les identifiants
    const response = await fetch(
      `http://localhost:3001/users?username=${username}&password=${password}`
    );
    const users = await response.json();

    // Vérifie si un utilisateur correspondant a été trouvé
    if (users.length > 0) {
      onLogin(users[0]);  // Appelle la fonction onLogin avec l'utilisateur trouvé
      navigate("/dashboard");  // Redirige vers la page du tableau de bord
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect.");  // Sinon, définit un message d'erreur
    }
  };

  // Rendu du composant
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {/* Formulaire de connexion */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  {/* Champ pour le nom d'utilisateur */}
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  {/* Champ pour le mot de passe */}
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Affichage de l'erreur */}
                {error && <div className="alert alert-danger">{error}</div>}
                {/* Boutons de connexion et d'inscription */}
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <Link to="/signup" className="btn btn-primary">
                  S'inscrire
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export du composant
export default LoginForm;
