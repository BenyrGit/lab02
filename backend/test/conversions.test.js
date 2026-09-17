import assert from 'node:assert/strict';
import test from 'node:test';
import { conversions } from '../src/server.js';

function convert(value, category, from, to) {
  const conversion = conversions[category];
  return conversion.fromBase[to](conversion.toBase[from](value));
}

test('convertit les pieds en mètres', () => {
  assert.equal(convert(10, 'length', 'feet', 'meters'), 3.048);
});

test('convertit les Celsius en Fahrenheit', () => {
  assert.equal(convert(100, 'temperature', 'celsius', 'fahrenheit'), 212);
});

test('convertit les kilogrammes en livres', () => {
  assert.equal(Number(convert(1, 'weight', 'kilograms', 'pounds').toFixed(6)), 2.204623);
});

test('déclare exactement deux unités par catégorie', () => {
  for (const conversion of Object.values(conversions)) assert.equal(conversion.units.length, 2);
});

test('rejette une valeur non numérique', () => {
  const isValid = value => value !== '' && value !== null && value !== undefined && Number.isFinite(Number(value));
  assert.equal(isValid('abc'), false);
  assert.equal(isValid(''), false);
});
