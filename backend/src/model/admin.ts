import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Admin = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
	pass_changed: {
        type: Number
    }
})

export default mongoose.model('Admin', Admin, 'admini');