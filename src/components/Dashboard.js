// Import des dépendances
import React, { useEffect, useState } from "react";
import CreateTermModal from "./CreateTermModal";
import { addTerm } from "../api/api";
import ThemeTabs from "./ThemeTabs";
import { Routes, Route } from "react-router-dom";
import TermPage from "./TermPage";
import { useNavigate } from "react-router-dom";
import Columns from "./Columns";

// URL de l'API
const API_URL = "http://localhost:3001";

// Fonction pour récupérer les termes
const fetchTerms = async () => {
  const response = await fetch(`${API_URL}/terms`);
  if (!response.ok) {
    throw new Error(`Failed to fetch terms: ${response.statusText}`);
  }
  const data = await response.json();
  return data || [];
};

// Fonction pour récupérer les colonnes
const fetchColumns = async () => {
  const response = await fetch(`${API_URL}/columns`);
  if (!response.ok) {
    throw new Error(`Failed to fetch columns: ${response.statusText}`);
  }
  const data = await response.json();
  return data || [];
};

// Fonction pour récupérer les cartes
const fetchCards = async () => {
  const response = await fetch(`${API_URL}/cards`);
  if (!response.ok) {
    throw new Error(`Failed to fetch cards: ${response.statusText}`);
  }
  const data = await response.json();
  return data || [];
};

// Composant Dashboard
function Dashboard({
  onLogout,
  onMoveCard,
  onUpdateCard,
  onDeleteCard,
  cards,
  setCards,
}) {
  // États locaux pour les termes, colonnes, et le statut de création
  const [terms, setTerms] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Effet pour initialiser les données
  useEffect(() => {
    const fetchAndSetTerms = async () => {
      try {
        const fetchedTerms = await fetchTerms();
        setTerms(fetchedTerms);
      } catch (error) {
        console.error("Error fetching terms:", error.message);
      }
    };

    const fetchAndSetColumns = async () => {
      try {
        const fetchedColumns = await fetchColumns();
        setColumns(fetchedColumns);
      } catch (error) {
        console.error("Error fetching columns:", error.message);
      }
    };

    const fetchAndSetCards = async () => {
      try {
        const fetchedCards = await fetchCards();
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error.message);
      }
    };

    fetchAndSetTerms();
    fetchAndSetColumns();
    fetchAndSetCards();
  }, []);

  // Handlers pour la création d'un nouveau terme
  const handleCreateClick = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    console.log("Cards array:", cards);
  }, [cards]);

  const handleCreateCancel = () => {
    setIsCreating(false);
  };

  const handleCreateSubmit = async (newTerm) => {
    try {
      const addedTerm = await addTerm(newTerm);
      setTerms((prevTerms) => [...prevTerms, addedTerm]);
    } catch (error) {
      console.error("Failed to add term:", error);
    }
    setIsCreating(false);
  };

  // Rendu du composant
  return (
    <div className="dashboard d-flex">
      <nav className="bg-light sidebar">{/* ... */}</nav>
      <main
        role="main"
        className="main-content col-md-9 ml-sm-auto col-lg-10 px-4"
      >
        <button className="btn btn-primary" onClick={handleCreateClick}>
          Créer un Thème
        </button>
        {isCreating && (
          <CreateTermModal
            onCancel={handleCreateCancel}
            onSubmit={handleCreateSubmit}
          />
        )}
        <ThemeTabs terms={terms} />
      </main>
    </div>
  );
}

// Export du composant
export default Dashboard;
