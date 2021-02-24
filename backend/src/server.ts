import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import student from './model/student';
import zaposleni from './model/zaposleni';
import admin from './model/admin';
import obavestenja from './model/obavestenja';
import predmeti from './model/predmeti';

const app = express();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/projekat");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija');
});

const router = express.Router();

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage }).single('file');
 
app.post('/uploadPhoto', (req, res) => {
      upload(req, res, (err) => {
        
        if (err) {
            console.log(err);
        }
        console.log("Uspesan upload slike");
        res.status(200).json({"ret":"ok"});
    });
  });

app.post('/uploadFile', (req, res) => {
upload(req, res, (err) => {
    
    if (err) {
        console.log(err);
    }
    console.log("Uspesan upload fajla");
    res.status(200).json({"ret":"ok"});
});
});

 const path = require("path");  
// console.log(path)
// app.use("/uploads", express.static(path.join("backend/uploads"))); 
//app.use(express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, 'public')));  
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
    let username = req.body.zaposleni.username;
    zaposleni.find({"username":username}, (err, zaposl)=>{
        if(zaposl.length == 0){
            //ne postoji niko sa tim username-om i mozemo da napravimo novog korisnika
            let novi = new zaposleni(req.body.zaposleni);

            //upload slike
           

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

//~~~~~~~ DOHVATANJE ZAPOSLENIH  ~~~~~~~~~~~

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


router.route('/dohvObavestenjaKategorija').get((req, res)=>{
    var kat = req.body.kategorija;
    console.log("kkkk")
    obavestenja.find({"kategorija":kat}, (err, obav)=>{
        if(err) {
            console.log(err);
            console.log("GOVNOOOOOOOOOOOOOOOOOOOOOOO")
        }else res.json(obav);
    })
})
//-------------------
// ~~~ PREDMETI ~~~

router.route('/dohvatiPredmeteSI').get((req, res)=>{
    predmeti.find({"smer":"si"}, (err, pr)=>{
        if(err) console.log(err);
        else res.json(pr);
    })
})

router.route('/dohvatiPredmeteRTI').get((req, res)=>{
    predmeti.find({"smer":"rti"}, (err, pr)=>{
        if(err) console.log(err);
        else res.json(pr);
    })
})


router.route('/dohvatiPredmeteOstalo').get((req, res)=>{
    predmeti.find({"smer":"ostalo"}, (err, pr)=>{
        if(err) console.log(err);
        else res.json(pr);
    })
})

router.route('/dohvatiPredmeteMaster').get((req, res)=>{
    predmeti.find({"smer":"master"}, (err, pr)=>{
        if(err) console.log(err);
        else res.json(pr);
    })
})



router.route('/dohvatiPredmetInfo').post((req, res)=>{
    let sifra = req.body.sifra;

    predmeti.findOne({"sifra": sifra}, (err, pr)=>{
        if(err) 
            console.log(err);
        else 
            res.json(pr);
    })
});

//-------------------------
//~~~~ PROFIL ZAPOSLENOG ~~~~

router.route('/dohvatiZaposlenog').post((req, res)=>{
    let username = req.body.username;

    zaposleni.findOne({"username":username}, (err, zaposleni)=>{
        if(err) 
            console.log(err);
        else 
            res.json(zaposleni);
    })
});


router.route('/dohvatiImePrezimeNastavnika').post((req, res)=>{
    let username = req.body.username;

    zaposleni.findOne({"username":username}, (err, zap)=>{
        if(err) console.log(err);
        else res.json(zap);
    })
})


//~~~~~~~ IZMENA STUDENATA  ~~~~~~~~~~~

router.route('/dohvatiSveStudente').get((req, res)=>{
    student.find({}, (err, s)=>{
        if(err) console.log(err);
        else res.json(s);
    })
});

router.route('/dohvatiStudenta').post((req, res)=>{
    let username = req.body.username;

    student.findOne({"username":username}, (err, s)=>{
        if(err) 
            console.log(err);
        else 
            res.json(s);
    })
});

router.route('/izmeniStudenta').post((req, res)=>{
    let username = req.body.username;
    
    student.collection.updateOne({'username':username}, { $set: {
                                                "username" : req.body.s.username,
                                                "password" : req.body.s.password,
                                                "pass_changed" : req.body.s.pass_changed,
                                                "index" : req.body.s.index,
                                                "study_type" : req.body.s.study_type,
                                                "name" : req.body.s.name,
                                                "lastname" : req.body.s.lastname,
                                                "status" : req.body.s.status
                                            }
    }, (r) => {
            res.json(r);
        });
      
});

router.route('/obrisiStudenta').post(
    (req, res)=>{
        let username = req.body.username;
        student.deleteOne({"username":username},(err)=>{
            res.json(err);
            if(err) console.log(err);
        });
    }
);

//~~~~~~~~ IZMENA ZAPOSLENOG ~~~~~~~~

router.route('/izmeniZaposlenog').post((req, res)=>{
    let username = req.body.username;
    
    zaposleni.collection.updateOne({'username':username}, { $set: {
                                                "username" : req.body.z.username,
                                                "password" : req.body.z.password,
                                                "pass_changed" : req.body.z.pass_changed,
                                                "name" : req.body.z.name,
                                                "lastname" : req.body.z.lastname,
                                                "address" : req.body.z.address,
                                                "phone" : req.body.z.phone,
                                                "website" : req.body.z.website,
                                                "personal_info" : req.body.z.personal_info,
                                                "title" : req.body.z.title,
                                                "office" : req.body.z.office,
                                                "status" : req.body.z.status,
                                                "photo" : req.body.z.photo
                                            }
    }, (r) => {
            res.json(r);
        });
      
});

router.route('/obrisiZaposlenog').post(
    (req, res)=>{
        let username = req.body.username;
        zaposleni.deleteOne({"username":username},(err)=>{
            res.json(err);
            if(err) console.log(err);
        });
    }
);

//~~~~~~~~ DODAVANJE PREDMETA I IZMENA PREDMETA ~~~~~~~~

router.route('/dodajPredmet').post((req, res)=>{
    let sifra = req.body.p.sifra;
    predmeti.find({"sifra":sifra}, (err, p)=>{
        if(p.length == 0){
            let novi = new predmeti(req.body.p);
            novi.save().then(user=>{
                    res.status(200).json({'p':'ok', 'greska': ""});
                }).catch(err=>{
                    res.status(400).json({'p':'no', 'greska': ""});
                })            
        } else{
            res.json({'p':'no', "greska":"Sifra vec postoji."});
        }
    });

});



router.route('/dohvatiPredmeteSVE').get((req, res)=>{
    predmeti.find({}, (err, pr)=>{
        if(err) console.log(err);
        else res.json(pr);
    })
});


router.route('/obrisiPredmet').post(
    (req, res)=>{
        let sifra = req.body.sifra;
        predmeti.deleteOne({"sifra":sifra},(err)=>{
            res.json(err);
            if(err) console.log(err);
        });
    }
);

router.route('/izmeniPredmet').post((req, res)=>{
    let sifra = req.body.sifra;
    
    predmeti.collection.updateOne({'sifra':sifra}, { $set: {
                                                    naziv: req.body.predmet.naziv,
                                                    tip: req.body.predmet.tip,
                                                    smer: req.body.predmet.smer,
                                                    semestar: req.body.predmet.semestar,
                                                    godina: req.body.predmet.godina,
                                                    sifra: req.body.predmet.sifra,
                                                    fond: req.body.predmet.fond,
                                                    espb: req.body.predmet.espb,
                                                    cilj: req.body.predmet.cilj,
                                                    ishod: req.body.predmet.ishod,
                                                    terminiPredavanja:  req.body.predmet.terminiPredavanja,
                                                    terminiVezbe: req.body.predmet.terminiVezbe,
                                                    nastavnici: req.body.predmet.nastavnici,
                                                    labVezbe: req.body.predmet.labVezbe,
                                                    dodatno: req.body.predmet.dodatno,
                                                    projekat: req.body.predmet.projekat,
                                                    predavanjaMaterijali: req.body.predmet.predavanjaMaterijali,
                                                    vezbeMaterijali: req.body.predmet.vezbeMaterijali,
                                                    ispitPitanja: req.body.predmet.ispitPitanja,
                                                    ispitResenja: req.body.predmet.ispitResenja,
                                                    labVezbeMaterijali: req.body.predmet.labVezbeMaterijali,
                                                    projekatMaterijali: req.body.predmet.projekatMaterijali,
                                                    labAktivno: req.body.predmet.labAktivno,
                                                    projAktivno: req.body.predmet.projAktivno,
                                                    ispitAktivno: req.body.predmet.ispitAktivno
                                            }
    }, (r) => {
            res.json(r);
        });
      
});


//---------------
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));