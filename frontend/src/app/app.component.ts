import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}



export function latinicaUcirilicu(word: string){
  var a = {"A":"А", "B": "Б", "V": "В", "G": "Г", "D": "Д", "Đ": "Ђ", "E": "Е", "Ž": "Ж", "Z": "З", "I": "И", "J": "Ј", "K": "К", "L": "Л", "Lj": "Љ", "M": "М", "N": "Н", "Nj": "Њ", "O": "О", "P": "П", "R": "Р", "S": "С", "T": "Т", "Ć": "Ћ", "U": "У", "F": "Ф", "H": "Х", "C": "Ц", "Č": "Ч", "Dž": "Џ", "Š": "Ш", "a":"а", "b": "б", "v": "в", "g": "г", "d": "д", "đ": "ђ", "e": "е", "ž": "ж", "z": "з", "i": "и", "j": "ј", "k": "к", "l": "л", "lj": "љ", "m": "м", "n": "н", "nj": "њ", "o": "о", "p": "п", "r": "р", "s": "с", "t": "т", "ć": "ћ", "u": "у", "f": "ф", "h": "х", "c": "ц", "č": "ч", "dž": "џ", "š": "ш"};

 /* return word.split('').map(function (char) { 
    return a[char] || char; 
  }).join("");*/

  var prevod = "";
  for (let i = 0; i < word.length; i++){
    if (word.hasOwnProperty(i)) {
      if (a[word[i]] === undefined){
        prevod += word[i];
      } else {
        //da li je "nj", "lj", "dž"
        
        if(word[i] == "n" && word[i + 1] == "j" ){
          prevod += "њ";
          i++;
          continue;
        }
        if(word[i] == "N" && word[i + 1] == "j" ){
          prevod += "Њ";
          i++;
          continue;
        }
        if(word[i] == "L" && word[i + 1] == "j" ){
          prevod += "Љ";
          i++;
          continue;
        }
        if(word[i] == "l" && word[i + 1] == "j" ){
          prevod += "љ";
          i++;
          continue;
        }
        if(word[i] == "d" && word[i + 1] == "ž" ){
          prevod += "џ";
          i++;
          continue;
        }
        if(word[i] == "D" && word[i + 1] == "ž" ){
          prevod += "Џ";
          i++;
          continue;
        }

        prevod += a[word[i]];
      }
    }
  }
  return prevod;
}