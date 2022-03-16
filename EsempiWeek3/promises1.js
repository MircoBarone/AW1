"use strict";
function wait(duration) {
    // Create and return a new promise
    return new Promise((resolve, reject) => {
    // If the argument is invalid, 
    // reject the promise
    //ho una callback con due parametri che sono resolve e reject.
    //devo eseguire un codice che fa delle operazioni asincrone.
    if (duration < 0) {
    reject(new Error('Time travel not yet implemented'));
    //qua risolvo con la reject--la reject è chiamata con dei parametri--lancio un errore con un codice.
    //la reject è immediata  non mi  lascia aspettare.
    } else {
    // otherwise, wait asynchronously and then
    // resolve the Promise; setTimeout will 
    // invoke resolve() with no arguments:
    // the Promise will fulfill with 
    // the undefined value
    //ho una promise che viene risolta dopo un certo tempo--cioè la set timeout risolve la promise dopo un certo tempo.
    setTimeout(resolve("Risolto Correttamente"), duration);
    }
    });
    }
  //utilizzo--ho due metodi, uno è il then che si usa in caso di fullfilled, then può accettare una callback,
    
        // if a function returns a Promise...
        wait(-2).then((result) => {
        console.log("Success!");
        console.log(result);
        }).catch((error) => { 
        console.log("Error: ", error.toString());
        }).finally(()=>{console.log("HO rilasciato tutte le risose\n")});