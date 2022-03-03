"use strict";

//PROVE CON GLI ARRAY

let a= [1, 4, 9, 16];     //CREAZIONE DI UN ARRAY

console.log(a);
let b=a.reverse();

console.log(b);

console.log(a.join()); //RENDE IL VETTORE UNA STRINGA, SEPARATORE ,

console.log(a.join("")); //SEPARATORE NESSUNO

console.log(a.join("NUMERO")); //SEPARATORE NUMERO

let ciao= "ciao" + "a"+ "tutti";
console.log(ciao);

let d=[ 'a', 'b', 'c', 'd' ];

let e=a.concat(d);  //e é la concatenzione di due array precedenti

console.log(e);

let f=["ciao", ...d,  "ciao"];

console.log(f);

 f=["ciao", d,  "ciao"]; //qui tengo solo un riferimento

console.log(f);

f.push("+");

console.log(f);

const vett=[...f];  //copia del contenuto di un array in un altro array


console.log(vett);

//vett=1;  non è fattibile riasegnare

vett[0]="pippopippo";

console.log(vett);  //puoi modificare ciò che è puntato dalla variabile;


//ciclo for

for(const val of vett)
{  console.log(val);
   //console.log("ciao");



}   //questo costrutto funziona poichè la costante è ricreata ad ogni iterazione del for, se avessi usato un indice?


for(let i=0; i<vett.length;i++)  //piu macchinoso è scritto in funzione c, se i la metti const non funziona nula
{  console.log(vett[i]);


}








