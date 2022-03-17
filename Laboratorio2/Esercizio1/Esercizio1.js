"use strict";
const dayjs=require("dayjs");  //basta il file package.json poi digiti npm install su terminale
const sqlite=require("sqlite3");
const db=new sqlite.Database("films.db", (err)=>{if(err) { console.log("Errore"); throw err;     }  
                                                else {console.log("Database aperto correttamente"); }

});





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

   this.getDataBase= function()
   {  return new Promise((resolve,reject)=>{
      db.all("select * from films",(err,rows) =>{if(err) {reject(err);}
                                                 else{ resolve(rows);  }
                                                }
                        )
                                           }
      
      
      
                         )
   }


   this.getDataBaseFav= function()
   {  return new Promise((resolve,reject)=>{
      db.all("select * from films where favorite=1",(err,rows) =>{if(err) {reject(err);}
                                                 else{ resolve(rows);  }
                                                }
                        )
                                           }
      
      
      
                         )
   }

   this.getDataBaseToday= function()
   {  return new Promise((resolve,reject)=>{
      db.all("select * from films where watchdate='2022-03-17'",(err,rows) =>{if(err) {reject(err);}
                                                 else{ resolve(rows);  }
                                                }
                        )
                                           }
      
      
      
                         )
   }
   
   this.getDataBaseday= function(data)
   {  return new Promise((resolve,reject)=>{
      db.all("select * from films where watchdate< ?",data,(err,rows) =>{if(err) {reject(err);}
                                                 else{ resolve(rows);  }
                                                }
                        )
                                           }
      
      
      
                         )
   }

   this.getDataBasescore= function(score)
   {  return new Promise((resolve,reject)=>{
      if(score>5||score<0)
      { reject(new Error("Lo score può andare solo da zero a cinque"));

      }

      db.all("select * from films where rating>= ?",score,(err,rows) =>{if(err) {reject(err);}
                                                 else{ resolve(rows);  }
                                                }
                        )
                                           }
      
      
      
                         )
   }

   this.getDataBasename= function(name)
   {  return new Promise((resolve,reject)=>{
      

      db.all("select * from films where title= ?",name,(err,rows) =>{if(err) {reject(err);}
                                                 else{ resolve(rows);  }
                                                }
                        )
                                           }
      
      
      
                         )
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

//Film1= new Film();
//let Film2=new Film("AAA");

//console.log(Film1);
//console.log(Film2);

//Libreria1.add(Film1);
//Libreria1.add(Film2);

//console.log(Libreria1.vettore);

let test=async function()
{  console.log("Test1");
   await Libreria1.getDataBase().then((x)=>{console.log(x)}).catch((x)=>{console.log(x.toString())});
   console.log("Test2");
   await Libreria1.getDataBaseFav().then((x)=>{console.log(x)}).catch((x)=>{console.log(x.toString())});
   console.log("Test3");
   await Libreria1.getDataBaseToday().then((x)=>{console.log(x)}).catch((x)=>{console.log(x.toString())});
   console.log("Test4");
   await Libreria1.getDataBaseday(dayjs("2022-01-01").format("YYYY-MM-DD")).then((x)=>{console.log(x)}).catch((x)=>{console.log("ERRORE",x.toString())});
   console.log("Test5");
   await Libreria1.getDataBaseday(dayjs("2022-03-12").format("YYYY-MM-DD")).then((x)=>{console.log(x)}).catch((x)=>{console.log("ERRORE",x.toString())});
   console.log("Test6");
   await Libreria1.getDataBasescore(3).then((x)=>{console.log(x)}).catch((x)=>{console.log("ERRORE:",x.toString())});
   console.log("Test7");
   await Libreria1.getDataBasescore(8).then((x)=>{console.log(x)}).catch((x)=>{ console.log("ERRORE:",x.toString());});
   console.log("Test8");
   await Libreria1.getDataBasename("Forrest Gump").then((x)=>{console.log(x)}).catch((x)=>{ console.log("ERRORE:",x.toString());});
}
test().catch((x)=>{console.log(x);});



