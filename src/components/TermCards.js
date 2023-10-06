// Import des dépendances nécessaires
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Composant TermCards
function TermCards() {
  const { termId } = useParams();  // Récupération de l'ID du terme depuis les paramètres de l'URL
  const [cards, setCards] = useState([]);  // État local pour stocker les cartes associées au terme

  useEffect(() => {
    // Supposons que vous ayez une fonction fetchCards qui récupère toutes les cartes
    fetchCards().then((allCards) => {
      // Filtrage des cartes pour ne garder que celles associées au terme courant
      const filteredCards = allCards.filter(
        (card) => card.tid === parseInt(termId, 10)  // Comparaison de l'ID du terme avec celui des cartes
      );
      setCards(filteredCards);  // Mise à jour de l'état local avec les cartes filtrées
    });
  }, [termId]);  // Dépendance à termId pour réexécuter useEffect si termId change

  // Rendu du composant
  return (
    <div className="term-cards">
      {cards.map((card) => (
        <div key={card.id} className="card">  // Utilisation de l'ID de la carte comme clé pour React
          <div className="card-question">{card.question}</div>  // Affichage de la question de la carte
          <div className="card-answer">{card.answer}</div>  // Affichage de la réponse de la carte
        </div>
      ))}
    </div>
  );
}

// Export du composant
export default TermCards;
