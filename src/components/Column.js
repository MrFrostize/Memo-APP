// Import des dépendances et composants nécessaires
import React from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

// Composant Column qui représente une colonne dans l'interface utilisateur
function Column({ cards, column, onUpdateCard, onDeleteCard }) {
  return (
    // Structure de la colonne avec une largeur de 1/3 de l'écran
    <div className="col-md-4">
      {/* Utilisation de Droppable de react-beautiful-dnd pour permettre le glisser-déposer dans la colonne */}
      <Droppable droppableId={column.id.toString()}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {/* Carte conteneur pour la colonne */}
            <div className="card">
              {/* En-tête de la colonne affichant le label de la colonne */}
              <div className="card-header">
                <h2 className="card-title">{column.label}</h2>
              </div>
              {/* Corps de la colonne où les cartes seront affichées */}
              <div className="card-body">
                {/* Itération sur toutes les cartes de la colonne et affichage de chaque carte */}
                {cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    onUpdateCard={onUpdateCard}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
              </div>
            </div>
            {/* Placeholder fourni par Droppable pour gérer l'espace lors du glisser-déposer */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

// Exportation du composant pour utilisation dans d'autres fichiers
export default Column;
