import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Obavestenja = new Schema({
    kategorija: {
        type: String
    },
    datum: {
        type: Date
    },
	tekst: {
        type: String
    }
})

export default mongoose.model('Obavestenja', Obavestenja, 'obavestenja');