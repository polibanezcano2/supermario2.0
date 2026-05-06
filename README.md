# 🎮 SuperMario 2.0

JavaScript · HTML5 Canvas · CSS3

▌Què és?

SuperMario 2.0 és un videojoc de plataformes 2D amb desplaçament lateral inspirat en els clàssics del gènere.

El jugador ha d’arribar a la bandera final evitant enemics i obstacles dins d’un temps limitat.

Aquest projecte està enfocat a implementar les mecàniques bàsiques d’un joc de plataformes amb un disseny simple i funcional.

---

▌Objectiu

Arribar a la bandera final abans que s’acabi el temps i sense perdre totes les vides.

---

▌Control del jugador

- Moviment esquerra / dreta  
- Salt (només des del terra)  

---

▌Mecàniques principals

- Moviment horitzontal  
- Salt amb gravetat  
- Col·lisions amb plataformes (AABB)  
- Sistema de vides (3)  
- Temporitzador (180 segons)  
- Sistema de punts (+100 per enemic)  

---

▌Sistema d’enemics

- Moviment lineal simple  
- Sense IA avançada  

Interacció:
- Contacte lateral → perdre vida  
- Salt des de dalt → eliminar enemic  

---

▌Condicions del joc

Derrota:
- Vides = 0  
- Temps = 0  

Victòria:
- Arribar a la bandera  

---

▌Bucle del joc

Input → Update → Physics → Collisions → Render → Repeat

---

▌Limitacions

- 1 nivell  
- Sense animacions complexes  
- Sense sistema de guardat  
- Sense IA avançada  
- Sense power-ups  

---

▌Tecnologies

- JavaScript  
- HTML5 Canvas  
- CSS3  

---

▌Execució

Obrir `index.html` en un navegador.

---

▌Estat del projecte

🟡 En desenvolupament

---

▌Autor

Pol
GitHub: https://github.com/polibanezcano2
