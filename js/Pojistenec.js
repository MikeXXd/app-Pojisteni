    class Pojistenec {

    constructor(jmeno, prijmeni, vek, tel) {
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.vek = vek;
        this.tel = tel;     
        this.datumVstupu = new Date().toLocaleString();
    }
}