    class Pojistenec {

    constructor(jmeno, prijmeni, vek, tel, date = new Date().toLocaleString()) {
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.vek = vek;
        this.tel = tel;     
        this.datumVstupu = date;
    }
}