# Proves manuals

## Objectiu

Comprovar que el joc es pot jugar de principi a fi i que les mecaniques principals funcionen.

## Proves realitzades

| ID | Prova | Passos | Resultat esperat | Estat |
| --- | --- | --- | --- | --- |
| P01 | Carrega del joc | Obrir `index.html` | Es veu el joc, HUD i controls | OK |
| P02 | Moviment dreta/esquerra | Premre `A`, `D` o fletxes | El jugador es mou correctament | OK |
| P03 | Salt curt | Tocar rapidament `Espai` | El jugador fa un salt normal | OK |
| P04 | Salt alt | Mantenir `Espai` | El jugador salta mes alt | OK |
| P05 | Col.lisio amb terra | Caminar i saltar sobre plataformes | El jugador no travessa el terra | OK |
| P06 | Bloc sorpresa | Colpejar un bloc `?` des de baix | Surt moneda, bolet o estrella | OK |
| P07 | Monedes | Tocar una moneda | Augmenta el comptador de monedes i punts | OK |
| P08 | Goomba eliminat | Saltar sobre un goomba | El goomba desapareix i suma punts | OK |
| P09 | Dany per goomba | Tocar un goomba lateralment | Es perd una vida | OK |
| P10 | Reinici en perdre vida | Morir despres de gastar blocs o matar goombas | Reapareixen goombas i blocs `?` | OK |
| P11 | Estrella | Agafar estrella i tocar enemic | El jugador elimina enemics sense perdre vida | OK |
| P12 | Final | Arribar a la bandera | Mario baixa, va al castell i surt Cristian | OK |

## Comprovacio tecnica

```bash
node --check src/script.js
```

Resultat: sense errors de sintaxi.

## Observacions

Les proves son manuals perque el joc depen d'interaccio en temps real amb Canvas. S'han comprovat les mecaniques principals durant el desenvolupament amb el navegador.
