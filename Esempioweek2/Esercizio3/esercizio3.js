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

                          
                            }
                  


let Lista= new ExamList();
Lista.add(Esame1);
let Esame2= new Exam("BBB","DataBase",8,30,false,dayjs("2019-03-03"));
Lista.add(Esame2);
console.log(Lista);
let ricerca=Lista.find("AAA");
console.log(ricerca);
ricerca=Lista.find("CCC");
console.log(ricerca);
let Esame3= new Exam("CCC","Elettronica",6,21,false,dayjs("2020-03-03"));
Lista.add(Esame3);
console.log(Lista.average());
//console.log(Lista.listbyscore());
console.log(Lista.listbydate());
console.log(Lista.afterDate(dayjs("2020-01-01")));


