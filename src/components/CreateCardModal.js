// Import des composants et modules nécessaires
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Composant pour créer une nouvelle carte via une modal
function CreateCardModal({ show, handleClose, handleCreateCard, columns }) {
  // État local pour la question, la réponse, et la colonne sélectionnée
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(""); // Nouveau

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateCard({ question, answer, columnId: selectedColumn });
    handleClose();
  };

  // Effet pour définir la colonne sélectionnée par défaut lors du chargement des colonnes
  useEffect(() => {
    if (columns && columns.length > 0) {
      setSelectedColumn(columns[0].id);
    }
  }, [columns]);

  // Fonction de soumission alternative (non utilisée actuellement)
  const onSubmit = (e) => {
    e.preventDefault();
    handleCreateCard({ question, answer, columnId: selectedColumn });
    handleClose();
  };

  return (
    // Composant Modal de react-bootstrap pour afficher la fenêtre modale
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulaire pour la création d'une nouvelle carte */}
        <Form onSubmit={handleSubmit}>
          {/* Groupe de contrôle pour la question */}
          <Form.Group controlId="formQuestion">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          {/* Groupe de contrôle pour la réponse */}
          <Form.Group controlId="formAnswer">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>
          {/* Groupe de contrôle pour la sélection de colonne */}
          <Form.Group controlId="formColumnSelect">
            <Form.Label>Column</Form.Label>
            <Form.Control
              as="select"
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
            >
              {/* Itération sur les colonnes pour créer des options de sélection */}
              {columns.map((column) => (
                <option value={column.id} key={column.id}>
                  {column.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Bouton de soumission du formulaire */}
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

// Exportation du composant pour utilisation dans d'autres fichiers
export default CreateCardModal;
