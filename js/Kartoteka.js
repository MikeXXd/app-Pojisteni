

class Kartoteka {

    constructor() {
        this.pojistenci = [];

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
            this.pojistenci.push(pojistenec);
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