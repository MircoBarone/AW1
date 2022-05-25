'use strict';


const dao = require('./dao'); // module for accessing the DB

//facciamo partire il server web
//per far si che il server si ricarichi sempre quando aggiorni utilizza nodemon 
//sudo npm install -g nodemon
const cors=require("cors");
const express=require("express");
const morgan= require("morgan");
const {check, validationResult}=require("express-validator");

const app=express();   //crei l'oggetto per far funzionare express

const port=3001; //scelgo la porta fissa.
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

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
  
  dao.listExamsWithName().then((exams)=>{ setTimeout(()=>res.status(200).json(exams),1000)}).catch((err)=>{res.status(500).json({error:"DB error"})});
  //con il catch fai la gestione degli errori

  } 

)


app.listen(port, ()=> console.log("Il server è partito correttamente alla porta " +`http://localhost:${port}` ))



//facciamo la get con un parametro, recicliamo la get.


app.get("/api/courses/:code", [check("code").isLength({min:7,max:7})],async (req,res)=>{ 
  //Ho messo un parametro sulla get, devo leggere l'informazione sul database.
  try{
  const errors=validationResult(req);
  if(!errors.isEmpty()) { return res.status(400).json({error:errors.array()})}
    const codice=req.params.code; //recupero l'informazione
  //lo chiami result poichè potrebbe esservi un errore.
  const result= await dao.getCourse(codice); //await è valida solo dentro una callback async
  //Se non ho trovato l'oggetto vorrei usare 404
  //utilizzo le proprietà dei JSON
  if(result.error)  {res.status(404).json(result);}
  
   else{
   res.status(200).json(result);}
//il .json mi converte l'ogggetto di tipo JS in un oggetto JSON

  } catch(err) {res.status(500).end();}



});
/* api post */

app.post("/api/exams",
[check("score").isInt({min:18, max:31}),
  check("code").isLength({min:7,max:7}),
  check("date").isDate({format:"YYYY-MM-DD", strictMode:true})

],


async(req,res)=>
{  const errors=validationResult(req);
  //L'informazione mi è passata nel body
  const body=req.body;  //E' l'eame che voglio aggiungere.
  //attenzione che quello che deve uarrivare va interpretato in json
  if(!errors.isEmpty()){ return res.status(422).json({errors:errors.array()})}
  const exam={
   code:body.code,
    date:body.date,
   score:body.score,
  }
  //questa tecnica serve per isolare il Dao da quello che mi arriva, sto programmando in maniera di
  //elimino tutti i parametri che non mi interessano e rimappo i nomi-
 //quando fai la post devi includere Content-Type application JSON, funziona se hai un Json in ingresso.
//in questo modo il middleware fa il parse per noi, è una cosa che dovrai settare esplicitamente sul client.
 try{
  await dao.createExam(exam);
  res.status(201).end();
 } catch(err) {res.status(500).json({"error":`Errore di Inserimento dell'esame ${exam.code}`})}




}



)

// PUT /api/exams/<code>
app.put('/api/exams/:code', [
  check('score').isInt({min: 18, max: 31}),
  check('code').isLength({min: 7, max: 7}),
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const exam = req.body;

  // you can also check here if the code passed in the URL matches with the code in req.body
  try {
    await dao.updateExam(exam);
    res.status(200).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({error: `Database error during the update of exam ${req.params.code}.`});
  }

});


app.delete('/api/exams/:code', async (req, res) => {
  try {
    await dao.deleteExam(req.params.code);
    res.status(204).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of exam ${req.params.code}.`});
  }
});




//Nella applicazione ho una lista di corsi ed esami, cerchiamo di fare uno schema di API utili

/*

GET/api/courses
GET/api/exams
GET/api/courses/:code
Voglio mettere dell'edit sugli esami
Aggiunta di un esame
POST api/exams    riceve un body con il contenuto dell'esame, ci restituisce eventualmente l'id se ne abbiamo necessità
     esempio ricevo :{code: , score:, date:, }
     restitusco un oggetto:{id:, code:, score:, date:, }
Aggiornamento esame
PUT api/exams/(:code)   di solito restituisce l'oggetto modificato poichè qualcosa potrebbe non andare a buon fine.
DELETE api/exams/:code
 */