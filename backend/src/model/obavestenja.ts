import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Obavestenja = new Schema({
    kategorija: {
        type: String
    },
    datum: {
        type: String
    },
	tekst: {
        type: String
    },
    naslov: {
        type: String
    },
	autor: {
        type: String
    },
	materijali: {
        type: Array
    },
    timestamp:{
        type: Number
    }
})

export default mongoose.model('Obavestenja', Obavestenja, 'obavestenja');