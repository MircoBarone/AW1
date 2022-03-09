"use strict";


//codice da eseguirsi

const ciao=(nome)=>{ console.log( `ciao ${nome}`)};  //Stampa ciao

setTimeout(ciao,2000,"Mirco");  //il tempo è espresso in mikllisecondi.
//La funzione ciao viene messa in coda per eseguirsi dopo un certo tempo.
//La funzione ritorna un id se volessi annullare il timer.
//Qui l'evento è creato da me, tuttavia nel browser è causato dall'utente ad esempio prmendo il mouse