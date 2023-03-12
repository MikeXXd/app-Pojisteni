

class Kartoteka {

    constructor() {
        const zaznamyZeStorage = localStorage.getItem("pojistenci"); // stahování záznamů, pokud záznamy neexistují, bude mít proměnná hodnotu null
        this.pojistenci = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : []; /* ternálním operátorem vybereme záznamy, pokud žádné  v lS nejsou = null, načte se prázdné pole */

        this.statusMazani = false;
        this.indexPosladniSerazenySpoupec = null; // k řazení vzestupně/sestupně ve funkci seradSloupec()
        this.jmenoInput = document.getElementById("input-jmeno");
        this.prijmeniInput = document.getElementById("input-prijmeni");
        this.vekInput = document.getElementById("input-vek");
        this.telefonInput = document.getElementById("input-tel");
        this.ulozitButton = document.getElementById("button-ulozit");
        this.vypisPojistence = document.getElementById("pojistenci-seznam");
        this.aktivacniDltBtn = document.getElementById("activacni-dlt-btn"); // button pro aktivaci mazacích tlačítek u pojištěnců
        this.razeniJmenaBtn = document.getElementById("razeni-jmena-btn");
        this.razeniPrijmeniBtn = document.getElementById("razeni-prijmeni-btn");
        this.razeniVekBtn = document.getElementById("razeni-vek-btn");
        this.razeniDatumVstupuBtn = document.getElementById("razeni-datum-vstupu-btn");
        
        this.obsluhaUdalosti();
    }

    obsluhaUdalosti() { /* START obsluha udalosti---------------------------- */
        this.ulozitButton.onclick = () => {
            if (this.jmenoInput.value.length < 1) {
                alert("Zadej jméno v délce minimálně jednoho znaku");
            }
            if (this.prijmeniInput.value.length < 1) {
                alert("Zadej příjmení v délce minimálně jednoho znaku");
            }
            if (this.telefonInput.value.length < 1) {
                alert("Zadej telefonni číslo");
            } else {
                const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
                this.pojistenci.push(pojistenec); // na konec pole pojistenci se přidá nový objekt pojistenec
                localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci)); /* nově  */
                this.vypisZaznamy();
                
            
            }
        }

        this.aktivacniDltBtn.onclick = () => {
            if (this.aktivacniDltBtn.innerText === "OFF") {
                alert("Pozor, byla AKTIVOVÁNA tlačítka, mazání pojištěnců!!!");
                this.aktivacniDltBtn.innerText = "ON";
                this.aktivacniDltBtn.classList = "btn btn-outline-danger dltBtnActive"
                this.statusMazani = true;
                this.vypisZaznamy();
            } else {
                this.aktivacniDltBtn.innerText = "OFF";
                this.aktivacniDltBtn.classList = "btn btn-outline-secondary"
                this.statusMazani = false;
                this.vypisZaznamy();
            }
        }

        this.addGlobalEventListener('click', ".dltPojistenceBtn", e => {  /*přidá Event smazat pojištěnce na button u každého pojištěnce */
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
        this.razeniJmenaBtn.onclick = () => {
            this.seradSloupec("jmeno");   
        }
        this.razeniPrijmeniBtn.onclick = () => {
            this.seradSloupec("prijmeni");   
        }
        this.razeniVekBtn.onclick = () => {
            this.seradSloupec("vek");   
        }
        this.razeniDatumVstupuBtn.onclick = () => {
            this.seradSloupec("datumVstupu");   
        }

        
    } /* KONEC obsluha udalosti------------------------------------------- */

    seradSloupec(sloupec) {
        let x = 1
        let y = -1
        if (this.indexPosladniSerazenySpoupec == sloupec){
            x = -1
            y = 1
            this.indexPosladniSerazenySpoupec = null;
        } else {
            this.indexPosladniSerazenySpoupec = sloupec
        }
        this.pojistenci.sort((b, a) => { 
                const nameA = a[sloupec].toUpperCase(); // ignore upper and lowercase
                const nameB = b[sloupec].toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return x;
                }
                if (nameA > nameB) {
                  return y;
                }
                // names must be equal
                return 0;
        });
        this.vypisZaznamy();
    }

    vypisZaznamy() {
        let elVypis = this.vypisPojistence;
        elVypis.innerHTML = '';
        for (let i = 0; i < this.pojistenci.length; i++) {
            let zapis = this.pojistenci[i]
            let capJmeno = zapis.jmeno.replace(zapis.jmeno[0], zapis.jmeno[0].toUpperCase()); // Velké písmeno u jména
            let capPrijmeni = zapis.prijmeni.replace(zapis.prijmeni[0], zapis.prijmeni[0].toUpperCase()); // Velké písmeno u příjmení
            elVypis.innerHTML += `<tr><td>${capPrijmeni} ${capJmeno}</td><td>${zapis.tel}</td><td>${this.ageCalculator(zapis.vek)}</td><td>${zapis.datumVstupu}</td><td><button data-index="${i}" ${this.aktivaceButtonuMazaniUPojistencu()}>X</button></td></tr>`; 
        }

    }

    ageCalculator(datumNar) {
        let userinput = datumNar;
        let datNar = new Date(userinput);
        if(userinput == null || userinput == '') {
          return "nezadán!"; 
        } else {
            let mesiceRozdil = Date.now() - datNar.getTime(); //výpočet rozdílů času v milisekundach
            // console.log("Date.now: " + Date.now() + " - datNar.getTime: " + datNar.getTime() + " = mesiceRozdil: " +  mesiceRozdil);
            let age_dt = new Date(mesiceRozdil); //formatování datumu
            // console.log(age_dt);
            let year = age_dt.getUTCFullYear();//extrakce roku
            // console.log(year);
            let age = Math.abs(year - 1970);//dopočet věku - zrozeni křemíku :-)
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

    aktivaceButtonuMazaniUPojistencu() { 
        if (!this.statusMazani) {
             return "class='dltPojistenceBtn btn btn-outline-secondary btn-sm' disabled role='button' aria-disabled='true'"
        } else {
            return "class='dltPojistenceBtn btn btn-outline-danger btn-sm dltBtnActive' role='button' aria-disabled='false'"
        }
    }
}
    



