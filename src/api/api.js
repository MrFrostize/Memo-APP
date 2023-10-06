// Importation de la bibliothèque UUID pour générer des identifiants uniques
import { v4 as uuidv4 } from "uuid";

// URL de base de l'API
const API_URL = "http://localhost:3001";

// Fonction pour récupérer la liste des termes depuis l'API
export const fetchTerms = async () => {
  const response = await fetch(`${API_URL}/terms`);
  if (!response.ok) {
    throw new Error("Failed to fetch terms");
  }
  const data = await response.json();
  return data;
};

// Fonction pour récupérer la liste des colonnes depuis l'API
export const fetchColumns = async () => {
  const response = await fetch(`${API_URL}/columns`);
  if (!response.ok) {
    throw new Error("Failed to fetch columns");
  }
  const data = await response.json();
  return data;
};

// Fonction pour récupérer la liste des cartes associées à un terme spécifique depuis l'API
export const fetchCards = async (termId) => {
  const response = await fetch(`${API_URL}/cards?tid=${termId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch cards: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

// Fonction pour créer une nouvelle carte via l'API
export const createCard = async ({ question, answer, termId, columnId }) => {
  const response = await fetch(`${API_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      answer,
      column: columnId,
      selected: false,
      tid: termId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create card: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Fonction pour mettre à jour une carte existante via l'API
export const updateCard = async (updatedCard) => {
  const response = await fetch(`${API_URL}/cards/${updatedCard.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCard),
  });

  if (!response.ok) {
    throw new Error(`Failed to update card: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Fonction pour supprimer une carte via l'API
export const deleteCard = async (cardId) => {
  const response = await fetch(`${API_URL}/cards/${cardId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete card");
  }
};

// Fonction pour ajouter un nouveau terme via l'API
export const addTerm = async (newTerm) => {
  const currentTerms = await fetchTerms(); // Récupération des termes actuels

  // Génération d'un nouvel ID et UID
  const newId = Math.max(...currentTerms.map((term) => term.id), 0) + 1;
  const newUid = uuidv4();

  // Préparation des données du nouveau terme
  const newTermData = {
    id: newId,
    uid: newUid,
    name: newTerm.name,
    open: false,
    selected: false,
  };

  // Envoi de la requête pour ajouter le nouveau terme
  const response = await fetch(`${API_URL}/terms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTermData),
  });

  if (!response.ok) {
    throw new Error("Failed to add term");
  }

  const addedTerm = await response.json();
  return addedTerm;
};
