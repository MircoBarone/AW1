"use strict";

let ora=document.getElementById("ora");

ora.innerText="Ciao a tutti qui ci va l'ora";


//Voglio creare un nuovo elemento di tipo paragrafo e poi aggiungerlo nel Dom//


let newp=document.createElement("p"); //qui l'elemento esiste in memoria senza essere legato al DOM
let d=dayjs().format("YYYY-MM-DD HH:mm:ss"); 

newp.innerText=d;
document.getElementById("ora").prepend(newp);




let aggiornaora= function() 
{
let d=dayjs().format("YYYY-MM-DD HH:mm:ss"); 

newp.innerText=d;
//cambio direttamente il paragrafo non ho bisobo di fare append di nuovo.


} //inserisco un testo interno all'ora

setInterval(aggiornaora,1000);




//attenzione l'ora è recuperata dal sistema operativo e
//dal browser, non da internet.
//se volessi aggiornare dinamicamente l'ora






//let tr=document.getElementsByTagName("tr");
//tr=tr[0];     //ne ho 4

//tr.prepend(newp);  //metto il paragrafo prima della tabella;



//Se volessi caricare dayjs--va caricata nell'html


