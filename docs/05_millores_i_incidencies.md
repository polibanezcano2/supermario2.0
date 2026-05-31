# 05. Millores i incidencies

## Millores implementades

- S'ha ampliat el nivell per evitar que fos massa curt.
- S'ha afegit un salt variable: curt si es prem poc i alt si es mante la tecla.
- Els blocs sorpresa generen objectes.
- Els goombas ja no travessen canonades.
- Quan el jugador perd una vida, els goombas reapareixen.
- Quan el jugador perd una vida, els blocs sorpresa es reinicien.
- S'ha afegit un HUD amb vides, punts i monedes.
- S'ha afegit escena final amb bandera, castell i Cristian.
- S'ha eliminat el goomba del final per no molestar durant l'escena final.

## Incidencies resoltes

### Goombas travessant canonades

Problema: els enemics nomes canviaven de direccio pel seu rang de moviment i podien travessar obstacles.

Solucio: es va crear una funcio de moviment horitzontal per als enemics que comprova col.lisions amb plataformes, canonades i escales.

### Blocs sorpresa no es reiniciaven

Problema: si el jugador moria, els blocs quedaven gastats.

Solucio: en perdre una vida es crida `resetQuestionBlocks()`.

### Final massa brusc

Problema: arribar al final mostrava directament una pantalla.

Solucio: es va afegir una sequencia final dins del joc amb bandera, cami, castell, sortida de Cristian i text final.

### Organitzacio del repositori

Problema: inicialment el codi estava a l'arrel i hi havia un fitxer Java buit.

Solucio: es va crear `src/`, es van moure els fitxers del joc i es va eliminar el fitxer Java innecessari.

## Millores futures

- Afegir efectes de so.
- Afegir musica.
- Afegir mes nivells.
- Afegir pantalla de pausa.
- Afegir menu inicial.
- Afegir animacions mes detallades.
