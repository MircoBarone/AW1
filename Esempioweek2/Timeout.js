"use strict";


//codice da eseguirsi

const ciao=(nome)=>{ console.log( `ciao ${nome}`)};  //Stampa ciao

setTimeout(ciao,2000,"Mirco");  //il tempo è espresso in mikllisecondi.
//La funzione ciao viene messa in coda per eseguirsi dopo un certo tempo.
//La funzione ritorna un id se volessi annullare il timer.
//Qui l'evento è creato da me, tuttavia nel browser è causato dall'utente ad esempio prmendo il mouse


//------------------INTERVAL-------------------------
//Uso la funzione set interval, è come il set Timeout solo che è periodico

const id=setInterval((tizio)=>{console.log(`Ciao ${tizio}`);},1000,"Mirco");

//se non si fa nulla questo programma esegue in eterno, la puoi fermare solo da terminale
//Nel browser non c'è nulla da fermare, si termina solo quando si chiude la pagina nel Browser



setTimeout(()=>{clearInterval(id)},6000);  //termina la stampa--l'interval

