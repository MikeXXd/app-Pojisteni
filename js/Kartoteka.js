

class Kartoteka {

    constructor() {
        const zaznamyZeStorage = localStorage.getItem("pojistenci"); // stahování záznamů, pokud záznamy neexistují, bude mít proměnná hodnotu null
        this.pojistenci = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : []; /* ternálním operátorem vybereme záznamy, pokud žádné  v lS nejsou = null, načte se prázdné pole */

        this.jmenoInput = document.getElementById("input-jmeno");
        this.prijmeniInput = document.getElementById("input-prijmeni");
        this.vekInput = document.getElementById("input-vek");
        this.telefonInput = document.getElementById("input-tel");
        this.ulozitButton = document.getElementById("button-ulozit");
        this.vypisPojistence = document.getElementById("pojistenci-seznam");

        this.obsluhaUdalosti();
    }

    obsluhaUdalosti() {
        this.ulozitButton.onclick = () => {
            const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
            this.pojistenci.push(pojistenec); // na konec pole pojistenci se přidá nový objekt pojistenec
            localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci)); /* nově  */
            this.vypisZaznamy();
        };
    }

    vypisZaznamy() {
        const tr = document.createElement("tr");
        this.vypisPojistence.appendChild(tr);
        tr.innerHTML = ""
        for (let i = 0; i < this.pojistenci.length; i++) {
            let zapis = this.pojistenci[i];  
            tr.innerHTML = `<td>${zapis.jmeno} ${zapis.prijmeni}</td><td>${zapis.tel}</td><td>${zapis.vek}</td>`;  
        }
    }

}