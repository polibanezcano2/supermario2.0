# 02. Model del joc

## Components principals

El joc esta organitzat en diferents blocs logics dins de `src/script.js`.

## Entitats principals

### Player

Representa el personatge controlat pel jugador.

Atributs principals:

- `x`, `y`: posicio.
- `width`, `height`: mida.
- `vx`, `vy`: velocitat.
- `speed`: velocitat horitzontal.
- `jumpForce`: força del salt curt.
- `poweredJumpForce`: força del salt quan el jugador te bolet.
- `jumpHoldFrames`: temps extra per al salt alt.
- `onGround`: indica si toca el terra.
- `powered`: indica si ha agafat bolet.
- `invincibleTimer`: temps restant d'invencibilitat.

Responsabilitat:

Controlar moviment, salt, col.lisions i estat del jugador.

### Platform

Representa elements solids del nivell.

Tipus:

- `ground`: terra.
- `brick`: bloc normal.
- `question`: bloc sorpresa.
- `pipe`: canonada.
- `step`: escala.

Responsabilitat:

Servir de superficie o obstacle en les col.lisions.

### Enemy

Representa un goomba.

Atributs principals:

- Posicio i mida.
- Velocitat horitzontal.
- Rang de moviment.
- Estat `alive`.
- Posicio inicial per reapareixer quan el jugador perd una vida.

Responsabilitat:

Patrullar, rebotar contra obstacles i interactuar amb el jugador.

### Item

Representa objectes que surten dels blocs sorpresa.

Tipus:

- `mushroom`: fa mes gran el jugador.
- `star`: dona invencibilitat temporal.

### Coin

Representa monedes recollibles del nivell.

Responsabilitat:

Sumar punts i augmentar el comptador de monedes.

### EndingSequence

Controla l'escena final.

Fases:

- `idle`: no ha començat.
- `slide`: Mario baixa per la bandera.
- `walk`: Mario camina cap al castell.
- `cristian`: Cristian surt del castell i parla.

## Bucle principal

El joc segueix aquest cicle:

1. Llegir l'estat de les tecles.
2. Actualitzar el jugador.
3. Actualitzar monedes, objectes, enemics i efectes.
4. Actualitzar la camera.
5. Dibuixar el nivell i tots els elements.
6. Repetir amb `requestAnimationFrame`.

## Condicions de derrota

El jugador perd una vida si:

- Cau per un forat.
- Toca lateralment un goomba sense estrella.

Quan perd una vida, es reinicien:

- Posicio del jugador.
- Goombas.
- Blocs sorpresa.
- Objectes i efectes temporals.

## Condicio de victoria

Quan el jugador arriba a la bandera, comença l'escena final. El joc no acaba de cop: el personatge baixa per la bandera, va al castell, Cristian surt i diu que Mario esta aprovat.
