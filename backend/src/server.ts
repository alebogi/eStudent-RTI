import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import student from './model/student';
import zaposleni from './model/zaposleni';
import admin from './model/admin';

const app = express();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/projekat");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija');
});

const router = express.Router();

//-------------------

// ~~~~~~~ LOGOVANJE ~~~~~~~
router.route('/loginStudent').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    student.findOne({"username":username, "password": password}, (err, student)=>{
        if(err) 
            console.log(err);
        else 
            res.json(student);
    })
});

router.route('/loginZaposleni').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    zaposleni.findOne({"username":username, "password": password}, (err, zaposleni)=>{
        if(err) 
            console.log(err);
        else 
            res.json(zaposleni);
    })
});

router.route('/loginAdmin').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    admin.findOne({"username":username, "password": password}, (err, admin)=>{
        if(err) 
            console.log(err);
        else 
            res.json(admin);
    })
});

//~~~~~ REGISTRACIJA ~~~~~~~

//-------------------

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));