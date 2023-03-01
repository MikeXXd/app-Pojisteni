

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
        this.aktivacniDltBtn = document.getElementById("activacni-dlt-btn");
        
        this.obsluhaUdalosti();
    }

    obsluhaUdalosti() {
        this.ulozitButton.onclick = () => {
            if (this.jmenoInput.value.length < 1) {
                alert("Zadej jméno v délce minimálně jednoho znaku");
            }
            if (this.prijmeniInput.value.length < 1) {
                alert("Zadej příjmení v délce minimálně jednoho znaku");
            }
            if (this.telefonInput.value.length < 1) {
                alert("Zadej telefonni číslo");
            }
            else {
                const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
                this.pojistenci.push(pojistenec); // na konec pole pojistenci se přidá nový objekt pojistenec
                localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci)); /* nově  */
                // this.jmenoInput.value = '';
                // this.prijmeniInput.value = '';
                // this.vekInput.value = '';
                // this.telefonInput.value = '';
                this.vypisZaznamy();
                
            
            }
        }

        this.aktivacniDltBtn.onclick = () => {
            if (this.aktivacniDltBtn.innerText === "OFF") {
                alert("Pozor, byla AKTIVOVÁNA tlačítka, mazání pojištěnců!!!");
                this.aktivacniDltBtn.innerText = "ON !";
                this.vypisZaznamy();
            } else {
                alert("Tlačítka mazání pojištěnců byla DEAKTIVOVÁNA");
                this.aktivacniDltBtn.innerText = "OFF";
                this.vypisZaznamy();
            }
        }

        this.addGlobalEventListener('click', ".myButton", e => {  /*přidá Event smazat pojištěnce na button u každého pojištěnce */
                let btn = e.target
                let index = parseInt(btn.getAttribute("data-index"));
                const pojistenecKVymazani = this.pojistenci[index] 
                if(confirm("Opravdu chceš vymazat pojištěnce " + pojistenecKVymazani.prijmeni + " " + pojistenecKVymazani.jmeno + " ?")) {
                    this.vymazZaznam(index);
                } else {
                    alert('pojištěnec NEBYL vymazán!')
                    window.location.reload();
                }
                
            }
        )
//nefukční varianta, querySelectorAll nechce vidět .myButton, a getElementsByClassNode zase nejede kvůli forEach
        // const dltBtn = document.querySelectorAll(".myButton");
        // console.log(dltBtn);
        // dltBtn.forEach(btn => {
        //     btn.addEventListener('click', () => {
        // let index = parseInt(btn.getAttribute("data-index"));
        // this.vymazZaznam(index);
        //     })
        // })
    }

    vypisZaznamy() {
        let elVypis = this.vypisPojistence;
        elVypis.innerHTML = '';
        for (let i = 0; i < this.pojistenci.length; i++) {
            let zapis = this.pojistenci[i]
            let capJmeno = zapis.jmeno.replace(zapis.jmeno[0], zapis.jmeno[0].toUpperCase()); // Velké písmeno u jména
            let capPrijmeni = zapis.prijmeni.replace(zapis.prijmeni[0], zapis.prijmeni[0].toUpperCase()); // Velké písmeno u příjmení
             elVypis.innerHTML += `<tr><td>${capJmeno} ${capPrijmeni}</td><td>${zapis.tel}</td><td>${this.ageCalculator(zapis.vek)}</td><td>${zapis.datumVstupu}</td><td><button data-index="${i}" class="myButton btn btn-outline-danger btn-sm">X</button></td></tr>`; 
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
            return age
        }}

        addGlobalEventListener(type, selector, callback) { // všeobecná funkce pro nastavení EventListeneru
            document.addEventListener(type, e => {
                if(e.target.matches(selector)) {
                    callback(e)
                }
            })
        }

        vymazZaznam(index) {
            this.pojistenci.splice(index, 1);
            localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci));
            this.vypisZaznamy();
        }
    
}
    



