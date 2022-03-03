"use strict"

let a={ nome: "Pippo",
        cognome: "Pluto" ,
        Citta: "Paperopoli" ,    };
 console.log(a);

for(var c in a)
{  //console.log(c);
   console.log(`${a[c]}`);

}