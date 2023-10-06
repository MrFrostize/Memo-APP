// Importation des dépendances nécessaires
import React from "react";  // Importation de React
import PropTypes from "prop-types";  // Importation de PropTypes pour la validation des propriétés
import { Link } from "react-router-dom";  // Importation de Link depuis react-router-dom pour la gestion des liens

// Définition du composant ThemeTabs qui prend en paramètre les termes (terms) à afficher sous forme d'onglets
function ThemeTabs({ terms }) {
  return (
    <div className="theme-tabs">  {/* Début du conteneur des onglets de thème */}
      {/* Vérification si terms est un tableau avant de le cartographier */}
      {Array.isArray(terms) &&  
        terms.map((term) => (
          <Link
            key={term.id}  // Attribution d'une clé unique à chaque onglet
            to={`/dashboard/terms/${term.id}`}  // Définition du chemin vers lequel l'onglet doit rediriger
            className="theme-tab"  // Attribution de la classe CSS "theme-tab" à chaque onglet
          >
            {term.name}
          </Link>
        ))}
    </div>
  );
}

// Définition des propTypes pour la validation des propriétés passées au composant
ThemeTabs.propTypes = {
  terms: PropTypes.arrayOf(  // terms devrait être un tableau
    PropTypes.shape({  // Chaque élément du tableau devrait être un objet avec une forme spécifiée
      id: PropTypes.number.isRequired,  // L'objet devrait avoir une propriété id qui est un nombre et est requise
      name: PropTypes.string.isRequired,  // L'objet devrait avoir une propriété name qui est une chaîne et est requise
    })
  ),
};

// Définition des valeurs par défaut pour les propriétés du composant
ThemeTabs.defaultProps = {
  terms: [],  // Si terms n'est pas fourni, il sera initialisé à un tableau vide
};

export default ThemeTabs;  // Exportation du composant ThemeTabs par défaut
