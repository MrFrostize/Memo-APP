// Import des dépendances nécessaires
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Composant SignupForm avec la prop onSignup
function SignupForm({ onSignup }) {
  // État local pour le nom d'utilisateur, le mot de passe et les erreurs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Hook useNavigate pour la redirection
  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(null); // Réinitialise l'erreur

    // Requête POST pour créer un nouvel utilisateur
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }), // Corps de la requête
    });

    // Gestion de la réponse
    if (response.ok) {
      onSignup({ username, password }); // Appelle la fonction onSignup passée en prop avec les données utilisateur
      navigate("/login"); // Redirige vers la page de connexion
    } else {
      // Gestion des erreurs
      const errorData = await response.json();
      setError(errorData.error || "Une erreur est survenue."); // Affiche l'erreur
    }
  };

  // Rendu du composant
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Met à jour l'état local username
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Met à jour l'état local password
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>} //
                Affiche l'erreur si elle existe
                <button type="submit" className="btn btn-primary">
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export du composant
export default SignupForm;
