import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Student = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    index: {
        type: String
    },
    study_type: {
        type: String
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    status: {
        type: String
    }
})

export default mongoose.model('Student', Student, 'studenti');