// Reine Logik ohne DOM: Anmeldung prüfen, Text in Abschnitte teilen, Frage beantworten.
// Läuft im Browser (window.Quellen) und in Node (module.exports) für die Tests.

const DEMO_NUTZER = { benutzer: 'demo', passwort: 'demo1234' };

function anmeldungPruefen(benutzer, passwort) {
  return benutzer === DEMO_NUTZER.benutzer && passwort === DEMO_NUTZER.passwort;
}

function abschnitte(text) {
  return text
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t, i) => ({ nr: i + 1, text: t }));
}

const FUELLWOERTER = new Set(['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'und',
  'oder', 'ist', 'sind', 'war', 'wer', 'wie', 'was', 'wann', 'wo', 'auf', 'mit', 'von', 'für', 'als', 'heißt']);

function woerter(text) {
  return (text.toLowerCase().match(/[a-zäöüß0-9]{3,}/g) || []).filter((w) => !FUELLWOERTER.has(w));
}

function antworten(frage, text) {
  const gesucht = new Set(woerter(frage));
  if (gesucht.size === 0) return { treffer: null, grund: 'Frage zu kurz' };
  let bester = null;
  for (const a of abschnitte(text)) {
    const punkte = woerter(a.text).filter((w) => gesucht.has(w)).length;
    if (punkte > 0 && (!bester || punkte > bester.punkte)) bester = { ...a, punkte };
  }
  return bester ? { treffer: bester, grund: null } : { treffer: null, grund: 'Dazu steht nichts in der Quelle' };
}

const Quellen = { anmeldungPruefen, abschnitte, antworten };
if (typeof module !== 'undefined') module.exports = Quellen;
if (typeof window !== 'undefined') window.Quellen = Quellen;
