"use strict";
const dayjs=require("dayjs");  //basta il file package.json poi digiti npm install su terminale
//costruttore Film

const Film=function(id,title,favorites,date,rating)
{  
   if(id===undefined||title===undefined)
   {return ;}
   this.id=id
   this.title=title;
   this.favorites=favorites||false;
   this.date=date;
   this.rating=rating;
}


const Library=function()
{  this.vettore=[];
    
   this.add=function(Film)
   {  if(Film.id===undefined) {return;}
      this.vettore.push(Film);

   }

   this.sortByDate= function()
   {  
      return this.vettore.filter(x=>{if(x.date!=undefined) {return x;}}).sort((a,b) =>
      {   
       {return a.date.diff(b.date);}}).concat(this.vettore.filter(x=>{if(x.date==undefined) {return x;}}))

     
      
   }

   this.deleteFilm=function(ide)
   {   this.vettore=this.vettore.filter(x=>{if(x.id!==ide){return x;}});

   }

   this.resetWatchedFilms=function()
   {  this.vettore=this.vettore.map(function(x) { let Librop={...x};   
                                                  Librop.date=undefined;
                                                  return Librop;
                                                  })


   }

   this.getRated=function() {
   return this.vettore.filter(function(x)  {if(x.rating!=undefined) {return x;}}    ).sort((x,y)=>(-x.rating+y.rating));


   }



}




//Creazione Libreria
let Libreria1= new Library();
//Film1
Libreria1.add(new Film(1,"PulpFiction",true, dayjs("2022-03-29"),5));
//Film2
let Film1= new Film(2, "21 Grams", true, dayjs("2022-02-17"),4);
Libreria1.add(Film1);
//Film3
Film1= new Film(3, "Star Wars");
Libreria1.add(Film1);
//Film4
Libreria1.add(new Film(4,"Matrix"));  
//Film 5
Film1= new Film(5, "Shrek", false, dayjs("2022-03-21"),6);
Libreria1.add(Film1);
//Film6
Film1= new Film(6, "The Godfather", true, dayjs("2022-04-21"),5);
Libreria1.add(Film1);
//Film 7
Film1= new Film(7, "American Beauty", false);
Libreria1.add(Film1);

//Prova Sort by date

//console.log(Libreria1.sortByDate());
//console.log("STAMPA COMPLETA VETTORE CONFRONTO");
//console.log(Libreria1.vettore);

//Prova deleteFilm

//Libreria1.deleteFilm(1);
//Libreria1.deleteFilm(8);
//console.log(Libreria1.vettore);

//Prova resetWatchedFilms

//Libreria1.resetWatchedFilms();

//console.log(Libreria1.vettore);


//Prova getRated

//console.log(Libreria1.getRated());
//console.log("STAMPA COMPLETA VETTORE CONFRONTO");

//console.log(Libreria1.vettore);


//prova casi particolari--Film senza Id o senza titolo

Film1= new Film();
let Film2=new Film("AAA");

console.log(Film1);
console.log(Film2);

Libreria1.add(Film1);
Libreria1.add(Film2);

console.log(Libreria1.vettore);



