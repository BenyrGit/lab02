import { useState } from 'react';
import StraightenIcon from '@mui/icons-material/Straighten';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';

export default function App() {
  const [feet, setFeet] = useState('');
  const [meters, setMeters] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function convert(event) {
    event.preventDefault();
    setError('');
    setMeters(null);

    if (feet.trim() === '' || !Number.isFinite(Number(feet))) {
      setError('Veuillez saisir une valeur numérique en pieds.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feet: Number(feet) })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'La conversion a échoué.');
      }

      setMeters(data.meters);
    } catch (requestError) {
      setError(requestError.message || 'Impossible de joindre le serveur.');
    } finally {
      setLoading(false);
    }
  }

  function resetConverter() {
    setFeet('');
    setMeters(null);
    setError('');
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Container maxWidth="sm">
        <Card elevation={5}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack component="form" spacing={3} onSubmit={convert}>
              <Box textAlign="center">
                <StraightenIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                <Typography component="h1" variant="h4" fontWeight={700}>
                  Convertisseur d’unités
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Convertissez rapidement des pieds en mètres.
                </Typography>
              </Box>

              <TextField
                autoFocus
                fullWidth
                inputProps={{ inputMode: 'decimal', min: 0, step: 'any' }}
                label="Longueur"
                onChange={(event) => setFeet(event.target.value)}
                placeholder="Ex. : 10"
                type="number"
                value={feet}
                InputProps={{
                  endAdornment: <InputAdornment position="end">pieds</InputAdornment>
                }}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  disabled={loading}
                  fullWidth
                  size="large"
                  startIcon={loading ? <CircularProgress color="inherit" size={20} /> : <SwapHorizIcon />}
                  type="submit"
                  variant="contained"
                >
                  {loading ? 'Conversion…' : 'Convertir en mètres'}
                </Button>
                <Button disabled={loading} fullWidth onClick={resetConverter} size="large" variant="outlined">
                  Effacer
                </Button>
              </Stack>

              {error && <Alert severity="error">{error}</Alert>}

              {meters !== null && (
                <Alert icon={<StraightenIcon fontSize="inherit" />} severity="success">
                  <Typography fontWeight={700} variant="h6">
                    {Number(feet)} pieds = {meters} mètres
                  </Typography>
                  <Typography variant="body2">1 pied équivaut exactement à 0,3048 mètre.</Typography>
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
