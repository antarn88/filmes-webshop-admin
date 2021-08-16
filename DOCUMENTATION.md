## **1. Az alkalmazás célja**

Az alkalmazás feladata, hogy a filmes webshop termékeit megjelenítse, azokat lehessen szerkeszteni, újakat felvinni illetve törölni. Megjelenjenek a rendelések, a vásárlók, a kiszállítások és a számlák adatai. Továbbá legyen egy Admin szekció, ahol az alkalmazás adminjait lehet beállítani.

## **2. Az alkalmazás telepítése**

- Forkolni kell az adott GitHub repository tartalmát:

    https://github.com/antarn88/filmes-webshop-admin

- A célgépre le kell klónozni az adott GitHub repository tartalmát.

   `git clone https://github.com/antarn88/filmes-webshop-admin.git`

- Telepíteni kell az alkalmazás függőségeit:

    - Backend

        - A terminálon be kell lépni a /backend mappába és futtatni az `npm i` parancsot.
    
    - Frontend

        - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.  

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.
- A terminálban ki kell adni az `ng build` parancsot.
- A /frontend/dist/frontend mappa tartalmát be kell másolni a /backend/public mappába.

## **3. Az alkalmazás konfigurálása**

A _/frontend/src/app/service/base.service.ts_ állományban be kell állítani az API végpont elérési útvonalát az **apiUrl** változó konfigurálásával.

Továbbá a _/frontend/src/app/service/auth.service.ts_ állományban be kell állítani a login és logout elérési útvonalát a **loginUrl** és **logoutUrl** változók konfigurálásával.

## **4. Az alkalmazás indítása**

A megadott Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A /backend mappába belépve a terminálban ki kell adni az `npm start` parancsot.  
(Ha szükséges, a /frontend mappába belépve a terminálban az `npm start` paranccsal indítható a frontend.) 

_Megjegyzés_:  
A belépéshez egy érvényes e-mail-cím és jelszó páros (példa):  

E-mail | Jelszó
------------ | -------------
rendszergazda@kft.hu | admin

## **5. A végpontok dokumentációja**

Swagger 
- Az alábbi URL-t kell beírni a böngészőbe: http://localhost:3000/api/api-docs

---
---

## **Linkek:**  

- [A User Story (adminisztrátori szerepkör) itt érhető el.](https://github.com/antarn88/filmes-webshop-admin/blob/main/README.md)

- [A filmcímek és filmborítók eredeti helye itt érhető el.](https://www.mafab.hu/user/310327/ertekelesek)
