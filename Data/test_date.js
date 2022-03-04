"use strict"

const dayjs=require("dayjs"); //Importo la libreria, la metto in unha variabile con lo stesso nome della libreria
let now=dayjs();//creo una nuova data
console.log(now.format()); //formattazione di default


//le librerie esterne servono per ogetti con tipo di dato particolare
//supponiamo che voglio fare un libretto con voto, nome corso e data

let libretto=[];

let esame={nome:"AW1", voto:20, data:dayjs('2022-03-03'), };

function stampa(esame)
{  for(const a in esame)
    {   
       
        console.log(`${a} : ${esame[a]}`);
        console.log(" ");


    }


}

stampa(esame);

function Exam(nome, voto,data)
{  this.nome=nome;
   this.voto=voto;
   this.data=data;
   this.str=function(){
    return `${this.nome} ${this.voto}  ${this.data.format()}` }

   }
let Esame2= new Exam( "DATA SCIENCE", "25", dayjs('2022-03-04'));
console.log(Esame2.str());

stampa(Esame2); //attento che cosi stampi pure i metodi







