"use strict"
//attenzione devi installare la libreria in questa cartella--basta prendere il Package json
const dayjs=require("dayjs");

function Exam(code,name,credits,score,honor,Date)
        { this.code=code;
          this.name=name;
          this.credits=credits;
          this.score=score;
          this.honor=honor;
          this.Date=Date;


        }
let Esame1=new Exam("AAA","ProgrammazioneaOggetti", 8, 25, false, dayjs("2018-03-25"));


function ExamList()
{
  this.vettore = [];   //è il vettore su cui salvo gli oggetti Exam
  this.add = function (Exam) { this.vettore.push(Exam); }

  this.find = function (cc) {
    let ritorno;
    for (const a of this.vettore) { if (a.code === cc) { ritorno = a; } }
    return ritorno;
  }


  this.average = function () {
    let crediti = 0;
    let tot = 0;
    for (const a of this.vettore) {
      tot = tot + (a.credits * a.score);
      crediti = crediti + a.credits;
    }
    return Math.round(tot / crediti);
  }                                                     
                          

//sort by decreasing score
this.listbyscore= function()
                             {let vettore2=[...this.vettore];
                              return vettore2.sort((a,b)=>(b.score-a.score));
                             }
  
                          
//sort by increasing Date
this.listbydate= function()
                             {let vettore2=[...this.vettore];
                              return vettore2.sort((a,b)=>(a.Date.diff(b.Date)));
                             }

this.afterDate= function(date)
                            {    let vettore5=[];
                                 for(const a of this.vettore)
                                 {  if(a.Date.diff(date)>0) 
                                    {
                                      vettore5.push(a);
                                    }

                                 }
                            return vettore5;

                            }
//scrivo una Callback

this.filter=function(callback) {
   //se la funzione che mi viene passata che4 lavora sugli oggetti exam ritona vera restituisco il valore.
                              let vett6=[];
                              for( const e of this.vettore)
                               { if(callback(e))
                                vett6.push(e);
                              
                              }
                              return vett6;

}
this.afterDatewc= function(callback)
                            {    return this.vettore.filter(callback);

                            }
                            
this.listbydatewc= function(callback)
                            { let vettore2=[...this.vettore];
                             return vettore2.sort(callback);
                            }

this.increaseVote= function() { return this.vettore.map((elemento)=>
  
  {  //Nota di solito non si modifica direttamente l'oggetto si crea un oggetto nuovo
     //Il problema esiste solo con gli oggetti che sono dei puntatori, dentro la map gli oggetti si creano.
     let elemento2={...elemento};
     elemento2.score=(elemento2.score+5); 
    if(elemento2.score>30) {elemento2.score=elemento2.score-30;}
  
  
  
  
  return elemento2;})  }





                            }
                  


let Lista= new ExamList();
Lista.add(Esame1);
let Esame2= new Exam("BBB","DataBase",8,30,false,dayjs("2021-03-03"));
Lista.add(Esame2);
//console.log(Lista);
let ricerca=Lista.find("AAA");
//console.log(ricerca);
ricerca=Lista.find("CCC");
//console.log(ricerca);
let Esame3= new Exam("CCC","Elettronica",6,21,false,dayjs("2020-03-03"));
Lista.add(Esame3);
//console.log(Lista.average());
//console.log(Lista.listbyscore());
//console.log(Lista.listbydate());
//console.log(Lista.afterDate(dayjs("2020-01-01")));

//const e2=Lista.filter((e)=>(e.score>27));

//console.log(e2);

//let giorno=dayjs("2020-01-01");
//let risultato=Lista.afterDatewc((x)=>{if(x.Date.diff(giorno)<0) return true; else return false;});
//console.log(risultato);

//let risultato=Lista.listbydatewc(function(a,b) { return a.Date.diff(b.Date)});
//console.log(risultato);

console.log(Lista.increaseVote());
console.log(Lista.vettore);






