// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react"; // Importation des Hooks useEffect et useState de React
import { useParams } from "react-router-dom"; // Importation du Hook useParams de react-router-dom pour accéder aux paramètres de l'URL
import Columns from "./Columns"; // Importation du composant Columns
import Card from "./Card"; // Importation du composant Card
import { fetchCards, createCard, updateCard, deleteCard } from "../api/api"; // Importation des fonctions de l'API
import CreateCardModal from "./CreateCardModal"; // Importation du composant CreateCardModal
import { DragDropContext } from "react-beautiful-dnd"; // Importation de DragDropContext de react-beautiful-dnd pour gérer le glisser-déposer

const API_URL = "http://localhost:3001"; // Définition de l'URL de base de l'API

// Définition de la fonction fetchTerm pour récupérer les informations d'un terme spécifique
const fetchTerm = async (termId) => {
  const response = await fetch(`${API_URL}/terms/${termId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch term: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

// Définition de la fonction fetchColumns pour récupérer les informations des colonnes
const fetchColumns = async () => {
  const response = await fetch(`${API_URL}/columns`);
  if (!response.ok) {
    throw new Error(`Failed to fetch columns: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

// Définition du composant TermPage
function TermPage({
  onMoveCard,
  onUpdateCard,
  onDeleteCard,
  cards,
  setCards,
  ...otherProps
}) {
  const { termId } = useParams(); // Récupération du paramètre termId de l'URL
  const [term, setTerm] = useState(null); // Définition de l'état local term et de sa fonction de mise à jour setTerm
  const [columns, setColumns] = useState([]); // Définition de l'état local columns et de sa fonction de mise à jour setColumns
  const [error, setError] = useState(null); // Définition de l'état local error et de sa fonction de mise à jour setError
  const [question, setQuestion] = useState(""); // Définition de l'état local question et de sa fonction de mise à jour setQuestion
  const [answer, setAnswer] = useState(""); // Définition de l'état local answer et de sa fonction de mise à jour setAnswer
  const [showModal, setShowModal] = useState(false); // Définition de l'état local showModal et de sa fonction de mise à jour setShowModal

  const handleShowModal = () => setShowModal(true); // Fonction pour afficher la modale
  const handleCloseModal = () => setShowModal(false); // Fonction pour fermer la modale

  // Définition de la fonction handleCreateCard pour créer une nouvelle carte
  const handleCreateCard = async ({ question, answer, columnId }) => {
    try {
      const newCard = await createCard({
        question,
        answer,
        columnId,
        termId: Number(termId),
      });
      setCards((prevCards) => [...prevCards, newCard]);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    onMoveCard(
      draggableId,
      { droppableId: source.droppableId, index: source.index },
      { droppableId: destination.droppableId, index: destination.index }
    );
  };
  const handleUpdateCard = async (cardId, updatedQuestion, updatedAnswer) => {
    try {
      const updatedCard = await updateCard({
        id: cardId,
        question: updatedQuestion,
        answer: updatedAnswer,
      });
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        )
      );
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  useEffect(() => {
    const loadTerm = async () => {
      try {
        const fetchedTerm = await fetchTerm(termId);
        setTerm(fetchedTerm);
      } catch (error) {
        setError(error);
      }
    };
    loadTerm();
  }, [termId]);

  useEffect(() => {
    const loadColumns = async () => {
      try {
        const fetchedColumns = await fetchColumns();
        setColumns(fetchedColumns);
      } catch (error) {
        setError(error);
      }
    };
    loadColumns();
  }, []);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const fetchedCards = await fetchCards(termId);
        setCards(fetchedCards);
      } catch (error) {
        setError(error);
      }
    };
    loadCards();
  }, [termId]);

  return (
    <div>
      <div className="term-page container">
        {!term ? (
          <div className="text-center my-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mt-4 mb-4 bg-light p-3 rounded">{term.name}</h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Columns
                columns={columns}
                cards={cards}
                onUpdateCard={onUpdateCard}
                onDeleteCard={onDeleteCard}
                onMoveCard={onMoveCard} // Passing onMoveCard as prop to Columns
              />
            </DragDropContext>
            <button className="theme-tab" onClick={handleShowModal}>
              Add Card
            </button>
            <CreateCardModal
              show={showModal}
              handleClose={handleCloseModal}
              handleCreateCard={handleCreateCard}
              columns={columns} // Ajoutez cette ligne
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TermPage;
