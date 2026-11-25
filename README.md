# Quellen-Demo

Interne Test-Abgabe für die Testaufgaben-Pipeline von Everlast. Kein echtes Projekt.

Eine statische Seite mit Anmeldemaske. Nach der Anmeldung fügt man einen Text ein und stellt eine
Frage; die Antwort nennt den Abschnitt, aus dem sie stammt. Es gibt kein Backend, die Anmeldung
prüft nur einen festen Demo-Zugang im Browser.

- Live: https://louissbeck.github.io/quellen-demo/
- Demo-Zugang: Benutzer `demo`, Passwort `demo1234`

## Tests

```
node --test
```

Keine Abhängigkeiten, Node 20 oder neuer.

## Aufbau

- `suche.js`: Logik ohne DOM (Anmeldung, Abschnitte, Antwort)
- `index.html`: Oberfläche
- `suche.test.js`: Tests mit `node:test`
