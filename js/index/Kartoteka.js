

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
            if (this.jmenoInput.value.length < 2) {
                alert("Prosím zadej jméno v délce minimálně 2 znaků");
            }
            if (this.prijmeniInput.value.length < 2) {
                alert("Prosím zadej príjmení v délce minimálně 2 znaků");
            }
            if (this.telefonInput.value.length < 9) {
                alert("Prosím zadej telefonni číslo v délce minimálně 9 číslic");
            }
            else {
                const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
                this.pojistenci.push(pojistenec); // na konec pole pojistenci se přidá nový objekt pojistenec
                localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci)); /* nově  */
                this.jmenoInput.value = '';
                this.prijmeniInput.value = '';
                this.vekInput.value = '';
                this.telefonInput.value = '';
                this.vypisZaznamy();
            }
        }
    }

    vypisZaznamy() {
        let elVypis = this.vypisPojistence;
        elVypis.innerHTML = '';
        for (let i = 0; i < this.pojistenci.length; i++) {
            let zapis = this.pojistenci[i]
            let capJmeno = zapis.jmeno.replace(zapis.jmeno[0], zapis.jmeno[0].toUpperCase()); // Velké písmeno u jména
            let capPrijmeni = zapis.prijmeni.replace(zapis.prijmeni[0], zapis.prijmeni[0].toUpperCase()); // Velké písmeno u příjmení
            
             elVypis.innerHTML += `<tr><td>${capJmeno} ${capPrijmeni}</td><td>${zapis.tel}</td><td>${this.ageCalculator(zapis.vek)}</td><td>${zapis.datumVstupu}</td></tr>`;  
        }
    }

    ageCalculator(datumNar) {
        let userinput = datumNar;
        let datNar = new Date(userinput);
        if(userinput == null || userinput == '') {
          return "nezadán!"; 
        } else {
            //výpočet rozdílů času v milisekundach
            let mesiceRozdil = Date.now() - datNar.getTime();
            // console.log("Date.now: " + Date.now() + " - datNar.getTime: " + datNar.getTime() + " = mesiceRozdil: " +  mesiceRozdil);
            //formatování datumu
            let age_dt = new Date(mesiceRozdil); 
            // console.log(age_dt);
            //extrakce roku 
            let year = age_dt.getUTCFullYear();
            // console.log(year);
            //dopočet věku - zrozeni křemíku :-)
            let age = Math.abs(year - 1970);
            
            //display the calculated age
            return age
        }
    }


}
    



