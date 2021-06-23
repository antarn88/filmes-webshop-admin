# **User Story - Adminisztrátori szerepkör**

## **Filmes webshop admin felület**

---
---

## _**1. Bejelentkezési felület**_
---

**1. agilis felhasználói történet:**
> _A bejelentkezési felület egy űrlap, ahol megfelelő azonosítás után megnyílik a főoldal._

**Elfogadási kritérium:**  

Egy űrlap, ahol beírható a felhasználónév és jelszó páros, ezt követően pedig be lehet lépni, amennyiben megfelelő volt az azonosítás. Hiba esetén hibaüzenet jelenik meg.

---
---

## _**2. Főoldal**_
---

**1. agilis felhasználói történet:**
> _A főoldal egy üdvözlő képernyő, ahol minden fontos dolog látható, különböző statisztikai adatok megjelennek ezen az oldalon._

**Elfogadási kritérium:**  

Egy mobiloptimalizált, látványos felületen megjelennek a fő tartalmak, ahol látható a navigáció, láthatóak a legfontosabb információk, különböző statisztikai adatok.

---
---

## _**3. Filmes adatbázis**_
---

**1. agilis felhasználói történet:**
> _Egy helyen áttekinthetők és szerkeszthetők a nyilvántartott filmek, azok különböző 
> kategóriái, paraméterei, legfontosabb adatai
> egy látványos, képes weboldalon._


**Elfogadási kritérium:**  
Az oldalra navigálva megjelenik az összes film adata egy helyen.  
Ezek az adatok az azonosító, a név, a különböző nyilvántartási adatok (készleten lévő darabszám, ár, kategória, megjelenés éve stb.), illetve egy kép.

**Megjegyzések:**

1# szcenárió | 2# szcenárió
------------ | -------------
A Filmek gombra való kattintással megjelenik az összes film adata lista formátumban egy helyen. | A Filmek gombra való kattintással megjelenik az összes film adata kártyás/rácsos formátumban egy helyen. 

Mindkét szcenárió megvalósítása esetén a kártyás nézetben a Listanézet gombra való kattintással a listanézetre lehet navigálni.

---

**2. agilis felhasználói történet:**

> _Új film adatai vehetőek fel._

**Elfogadási kritérium:**  
- A kötelező adatok megadásával egy új film adatait lehet felvinni, a módosítás megjelenik a listázó oldalon, létrejön a film adatlapja.
- Az oldalon lehetőség van arra, hogy az összes filmet listázó oldalra navigáljon vissza az alkalmazás.

---

**3. agilis felhasználói történet:**

> _A film adatai szerkeszthetők._

**Elfogadási kritérium:**  
- A filmre kattintva a választott film adatait lehet szerkeszteni, a módosítás megjelenik a listázó oldalon és a film adatlapján is.
- Az oldalon lehetőség van arra, hogy az összes filmet listázó oldalra navigáljon vissza az alkalmazás.

---

**4. agilis felhasználói történet:**

> _A film törölhető._

**Elfogadási kritérium:**  
- A film kiválasztásával törölhető a rekord.
- A törlést követően frissül a listaoldal, ahol a már törölt film nem látható.

---

**5. agilis felhasználói történet:**

> _A filmek kategóriák szerint listázhatók._

**Elfogadási kritérium:**  
A kategória kiválasztásával frissül a listaoldal, ahol csak a szűrt adatok láthatók.

---

**6. agilis felhasználói történet:**

> _Bármilyen kulcsszóra lehet keresni egy választott kategórián belül._

**Elfogadási kritérium:**  
A kategória kiválasztásával és a kulcsszónak megfelelően frissül a listaoldal, ahol csak a szűrt adatok láthatók.

---

**7. agilis felhasználói történet:**

> _Különbözőképpen sorrendbe rendezhetőek a filmek egyes kategóriái._

**Elfogadási kritérium:**  
- A szám típusú adatok alapján növekvő és csökkenő sorrendben lehet rendezni a filmeket.
- A szöveges adatok alapján abc-szerinti és fordított sorrendben lehet rendezni a filmeket.

---
---

## _A projekt egyéb adatai:_

**Prioritás:**  
magas

**Megvalósítás időtartama:**  
10 hét

**További fejlesztési lehetőségek:**  
- Az egyes aloldalakon statisztikák, kimutatások készítése a legfontosabb adatokból.
