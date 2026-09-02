import React, { useMemo, useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const units = {
  celsius: {
    label: 'Celsius',
    symbol: 'deg C',
    min: -273.15
  },
  fahrenheit: {
    label: 'Fahrenheit',
    symbol: 'deg F',
    min: -459.67
  },
  kelvin: {
    label: 'Kelvin',
    symbol: 'K',
    min: 0
  }
};

const unitOptions = Object.entries(units);

function formatConversion(conversion) {
  return `${conversion.input} ${units[conversion.inputUnit].symbol} = ${conversion.result} ${units[conversion.outputUnit].symbol}`;
}

function App() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('celsius');
  const [to, setTo] = useState('fahrenheit');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const canConvert = useMemo(() => from !== to, [from, to]);

  const hasValue = value !== '';

  const handleConvert = async (event) => {
    event.preventDefault();
    setError('');
    setResult(null);

    if (!canConvert) {
      setError('Choisissez deux unites differentes.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value, from, to })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conversion impossible.');
      }

      setResult(data);
      setHistory((items) => [data, ...items].slice(0, 5));
    } catch (conversionError) {
      setError(conversionError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
    setError('');
  };

  const handleReset = () => {
    setValue('');
    setResult(null);
    setError('');
  };

  const handleFromChange = (event) => {
    const selectedUnit = event.target.value;

    setFrom(selectedUnit);
    setResult(null);
    setError('');

    if (selectedUnit === to) {
      setTo(from);
    }
  };

  const handleToChange = (event) => {
    const selectedUnit = event.target.value;

    setTo(selectedUnit);
    setResult(null);
    setError('');

    if (selectedUnit === from) {
      setFrom(to);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'grid',
        alignItems: 'center',
        px: 2,
        py: 5,
        background:
          'linear-gradient(135deg, #f7f9fc 0%, #e7f0f4 48%, #fff0f3 100%)'
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            overflow: 'hidden',
            borderRadius: 3
          }}
        >
          <Box
            sx={{
              px: { xs: 3, md: 4 },
              py: 3,
              color: 'common.white',
              background:
                'linear-gradient(120deg, #155e75 0%, #0f766e 58%, #be445f 100%)'
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <ThermostatIcon fontSize="large" />
                <Box>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    Convertisseur de temperature
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.82)' }}>
                    Celsius, Fahrenheit et Kelvin avec le backend Express.
                  </Typography>
                </Box>
              </Stack>
              <Chip
                label="API locale"
                color="default"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.18)',
                  color: 'common.white',
                  fontWeight: 700
                }}
              />
            </Stack>
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={3}>
              <Box component="form" onSubmit={handleConvert}>
                <Stack spacing={2.5}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      select
                      label="De"
                      value={from}
                      onChange={handleFromChange}
                      fullWidth
                    >
                      {unitOptions.map(([unit, details]) => (
                        <MenuItem key={unit} value={unit}>
                          {details.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      label="Vers"
                      value={to}
                      onChange={handleToChange}
                      fullWidth
                    >
                      {unitOptions.map(([unit, details]) => (
                        <MenuItem key={unit} value={unit}>
                          {details.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      label={`Temperature en ${units[from].label}`}
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      type="number"
                      inputProps={{ step: 'any', min: units[from].min }}
                      required
                      fullWidth
                      autoFocus
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {units[from].symbol}
                          </InputAdornment>
                        )
                      }}
                    />

                    <Stack direction="row" spacing={1} sx={{ minWidth: { md: 184 } }}>
                      <Tooltip title="Inverser le sens">
                        <IconButton
                          type="button"
                          onClick={handleSwap}
                          sx={{
                            width: 56,
                            height: 56,
                            border: 1,
                            borderColor: 'divider'
                          }}
                          aria-label="Inverser le sens"
                        >
                          <SwapHorizIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reinitialiser">
                        <span>
                          <IconButton
                            type="button"
                            onClick={handleReset}
                            disabled={!hasValue && !result && !error}
                            sx={{
                              width: 56,
                              height: 56,
                              border: 1,
                              borderColor: 'divider'
                            }}
                            aria-label="Reinitialiser"
                          >
                            <RestartAltIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading || !canConvert}
                        sx={{ flex: 1, minWidth: 0 }}
                      >
                        {isLoading ? '...' : 'OK'}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>

              {error && <Alert severity="error">{error}</Alert>}

              <Box
                sx={{
                  minHeight: 132,
                  display: 'grid',
                  alignItems: 'center',
                  border: 1,
                  borderColor: result ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 3,
                  bgcolor: result ? 'rgba(23, 107, 135, 0.08)' : 'background.default'
                }}
              >
                {result ? (
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Resultat
                    </Typography>
                    <Typography
                      variant="h3"
                      component="output"
                      sx={{
                        fontWeight: 800,
                        lineHeight: 1.1,
                        overflowWrap: 'anywhere'
                      }}
                    >
                      {result.result} {units[result.outputUnit].symbol}
                    </Typography>
                    <Typography color="text.secondary">
                      {result.input} {units[result.inputUnit].symbol} converti en{' '}
                      {units[result.outputUnit].label}.
                    </Typography>
                  </Stack>
                ) : (
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Pret pour une conversion
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {units[from].label} vers {units[to].label}
                    </Typography>
                    <Typography color="text.secondary">
                      Entrez une temperature, puis lancez la conversion.
                    </Typography>
                  </Stack>
                )}
              </Box>

              <Divider />

              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <HistoryIcon color="action" />
                  <Typography variant="h6">Historique</Typography>
                </Stack>

                {history.length > 0 ? (
                  <Stack spacing={1}>
                    {history.map((item, index) => (
                      <Box
                        key={`${item.input}-${item.inputUnit}-${item.result}-${index}`}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 2,
                          px: 1.5,
                          py: 1.25,
                          borderRadius: 1,
                          bgcolor: 'background.default'
                        }}
                      >
                        <Typography sx={{ overflowWrap: 'anywhere' }}>
                          {formatConversion(item)}
                        </Typography>
                        <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                          #{history.length - index}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography color="text.secondary">
                    Les cinq dernieres conversions apparaitront ici.
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
