# Lab02 - Convertisseur de temperature

Application avec un backend Node.js/Express et un frontend React utilisant Material UI.

## Installation

```powershell
npm run install:all
```

## Demarrage

```powershell
npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

## API

`POST /api/convert`

Exemple:

```json
{
  "value": 25,
  "from": "celsius"
}
```

Reponse:

```json
{
  "inputUnit": "celsius",
  "outputUnit": "fahrenheit",
  "result": 77,
  "input": 25
}
```
