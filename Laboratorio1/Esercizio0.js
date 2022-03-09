"use strict";
//STAMPA SEMPLICE
let ManipulateString=
function(aos) { 
    
    aos.forEach( function(e) 
    { let lunghezza=e.length;
        if(lunghezza>=4) 
        {  
            console.log(`${e.charAt(0)}`+`${e.charAt(1)}`+`${e.charAt(lunghezza-2)}`+`${e.charAt(lunghezza-1)} `) ; }
    
        if(lunghezza<2) { console.log("");}
        if(lunghezza==2) {  console.log(`${e}`+`${e}`); }
        
        if(lunghezza==3)
        {console.log(`${e.charAt(0)}`+`${e.charAt(1)}`+`${e.charAt(1)}`+`${e.charAt(2)}`);}
        
    
    });                };

     //VARIANTE CREA UN NUOVO VETTORE

    let ManipulateCreateString=
function(aos) { 
    
    return aos.map( function(e) 
    { let lunghezza=e.length;
        if(lunghezza>=4) 
        {  
            return `${e.charAt(0)}`+`${e.charAt(1)}`+`${e.charAt(lunghezza-2)}`+`${e.charAt(lunghezza-1)} `;
        }
    
        if(lunghezza<2) { return "" ;}
        if(lunghezza==2) { return `${e}`+`${e}`; }
        
        if(lunghezza==3)
        { return `${e.charAt(0)}`+`${e.charAt(1)}`+`${e.charAt(1)}`+`${e.charAt(2)}`; }
        
    
    });                };


   





let vettore=["Buonasera", "Ottimo", "Pasto", "Bene", "it", "PC", "Spring","cat","pet","cattedra", "A", " ","PISA"];
//ManipulateString(vettore);
let vettore2=ManipulateCreateString(vettore);
console.log(vettore2);
