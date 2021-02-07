import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  slideNum: number = 0;

  constructor() {
    this.slideNum = 0;
   }

  ngOnInit(): void {
    this.slideNum = 0;
    setInterval(this.incSlideNum, 3000);
  }

  
   

   incSlideNum(){
     var str = "";
     
     if(this.slideNum == undefined){
      this.slideNum = 0;
     }

     if(this.slideNum == 0){
      this.slideNum = 1;
    }else if (this.slideNum == 1){
      this.slideNum = 2;
    }else if (this.slideNum == 2){
      this.slideNum = 0;
    }
    if(this.slideNum == 0){
      str = "<img class='mySlides'" + ' src="../../assets/images/slide0.jpg"> ' ;
    }else if (this.slideNum == 1){
      str = "<img class='mySlides'" + ' src="../../assets/images/slide1.jpg" >' ;
    }else if (this.slideNum == 2){
      str = "<img class='mySlides'" + ' src="../../assets/images/slide2.jpg"> ';
    }
    //str = "<img class='mySlides'" + 'src="'+ "{{" + "'../../assets/images/slide'+ slideNum +" + "'.jpg'}}" + '"' +">";
    document.getElementById("slide").innerHTML = str;

   }
}


