// Importez les dépendances nécessaires
import React, { useState } from "react";
import Modal from "react-modal";
import "../scss/CreateTermModal.scss"; // Assurez-vous que le chemin vers le fichier SCSS est correct

// Assurez-vous de définir l'élément racine pour la modale
Modal.setAppElement("#root");

// Composant pour créer un nouveau terme via une modal
function CreateTermModal({ onCancel, onSubmit }) {
  // État local pour le nom du terme
  const [termName, setTermName] = useState("");

  // Gestionnaire de changement d'input
  const handleInputChange = (event) => {
    setTermName(event.target.value);
  };

  // Gestionnaire d'annulation
  const handleCancel = () => {
    setTermName("");  // Réinitialise l'état local
    onCancel();  // Propage l'annulation
  };

  // Gestionnaire de soumission
  const handleSubmit = () => {
    if (termName) {  // Vérifie que le nom du terme n'est pas vide
      onSubmit({ name: termName });  // Propage la soumission
      setTermName("");  // Réinitialise l'état local
    }
  };

  return (
    // Composant Modal de react-modal pour afficher la fenêtre modale
    <Modal
      isOpen={true}  // La modal est toujours ouverte
      onRequestClose={handleCancel}  // Gestionnaire de fermeture
      className="create-term-modal"  // Classe CSS
    >
      <div className="modal-header">
        <h5 className="modal-title">Créer un nouveau thème</h5>
        <button type="button" className="close" onClick={handleCancel}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {/* Champ d'input pour le nom du terme */}
        <input
          type="text"
          className="form-control"
          placeholder="Entrez le nom du thème"
          value={termName}
          onChange={handleInputChange}
          id="termName"
        />
      </div>
      <div className="modal-footer">
        {/* Boutons d'annulation et de soumission */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Annuler
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Créer
        </button>
      </div>
    </Modal>
  );
}

// Exportation du composant pour utilisation dans d'autres fichiers
export default CreateTermModal;
