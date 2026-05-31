# SuperMario 2.0

Autor: Pol Ibanez  
Repositori: https://github.com/polibanezcano2/supermario2.0  
Gameplay: pendent d'afegir l'enllac de Drive, YouTube o similar

## Presentacio

SuperMario 2.0 es un videojoc de plataformes 2D fet amb HTML5 Canvas, JavaScript i CSS. El jugador controla un personatge inspirat en els jocs classics de plataformes i ha d'avancar pel nivell, esquivar o eliminar goombas, recollir monedes, activar blocs sorpresa i arribar al castell final.

Quan el jugador arriba a la bandera, s'activa una escena final: el personatge baixa per la bandera, camina cap al castell, surt Cristian i li diu a Mario que esta aprovat.

## Objectiu del joc

Arribar fins al final del nivell sense perdre totes les vides. Durant el recorregut el jugador pot sumar punts recollint monedes, colpejant blocs sorpresa, agafant power-ups i eliminant enemics.

## Controls

- `A` o fletxa esquerra: moure a l'esquerra.
- `D` o fletxa dreta: moure a la dreta.
- `Espai`, fletxa amunt o `W`: saltar.
- Tocar rapidament `Espai`: salt curt.
- Mantenir `Espai`: salt alt.

## Mecaniques principals

- Desplacament lateral amb camera.
- Gravetat, salt curt i salt alt.
- Col.lisions amb terra, blocs, canonades i escales.
- Goombas que patrullen i reboten contra obstacles.
- Blocs sorpresa amb monedes, bolet i estrella.
- Monedes recollibles pel mapa.
- Power-up de bolet per fer el jugador mes gran.
- Power-up d'estrella amb invencibilitat temporal.
- Sistema de vides, punts i monedes.
- Reinici de jugador, enemics i blocs quan es perd una vida.
- Escena final amb bandera, castell i Cristian.

## Tecnologies utilitzades

- HTML5
- CSS3
- JavaScript
- HTML5 Canvas
- Git i GitHub

## Execucio

Opcio rapida:

1. Clonar o descarregar el repositori.
2. Obrir `index.html` en un navegador modern.

Opcio amb servidor local:

```bash
python -m http.server 8765
```

Despres obrir:

```text
http://127.0.0.1:8765/
```

## Estructura del repositori

```text
.
|-- README.md
|-- index.html
|-- src/
|   |-- script.js
|   `-- style.css
|-- docs/
|   |-- 01_idea_i_abast.md
|   |-- 02_model_del_joc.md
|   |-- 03_entorn_i_execucio.md
|   |-- 04_prototip_i_implementacio.md
|   |-- 05_millores_i_incidencies.md
|   |-- 06_reflexio_final.md
|   |-- IA_log.md
|   `-- guio_video_gameplay.md
|-- diagrames/
|   |-- diagrama_classes.md
|   `-- diagrama_comportament.md
|-- evidencies/
|   |-- README.md
|   `-- captures.md
`-- tests/
    `-- proves_manuals.md
```

## Documentacio

- [Idea i abast](docs/01_idea_i_abast.md)
- [Model del joc](docs/02_model_del_joc.md)
- [Entorn i execucio](docs/03_entorn_i_execucio.md)
- [Prototip i implementacio](docs/04_prototip_i_implementacio.md)
- [Millores i incidencies](docs/05_millores_i_incidencies.md)
- [Reflexio final](docs/06_reflexio_final.md)
- [Registre d'us de la IA](docs/IA_log.md)
- [Guio del video de gameplay](docs/guio_video_gameplay.md)

## Diagramas

- [Diagrama de classes](diagrames/diagrama_classes.md)
- [Diagrama de comportament](diagrames/diagrama_comportament.md)

## Proves i evidencies

- [Proves manuals](tests/proves_manuals.md)
- [Evidencies](evidencies/README.md)
- [Captures planificades](evidencies/captures.md)

## Estat del projecte

Projecte jugable de principi a fi. Queda pendent afegir al README l'enllac definitiu del video de gameplay quan estigui pujat a Drive, YouTube o similar.
