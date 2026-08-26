# Convertisseur pieds → mètres

Application full-stack permettant de convertir une valeur en pieds vers des mètres.

## Prérequis

- Node.js 20 ou plus récent
- npm 10 ou plus récent

## Installation et démarrage

Ouvrez deux terminaux à la racine du projet.

```powershell
cd backend
npm install
npm run dev
```

```powershell
cd frontend
npm install
npm run dev
```

Ouvrez ensuite l'adresse indiquée par Vite (habituellement `http://localhost:5173`).

## API

`POST /api/convert`

Exemple de corps JSON :

```json
{ "feet": 10 }
```

Exemple de réponse :

```json
{ "feet": 10, "meters": 3.048 }
```
