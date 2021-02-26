import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Materijal = new Schema({
    sifraPredmeta: {
        type: String
    },
    nazivFajla: {
        type: String
    },
	postavio: {
        type: String
    },
    velicina: {
        type: String
    },
	tip: {
        type: String
    },
	datumPostavljanja: {
        type: String
    },
    kategorija: {
        type: String
    },
    postavioImePrezime: {
        type: String
    },
    naslovObavestenja: {
        type: String
    }
})

export default mongoose.model('Materijal', Materijal, 'materijali');