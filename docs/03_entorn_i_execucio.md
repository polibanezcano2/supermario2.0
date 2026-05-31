# 03. Entorn i execucio

## Entorn de desenvolupament

El projecte s'ha desenvolupat com una aplicacio web estatica.

Eines utilitzades:

- Navegador web per executar el joc.
- HTML5 Canvas per renderitzar el nivell.
- JavaScript per la logica.
- CSS per la maquetacio i el panell visual.
- Git i GitHub per control de versions.

## Estructura tecnica

- `index.html`: punt d'entrada del joc.
- `src/script.js`: logica completa del videojoc.
- `src/style.css`: estils de la pagina i pantalles finals.
- `docs/`: documentacio del proces.
- `diagrames/`: diagrames del model i del comportament.
- `tests/`: proves manuals.
- `evidencies/`: evidencies del proces de treball.

## Execucio local

El joc es pot executar obrint directament `index.html`.

També es pot executar amb un servidor local:

```bash
python -m http.server 8765
```

URL local:

```text
http://127.0.0.1:8765/
```

## Navegadors recomanats

- Google Chrome
- Microsoft Edge
- Firefox

## Comprovacio tecnica

S'ha utilitzat la comprovacio de sintaxi de Node:

```bash
node --check src/script.js
```

Resultat esperat: cap error de sintaxi.
