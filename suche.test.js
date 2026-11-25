const test = require('node:test');
const assert = require('node:assert');
const { anmeldungPruefen, abschnitte, antworten } = require('./suche.js');

const QUELLE = 'Der Mond ist 384.400 km entfernt.\n\nBuzz Aldrin betrat 1969 als zweiter Mensch den Mond.\n\nMars hat zwei Monde.';

test('Anmeldung nur mit Demo-Zugang', () => {
  assert.equal(anmeldungPruefen('demo', 'demo1234'), true);
  assert.equal(anmeldungPruefen('demo', 'falsch'), false);
  assert.equal(anmeldungPruefen('', ''), false);
});

test('Text wird in nummerierte Abschnitte geteilt', () => {
  const a = abschnitte(QUELLE);
  assert.equal(a.length, 3);
  assert.equal(a[1].nr, 2);
});

test('Antwort nennt den passenden Abschnitt', () => {
  const r = antworten('Wann war Aldrin auf dem Mond?', QUELLE);
  assert.equal(r.treffer.nr, 2);
});

test('Ohne Bezug keine erfundene Antwort', () => {
  const r = antworten('Wie heißt der Präsident?', QUELLE);
  assert.equal(r.treffer, null);
});
