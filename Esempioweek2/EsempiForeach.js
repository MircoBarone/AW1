"use strict";
let letters="Hello World";
let result="";
letters=[...letters];
letters.forEach((a)=>{ result=result+a.toUpperCase();});
console.log(result);


//Con un vettore
//Eliminazione
let vettore=[0,2,6,4,9];
vettore.forEach(a=>{if(a<5) {vettore.splice(vettore.indexOf(a),1)   }    });
console.log(vettore);

//Calcolo della media
let media=0;
vettore.forEach(function(a,indice,vettore)
                                               {
                                                   
                                                if(indice<vettore.length) {media=media+a;   } 
                                            
                                                if(indice===(vettore.length-1)) {media=media/vettore.length}   } );
console.log(media);
console.log(vettore.length);
//sovrascrivo sul vettore

let i=0;
vettore.forEach((a,indice)=>{    vettore[indice]=i; i++;
                          }    );
console.log(vettore);

//Esecizio Some e Every
let vettore2=[4,6,9,10,11]
if(vettore2.some(x=>x>10)) { console.log("Alcuni elementi sono magggiori di 10")}
else if(vettore2.every(x=>x>10)) { console.log("tutti elementi sono magggiori di 10")}
else {   console.log("Nessun Elemento maggiore di dieci")};





