"use strict";
let vettore=[1,2,3,4,7,8,9];

let vettore0=vettore.map((x,indice)=>{ return "Valore:"+ `${x}`+";" +"Indice:"+`${indice}`;});

console.log(vettore0);

let vettore2=vettore.map((x,indice,vettore)=>{
                                                 
  if(indice<vettore.length-1)     return x+vettore[indice+1];
  else return x;
})

console.log(vettore2);

vettore2=vettore2.filter(x=>Math.round(x/2)>5);
console.log(vettore2);

