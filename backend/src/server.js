import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;
const METERS_PER_FOOT = 0.3048;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/convert', (request, response) => {
  const feet = Number(request.body?.feet);

  if (!Number.isFinite(feet)) {
    return response.status(400).json({
      error: 'La valeur « feet » doit être un nombre valide.'
    });
  }

  const meters = feet * METERS_PER_FOOT;

  return response.json({
    feet,
    meters: Number(meters.toFixed(6))
  });
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Route introuvable.' });
});

app.listen(port, () => {
  console.log(`API prête sur http://localhost:${port}`);
});
