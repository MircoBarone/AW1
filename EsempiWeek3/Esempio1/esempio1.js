"use strict";
const sqlite3=require("sqlite3");
//apro un database e faccio una select e una stampa//
const db=new sqlite3.Database("exams.sqlite", (err)=>{if(err) { console.log("Errore"); throw err;     }   });
//per adesso la callback in caso di errore lancia una eccezione che non è c atturata ed è bloccante per il programma
let result=[];   //vettore dove metto il risultato;
let query="SELECT * FROM course LEFT JOIN score ON course.code=score.coursecode";
db.all(query, (err,rows)=>{
if(err) throw err;
for(let row of rows)
{ console.log(row);

  result.push(row);  //Qua facciamo push a ma possiamo fare qualsiasi operazione su rows.
}


});
console.log("///////////////////////////////////////");
for(let row of result)
{
    console.log(row.code, row.name);
}

console.log("END");

//COMPORTAMENTO DEL CODICE
//La prima cosa che viene eseguita è la spaziatura poi viene fatto il console.log sull array vuoto
//poi si stampa end, dopo ancora stampo i vari elementi
//e' come se eseguissi prima la parte fuori dalla gestione del db, dopo che ho stampato end ho
//ancora una operazione di input output dal database in corso, la callback relativa è eseguita solo dopo 
//che ho completato positivamente la query sql.
//attenzione che la stampa nella callback stampa l'intero oggetto

//--->Provo a risolvere con la variante