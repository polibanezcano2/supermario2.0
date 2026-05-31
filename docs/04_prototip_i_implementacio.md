# 04. Prototip i implementacio

## Primer prototip

El primer prototip consistia en una pantalla Canvas amb un jugador, terra, plataformes i enemics basics. La prioritat inicial era aconseguir que el moviment i les col.lisions funcionessin.

## Evolucio del projecte

Durant el desenvolupament es van afegir progressivament:

- Nivell amb desplacament lateral.
- Goombas que patrullen.
- Col.lisions amb terra, blocs i canonades.
- Sistema de vides.
- Sistema de punts.
- Blocs sorpresa.
- Objectes tipus Mario: moneda, bolet i estrella.
- Monedes al mapa.
- Salt curt i salt alt.
- Nivell ampliat.
- Castell final.
- Escena final amb Cristian.

## Implementacio del salt

El salt es va separar en dos comportaments:

- Toc rapid: salt curt.
- Tecla mantinguda: salt mes alt.

Aixo es fa amb `jumpHoldFrames`, que aplica una ajuda extra mentre la tecla de salt continua premuda.

## Implementacio dels blocs sorpresa

Els blocs de tipus `question` tenen un contingut:

- `coin`
- `mushroom`
- `star`

Quan el jugador els colpeja des de baix, el bloc queda utilitzat, fa una petita animacio i genera l'objecte corresponent.

## Implementacio dels goombas

Els goombas tenen una posicio inicial i un rang de moviment. També detecten col.lisions amb canonades, blocs i escales, de manera que no travessen obstacles.

Quan el jugador perd una vida, els goombas tornen a la seva posicio inicial i reapareixen vius.

## Implementacio del final

El final no mostra una pantalla directament. S'ha implementat una sequencia:

1. El jugador arriba a la bandera.
2. Mario baixa per la bandera.
3. Mario camina fins al castell.
4. Cristian surt del castell.
5. Apareix el missatge: "Mario, estas aprovat."

## Decisions visuals

Els grafics es dibuixen amb formes simples de Canvas i CSS. Aixo permet mantenir el projecte lleuger i facil d'entendre.
