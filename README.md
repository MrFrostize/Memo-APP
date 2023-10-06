# Memo App

Memo App est une application de gestion de fiches de révision basée sur React. Elle permet aux utilisateurs de créer, d'organiser et de réviser des fiches par thèmes. L'application utilise une architecture modulaire, avec des composants réutilisables, pour permettre une extension facile.

## Fonctionnalités

- Création, modification et suppression de fiches de révision.
- Organisation des fiches en colonnes et thèmes.
- Glisser-déposer pour réorganiser les fiches.
- Authentification utilisateur avec inscriptions et connexions.
- Interface utilisateur réactive.

## Structure du projet

Le projet est structuré comme suit:

- `src/` : Le dossier source contenant tous les fichiers source.
  - `components/` : Contient tous les composants React.
  - `api/` : Contient les fonctions d'API pour interagir avec le serveur backend.
  - `scss/` : Contient tous les fichiers SCSS pour le style.
- `public/` : Contient les fichiers publics tels que `index.html`.
- `package.json` : Contient la liste des dépendances et scripts du projet.

## Installation et démarrage

1. **Cloner le dépôt**

```bash
git clone https://github.com/your-username/memo-app.git
cd memo-app
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Démarrer l'application**

```bash
npm start
```

L'application sera lancée sur [http://localhost:3000](http://localhost:3000).

## Configuration

L'URL de l'API est définie dans le fichier `src/api/api.js`. Si votre backend est hébergé ailleurs, assurez-vous de mettre à jour cette URL.

## Dépendances

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Beautiful DnD](https://www.npmjs.com/package/react-beautiful-dnd)
- [Bootstrap](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Contribution

Les contributions sont les bienvenues! Pour contribuer :

1. Forkez ce dépôt.
2. Créez votre branche de fonctionnalités (`git checkout -b feature/fooBar`).
3. Committez vos modifications (`git commit -am 'Add some fooBar'`).
4. Poussez sur la branche (`git push origin feature/fooBar`).
5. Créez une nouvelle Pull Request.

## Licence

Ce projet est sous licence MIT. Pour plus d'informations, voir le fichier [LICENSE](LICENSE).

## Contact

Si vous avez des questions ou des suggestions, n'hésitez pas à ouvrir une issue ou à soumettre une pull request.