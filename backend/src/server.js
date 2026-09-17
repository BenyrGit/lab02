import cors from 'cors';
import express from 'express';
import { pathToFileURL } from 'node:url';

const app = express();
const port = process.env.PORT || 3001;
const conversions = {
  length: { units: ['feet', 'meters'], labels: { feet: 'pieds', meters: 'mètres' }, toBase: { feet: v => v * 0.3048, meters: v => v }, fromBase: { feet: v => v / 0.3048, meters: v => v } },
  temperature: { units: ['celsius', 'fahrenheit'], labels: { celsius: '°C', fahrenheit: '°F' }, toBase: { celsius: v => v, fahrenheit: v => (v - 32) * 5 / 9 }, fromBase: { celsius: v => v, fahrenheit: v => v * 9 / 5 + 32 } },
  weight: { units: ['kilograms', 'pounds'], labels: { kilograms: 'kg', pounds: 'lb' }, toBase: { kilograms: v => v, pounds: v => v * 0.45359237 }, fromBase: { kilograms: v => v, pounds: v => v / 0.45359237 } }
};
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok', uptime: Math.round(process.uptime()), timestamp: new Date().toISOString() }));
app.post('/api/convert', (req, res) => {
  const { value, from, to, category } = req.body || {};
  const numericValue = Number(value);
  const conversion = conversions[category];
  if (value === '' || value === null || value === undefined || !Number.isFinite(numericValue)) return res.status(400).json({ error: 'La valeur doit être un nombre valide.' });
  if (!conversion || !conversion.units.includes(from) || !conversion.units.includes(to)) return res.status(400).json({ error: 'Les unités sélectionnées ne sont pas compatibles.' });
  if (from === to) return res.status(400).json({ error: 'Veuillez sélectionner deux unités différentes.' });
  const result = conversion.fromBase[to](conversion.toBase[from](numericValue));
  return res.json({ value: numericValue, result: Number(result.toFixed(6)), from, to, category });
});
app.use((_req, res) => res.status(404).json({ error: 'Route introuvable.' }));
const isMainModule = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (isMainModule && process.env.NODE_ENV !== 'test' && !process.argv.includes('--test')) {
  app.listen(port, () => console.log(`API prête sur http://localhost:${port}`));
}
export { app, conversions };
