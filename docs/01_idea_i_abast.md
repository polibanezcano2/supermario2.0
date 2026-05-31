# 01. Idea i abast

## Idea principal

SuperMario 2.0 es un microvideojoc de plataformes 2D inspirat en els nivells classics de Mario. El jugador ha d'avancar d'esquerra a dreta, superar obstacles, evitar enemics, recollir objectes i arribar al castell final.

## Objectiu

Crear un joc complet, jugable de principi a fi, amb una estructura simple pero clara. El projecte havia de demostrar moviment, col.lisions, interaccio, puntuacio, condicions de derrota i una escena final.

## Abast funcional

El joc inclou:

- Un nivell lateral ampliat amb diferents zones.
- Plataformes, forats, canonades, blocs, escales i castell.
- Personatge controlable amb salt curt i salt alt.
- Enemics tipus goomba.
- Blocs sorpresa amb objectes.
- Monedes recollibles.
- Sistema de vides, punts i monedes.
- Power-ups: bolet i estrella.
- Escena final: bandera, cami cap al castell i aparicio de Cristian.

## Decisions de disseny

Es va decidir fer el joc amb Canvas per tenir control complet del dibuix i de la logica del bucle de joc. Els grafics son formes pixel art fetes amb codi, sense dependre d'imatges externes. Aixo facilita entendre el projecte i modificar-lo.

També es va decidir mantenir una sola pantalla HTML i separar la logica principal a `src/script.js` i els estils a `src/style.css`.

## Limitacions

- El projecte te un sol nivell.
- No hi ha editor de nivells.
- No hi ha musica ni efectes de so.
- Les animacions son simples i fetes manualment.
- No hi ha guardat de partida.
