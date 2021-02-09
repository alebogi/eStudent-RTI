import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zaposleni = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    personal_info: {
        type: String
    },
    title: {
        type: String
    },
    office: {
        type: String
    },
    status: {
        type: String
    },
    photo: {
        type: String
    },

})

export default mongoose.model('Zaposleni', Zaposleni, 'zaposleni');