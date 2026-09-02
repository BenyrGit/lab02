# Lab02 - Convertisseur de temperature

Application avec un backend Node.js/Express et un frontend React utilisant Material UI.
Elle convertit les temperatures entre Celsius, Fahrenheit et Kelvin.

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
  "from": "celsius",
  "to": "kelvin"
}
```

Reponse:

```json
{
  "inputUnit": "celsius",
  "outputUnit": "kelvin",
  "result": 298.15,
  "input": 25
}
```
