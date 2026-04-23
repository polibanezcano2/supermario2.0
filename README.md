# 🎮 SuperMario2.0

## 📌 Descripció
Aquest projecte consisteix en el desenvolupament d’un videojoc de plataformes 2D amb desplaçament lateral. El jugador controla un personatge que ha d’avançar pel nivell, evitar enemics i obstacles i arribar a la bandera final abans que s’esgoti el temps.

---

## 🎯 Objectiu
Arribar a la bandera final sense perdre totes les vides i abans que el temps arribi a zero.

---

## 🕹️ Mecàniques del joc

- Moviment lateral (esquerra / dreta)
- Salt amb gravetat
- Enemics amb moviment simple
- Sistema de vides (3)
- Temporitzador (3 minuts)
- Sistema de punts (+100 per enemic derrotat)

---

## 📜 Regles

- Si el jugador toca un enemic → perd una vida  
- Si cau al buit → perd una vida  
- Si es queda sense vides → perd  
- Si el temps arriba a 0 → perd  
- Si arriba a la bandera → guanya  

---

## 🔁 Bucle de joc

Moure → Saltar → Esquivar → Avançar → Repetir

---

## 📊 Estats del joc

| Estat        | Descripció                          |
|-------------|------------------------------------|
| Vides       | Comença amb 3 i disminueixen       |
| Temps       | Compta enrere constant             |
| Punts       | +100 per enemic derrotat           |
| Estat       | Jugant / Guanyat / Perdut          |

---

## ⚠️ Limitacions

- 1 únic nivell
- Sense animacions complexes
- Sense sistema de guardat
- Sense sons avançats
- Sense IA complexa
- Sense power-ups

---

## 🧠 Riscos tècnics

- Col·lisions incorrectes  
- Salt poc natural  
- Detecció incorrecta de la meta  

---

## 🤖 Ús d’IA

S’ha utilitzat IA per:

- Implementar col·lisions simples
- Crear el sistema de salt amb gravetat

---

## 🛠️ Tecnologies

- JavaScript
- HTML5
- CSS3
- Visual Studio Code

---

## 📅 Pla de desenvolupament

1. Crear base del joc  
2. Moviment i salt  
3. Col·lisions amb plataformes  
4. Afegir bandera  
5. Afegir enemics  
6. Sistema de vides i temps  

---

## 🚀 Execució

1. Clonar el repositori
```bash
git clone https://github.com/usuari/nom-del-repo.git

