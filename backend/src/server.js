import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function convertTemperature(value, from) {
  if (from === 'celsius') {
    return {
      inputUnit: 'celsius',
      outputUnit: 'fahrenheit',
      result: (value * 9) / 5 + 32
    };
  }

  if (from === 'fahrenheit') {
    return {
      inputUnit: 'fahrenheit',
      outputUnit: 'celsius',
      result: ((value - 32) * 5) / 9
    };
  }

  return null;
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/convert', (request, response) => {
  const { value, from } = request.body;
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return response.status(400).json({
      error: 'La valeur fournie doit etre un nombre valide.'
    });
  }

  const conversion = convertTemperature(numericValue, from);

  if (!conversion) {
    return response.status(400).json({
      error: 'L unite source doit etre "celsius" ou "fahrenheit".'
    });
  }

  return response.json({
    ...conversion,
    input: numericValue,
    result: Number(conversion.result.toFixed(2))
  });
});

app.listen(port, () => {
  console.log(`Backend pret sur http://localhost:${port}`);
});
