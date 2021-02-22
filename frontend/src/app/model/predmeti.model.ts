export class Predmeti{
    naziv: string;
	tip: string;
	smer: string;
	semestar: number;
	godina: number;
	sifra: string;
	fond: string;
	espb: number;
	cilj: string;
	ishod: string;
	terminiPredavanja: Array<Object>;
	terminiVezbe:Array<Object>;
	nastavnici:Array<Object>;
	labVezbe: string;
	dodatno: string;
	projekat:string;
	predavanjaMaterijali: Array<Object>;
	vezbeMaterijali: Array<Object>;
	ispitPitanja: Array<Object>;
	ispitResenja: Array<Object>;
	labVezbeMaterijali: Array<Object>;
	projekatMaterijali: Array<Object>;
	labAktivno: number;
	projAktivno: number;
}