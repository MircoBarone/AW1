"use strict"
//definiscfo un array di numeri che sono i voti
let vettorevoti=[30,17,25,23,18,30,28,25,30,26,25,19,30];

let vettorevoti2;
let vettorevoti3;

vettorevoti2=[...vettorevoti];
vettorevoti3=[...vettorevoti];
//attenzione il metodo sort va bene solo per le stringhe, devi scrivere un comparatore con la arrow function

vettorevoti3.sort((a,b)=>(a-b)); //vedi documentazione
//console.log(vettorevoti3);
let elemento1;
let elemento2;

elemento1=vettorevoti3.shift();
elemento2=vettorevoti3.shift();

let indice1;
let indice2;
//rimozione elementi
indice1=vettorevoti2.indexOf(elemento1,0);
vettorevoti2.splice(indice1,1);
indice2=vettorevoti2.indexOf(elemento2,0);
vettorevoti2.splice(indice2,1);





//calcolo della media degli score esistenti
let media;
let contatore=0;
let somma=0;
for( let a of vettorevoti2)
{ somma=somma+a;
  contatore++;
} 
media=somma/contatore;
media=Math.round(media)
//console.log(media);

let concatenazione=[media,media];
vettorevoti2=vettorevoti2.concat(concatenazione);

console.log(vettorevoti);
console.log(vettorevoti2);

//Commenti Finali-- si sono utilizzati tre vettori per preservare l'ordine all'in terno del vettore.

