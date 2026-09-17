import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const absoluteZero = {
  celsius: -273.15,
  fahrenheit: -459.67,
  kelvin: 0
};

function toCelsius(value, from) {
  if (from === 'celsius') {
    return value;
  }

  if (from === 'fahrenheit') {
    return ((value - 32) * 5) / 9;
  }

  if (from === 'kelvin') {
    return value - 273.15;
  }

  return null;
}

function fromCelsius(value, to) {
  if (to === 'celsius') {
    return value;
  }

  if (to === 'fahrenheit') {
    return (value * 9) / 5 + 32;
  }

  if (to === 'kelvin') {
    return value + 273.15;
  }

  return null;
}

function convertTemperature(value, from, to) {
  const celsiusValue = toCelsius(value, from);

  if (celsiusValue === null) {
    return null;
  }

  const result = fromCelsius(celsiusValue, to);

  if (result === null) {
    return null;
  }

  return {
    inputUnit: from,
    outputUnit: to,
    result
  };
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', uptime: Math.round(process.uptime()), timestamp: new Date().toISOString() });
});

app.post('/api/convert', (request, response) => {
  const { value, from, to } = request.body;
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return response.status(400).json({
      error: 'La valeur fournie doit etre un nombre valide.'
    });
  }

  if (!(from in absoluteZero) || !(to in absoluteZero)) {
    return response.status(400).json({
      error: 'Les unites doivent etre "celsius", "fahrenheit" ou "kelvin".'
    });
  }

  if (numericValue < absoluteZero[from]) {
    return response.status(400).json({
      error: 'La temperature ne peut pas etre inferieure au zero absolu.'
    });
  }

  const conversion = convertTemperature(numericValue, from, to);

  if (!conversion) {
    return response.status(400).json({
      error: 'Conversion impossible.'
    });
  }

  return response.json({
    ...conversion,
    input: numericValue,
    result: Number(conversion.result.toFixed(2))
  });
});

const isMainModule = process.argv[1] && new URL(`file://${process.argv[1].replaceAll('\\', '/')}`).href === import.meta.url;
if (isMainModule && process.env.NODE_ENV !== 'test' && !process.argv.includes('--test')) {
  app.listen(port, () => {
    console.log(`Backend pret sur http://localhost:${port}`);
  });
}

export { absoluteZero, convertTemperature, fromCelsius, toCelsius };
