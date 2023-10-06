// Importation des dépendances et des composants nécessaires
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./Dashboard";
import TermPage from "./TermPage";
import { updateCard, deleteCard } from "../api/api";

function App() {
  // État pour la gestion de la session utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // État pour la gestion des cartes
  const [cards, setCards] = useState([]);

  // Gestionnaire d'événements pour la connexion
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  // Gestionnaire d'événements pour l'inscription
  const handleSignup = (user) => {
    setIsLoggedIn(true);
  };

  // Gestionnaire d'événements pour la déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  // Gestionnaire d'événements pour déplacer une carte
  const onMoveCard = async (draggableId, source, destination) => {
    const card = cards.find((card) => Number(card.id) === Number(draggableId));
    if (!card) return;
    const updatedCards = cards.map((card) =>
      card.id === parseInt(draggableId)
        ? { ...card, column: parseInt(destination.droppableId) }
        : card
    );
    setCards(updatedCards);
    try {
      await updateCard({ ...card, column: parseInt(destination.droppableId) });
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };

  // Gestionnaire d'événements pour mettre à jour une carte
  const onUpdateCard = async (id, updatedQuestion, updatedAnswer) => {
    const cardIndex = cards.findIndex((card) => card.id === id);
    if (cardIndex === -1) return;
    const updatedCard = {
      ...cards[cardIndex],
      question: updatedQuestion,
      answer: updatedAnswer,
    };
    const updatedCards = [...cards];
    updatedCards[cardIndex] = updatedCard;
    setCards(updatedCards);
    try {
      await updateCard(updatedCard);
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };

  // Gestionnaire d'événements pour supprimer une carte
  const onDeleteCard = async (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    try {
      await deleteCard(id);
    } catch (error) {
      console.error("Failed to delete card:", error);
      setCards((prevCards) => [
        ...prevCards,
        cards.find((card) => card.id === id),
      ]);
    }
  };

  return (
    // Configuration du routeur et des routes
    <Router>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<SignupForm onSignup={handleSignup} />}
        />
        <Route
          path="/dashboard/*"
          element={
            <Dashboard
              onMoveCard={onMoveCard}
              onUpdateCard={onUpdateCard}
              onDeleteCard={onDeleteCard}
              cards={cards}
              setCards={setCards}
            />
          }
        />
        <Route
          path="/dashboard/terms/:termId"
          element={
            <TermPage
              onMoveCard={onMoveCard}
              onUpdateCard={onUpdateCard}
              onDeleteCard={onDeleteCard}
              cards={cards}
              setCards={setCards}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
