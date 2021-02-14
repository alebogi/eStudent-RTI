import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import student from './model/student';
import zaposleni from './model/zaposleni';
import admin from './model/admin';
import obavestenja from './model/obavestenja';

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

router.route('/registracijaStudent').post((req, res)=>{
    let username = req.body.username;
    student.find({"username":username}, (err, stud)=>{
        if(stud.length == 0){
            //ne postoji niko sa tim username-om i mozemo da napravimo novog korisnika
            let novi = new student(req.body);
            novi.save().then(user=>{
                    res.status(200).json({'user':'ok', 'greska': ""});
                }).catch(err=>{
                    res.status(400).json({'user':'no', 'greska': ""});
                })            
        } else{
            res.json({'user':'no', "greska":"Korisnicko ime vec postoji."});
        }
    });

});

router.route('/registracijaZaposleni').post((req, res)=>{
    let username = req.body.username;
    zaposleni.find({"username":username}, (err, zaposl)=>{
        if(zaposl.length == 0){
            //ne postoji niko sa tim username-om i mozemo da napravimo novog korisnika
            let novi = new zaposleni(req.body);
            novi.save().
                then(user=>{
                    res.status(200).json({'user':'ok', 'greska': ""});
                }).catch(err=>{
                    res.status(400).json({'user':'no', 'greska': ""});
                })            
        } else{
            res.json({'user':'no',"greska":"Korisnicko ime vec postoji."});
        }
    });

});

//~~~~~~ PROMENA LOZINKE ~~~~~~~~

router.route('/dohvatiLozinkuStudent').post((req, res)=>{
    let username = req.body.username;

    student.findOne({"username":username}, (err, stud)=>{
        if(err) console.log(err);
        else res.json(stud);
    })
})

router.route('/dohvatiLozinkuZaposleni').post((req, res)=>{
    let username = req.body.username;

    zaposleni.findOne({"username":username}, (err, zap)=>{
        if(err) console.log(err);
        else res.json(zap);
    })
})

router.route('/dohvatiLozinkuAdmin').post((req, res)=>{
    let username = req.body.username;

    admin.findOne({"username":username}, (err, adm)=>{
        if(err) console.log(err);
        else res.json(adm);
    })
})

router.route('/promenaLozinkeStudent').post((req, res)=>{
    let username = req.body.username;
    student.collection.updateOne({'username':username}, { $set: {
                                                                    "password" : req.body.password,
                                                                    "pass_changed" : 1
                                                                }
                                                        });  
    res.json({"mssg":"ok"})
});

router.route('/promenaLozinkeZaposleni').post((req, res)=>{
    let username = req.body.username;
    zaposleni.collection.updateOne({'username':username}, { $set: {
                                                                    "password" : req.body.password,
                                                                    "pass_changed" : 1
                                                                }
                                                        });  
    res.json({"mssg":"ok"})
});

router.route('/promenaLozinkeAdmin').post((req, res)=>{
    let username = req.body.username;
    admin.collection.updateOne({'username':username}, { $set: {
                                                                    "password" : req.body.password,
                                                                    "pass_changed" : 1
                                                                }
                                                        });  
     res.json({"mssg":"ok"})
});

//~~~~~~~ Dohvatanje zaposlenih  ~~~~~~~~~~~

router.route('/dohvatiSveZaposlene').get((req, res)=>{
    zaposleni.find({}, (err, zaposl)=>{
        if(err) console.log(err);
        else res.json(zaposl);
    })
})

//~~~~~~ OBAVESTENJA ~~~~~~

router.route('/dohvatiObavestenja').get((req, res)=>{
    obavestenja.find({}, (err, obav)=>{
        if(err) console.log(err);
        else res.json(obav);
    })
})

//-------------------

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));