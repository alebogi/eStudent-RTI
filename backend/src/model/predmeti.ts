import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Predmeti = new Schema({
    naziv: {
        type: String
    },
	tip: {
        type: String
    },
	smer: {
        type: String
    },
	semestar: {
        type: Number
    },
	godina: {
        type: Number
    },
	sifra: {
        type: String
    },
	fond: {
        type: String
    },
	espb: {
        type: Number
    },
	cilj: {
        type: String
    },
	ishod: {
        type: String
    },
	terminiPredavanja:{
        type: Array
    },
	terminiVezbe: {
        type: Array
    },
	nastavnici: {
        type: Array
    },
	labVezbe: {
        type: String
    },
	dodatno: {
        type: String
    },
    projekat: {
        type: String
    },
	predavanjaMaterijali:{
        type: Array
    }, 
	vezbeMaterijali: {
        type: Array
    }, 
	ispitPitanja: {
        type: Array
    }, 
	ispitResenja: {
        type: Array
    },
	labVezbeMaterijali: {
        type: Array
    },
	projekatMaterijali: {
        type: Array
    },
	labAktivno: {
        type: Number
    },
	projAktivno: {
        type: Number
    },
    ispitAktivno: {
        type: Number
    }
})

export default mongoose.model('Predmeti', Predmeti, 'predmeti');