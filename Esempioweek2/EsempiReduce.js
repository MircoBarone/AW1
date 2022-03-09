"use strict";
let vettore=[1,2,5,6,9,10,12,25,-23];

//MEDIA
let media=vettore.reduce( function(acc,val,index,vett) { return acc+val;      },0)/vettore.length;
console.log(media);

//MINIMO
let minimo=vettore.reduce( function(acc,val,index,vett) { if(val<acc) {acc=val;} return acc;  },1000);
console.log(minimo);