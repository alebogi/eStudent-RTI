import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Student = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
	pass_changed: {
        type: Number
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
    },
    prati: {
        type: Array
    }
})

export default mongoose.model('Student', Student, 'studenti');