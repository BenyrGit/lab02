import assert from 'node:assert/strict';
import test from 'node:test';
import { absoluteZero, convertTemperature } from '../src/server.js';

test('convertit Celsius en Fahrenheit', () => {
  assert.equal(Number(convertTemperature(100, 'celsius', 'fahrenheit').result.toFixed(2)), 212);
});

test('convertit Fahrenheit en Kelvin', () => {
  assert.equal(Number(convertTemperature(32, 'fahrenheit', 'kelvin').result.toFixed(2)), 273.15);
});

test('convertit Kelvin en Celsius', () => {
  assert.equal(Number(convertTemperature(273.15, 'kelvin', 'celsius').result.toFixed(2)), 0);
});

test('refuse une température sous le zéro absolu', () => {
  assert.ok(-300 < absoluteZero.celsius);
  assert.ok(-500 < absoluteZero.fahrenheit);
});

test('refuse les unités inconnues', () => {
  assert.equal(convertTemperature(10, 'celsius', 'bogus'), null);
});
