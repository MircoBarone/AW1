"use strict";
const sqlite3=require("sqlite3");
//apro un database e faccio una select e una stampa//
const db=new sqlite3.Database("exams.sqlite", (err)=>{if(err) { console.log("Errore"); throw err;     }   });
//per adesso la callback in caso di errore lancia una eccezione che non è c atturata ed è bloccante per il programma
let result=[];   //vettore dove metto il risultato;
let query="SELECT * FROM course LEFT JOIN score ON course.code=score.coursecode";
const stampa=function(vettore)
{  
 console.log("///////////////////////////////////////");

 for(let row of vettore)
 {console.log(row.code, row.name);}
 
 console.log("END");

}

db.all(query, (err,rows)=>{
if(err) throw err;
for(let row of rows)
{ console.log(row);

  result.push(row);  //Qua facciamo push a ma possiamo fare qualsiasi operazione su rows.
}
stampa(result);

});
//console.log("///////////////////////////////////////");
//for(let row of result)
{
    //console.log(row.code, row.name);
}

//console.log("END");


//Per avere qualcosa che segua nel modo corretto metto tutto dentro alla callback.
//Se devo processare l'informazione la devo mettere nella callback.
//Può essere fastidioso mettere tutto nella callback, anche facendo uso di funzioni.

