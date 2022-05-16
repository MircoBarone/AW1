'use strict';


const dao = require('./dao'); // module for accessing the DB

//facciamo partire il server web
//per far si che il server si ricarichi sempre quando aggiorni utilizza nodemon 
//sudo npm install -g nodemon

const express=require("express");
const morgan= require("morgan");

const app=express();   //crei l'oggetto per far funzionare express

const port=3001; //scelgo la porta fissa.
app.use(morgan("dev"));

// per farlo partire node server.js
// sul browser puoi aprire localhost:3001, su 3000 vi è già react

//facciamo partire una route--l'istruzione listen va alla fine, tutto ciò che fai lo fai prima
//GET/api/courses api è un prefisso comune per non confonderti con le route del server react.
//voglio scrivere una route per quello che ho scritto sopra
//voglio restituire i corsi che effettivamente sono nel database.
//devi recuperarli da dao.js
app.get("/api/courses", async (req,res)=>{ 
  /*const corsi=dao.listCourses();  //attemnzione che questa è una promise devo apettare che la Promise sia risolta
  // devo utilizzare await */
  try{
  const corsi= await dao.listCourses(); //await è valida solo dentro una callback async

  
 /* res.send(corsi); 
 //per spedire i json è meglio utilizzare res.json che rispedisce dei json.
*/
res.status(200).json(corsi);
//Nel browser posso avere il mapping e la visualizzazione automatica del json,
//json è un formato molto diffuso, firefox è abbastanza abile nel visualizzarlo.
//ritono anche uno stato che non ha errori.

//list courses può dare una reject per gestire gli errori sull'await l'unico modo  è il try catch
  } catch(err) {res.status(500).end();}


  //se vuoi far spuntare un errore prova a fare richiesta ad una tabella che non esiste
});

//cerchiamo din dare una risoluzione alternativa alla Promise

app.get("/api/exams",  (req,res)=>{
  
  dao.listExams().then((exams)=>{res.status(200).json(exams)}).catch((err)=>{res.status(500).json({error:"DB error"})});
  //con il catch fai la gestione degli errori

  } 

)


app.listen(port, ()=> console.log("Il server è partito correttamente alla porta " +`http://localhost:${port}` ))

