// Importation des dépendances et des styles nécessaires
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../scss/CardStyles.scss";

// Composant Card qui représente une carte individuelle dans l'interface utilisateur
function Card({ card, index, onUpdateCard, onDeleteCard }) {
  
  // États pour gérer les mises à jour des question et réponse de la carte
  const [updatedQuestion, setUpdatedQuestion] = useState(card.question);
  const [updatedAnswer, setUpdatedAnswer] = useState(card.answer);
  
  return (
    // Utilisation de Draggable pour permettre le glisser-déposer de la carte
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="card card-custom"
        >
          <div className="card-body">
            {/* Champ pour la mise à jour de la question */}
            <input
              type="text"
              className="form-control"
              value={updatedQuestion}
              onChange={(e) => setUpdatedQuestion(e.target.value)}
            />
            {/* Champ pour la mise à jour de la réponse */}
            <input
              type="text"
              className="form-control"
              value={updatedAnswer}
              onChange={(e) => setUpdatedAnswer(e.target.value)}
            />
            {/* Bouton pour appliquer les mises à jour */}
            <button
              className="btn btn-primary"
              onClick={() =>
                onUpdateCard(card.id, updatedQuestion, updatedAnswer)
              }
            >
              Update
            </button>
            {/* Bouton pour supprimer la carte */}
            <button
              className="btn btn-danger"
              onClick={() => onDeleteCard(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
