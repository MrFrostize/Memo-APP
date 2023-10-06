// Import des dépendances et composants nécessaires
import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

// Composant Columns qui représente l'ensemble des colonnes dans l'interface utilisateur
function Columns({ columns, cards, onUpdateCard, onDeleteCard, onMoveCard }) {
  // Gestionnaire d'événements appelé lorsqu'un glisser-déposer se termine
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Si l'élément n'a pas été déposé dans une colonne, rien à faire
    if (!destination) {
      return;
    }

    // Si l'élément n'a pas été déplacé (position source et destination identiques), rien à faire
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Appel à la fonction onMoveCard pour mettre à jour l'état des cartes après un glisser-déposer
    onMoveCard(
      draggableId,
      { droppableId: source.droppableId, index: source.index },
      { droppableId: destination.droppableId, index: destination.index }
    );
  };

  return (
    // Contexte de glisser-déposer fourni par react-beautiful-dnd
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Conteneur pour les colonnes */}
      <div className="row">
        {/* Itération sur toutes les colonnes et affichage de chaque colonne */}
        {columns.map((column) => (
          <Column
            key={column.id} // Clé unique pour chaque colonne
            column={column} // Données de la colonne
            // Filtrage des cartes appartenant à cette colonne
            cards={cards.filter((card) => card.column === column.id)}
            onUpdateCard={onUpdateCard} // Fonction de mise à jour des cartes
            onDeleteCard={onDeleteCard} // Fonction de suppression des cartes
          />
        ))}
      </div>
    </DragDropContext>
  );
}

// Exportation du composant pour utilisation dans d'autres fichiers
export default Columns;
