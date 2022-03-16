"use strict";

const { rejects } = require("assert");

//Variante del programma presente sulle slide. 
//L'idea è passare il tempo a questa funzione
function resolveAfterMs(millisec) {
    
    
    return new Promise((resolve,reject) => {
        if(millisec<0)
        {  reject(new Error("Tempo Scorretto"));   //questo genera una ecezzione non gestita, se non è gestita da nessuno arriva al livello dello scope globale
                                        //in una applicazione web questo va gestita
    
        }

    
    setTimeout(() => {
    resolve('resolved');
    }, millisec);
    });
    }

   
   // async function asyncCall(time) {
   // try{
   // console.log('calling');
   /* const result = await resolveAfterMs(time);
    console.log(result);
   
    } catch(e) {console.log("Rilevata Eccezione"); return e.toString();}}
    
    asyncCall(-10).then(console.log);*/
    

    //posso anche fare
    async function asyncCall(time) {
       
        console.log('calling');
        const result = await resolveAfterMs(time);
        console.log(result);
       
        } 
        
        

    asyncCall(-10).then().catch((e)=>{console.log("Rilevata Eccezione"+":"+e.toString())});