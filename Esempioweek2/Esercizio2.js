"use strict";
let listacorsi="Web Applications I, Computer Architectures, Data Science and Database Technology, Computer network technologies and services, Information systems security, Software engineering, System and device programming."
let vettore=listacorsi.split(", ");
console.log(vettore);

let vettore2=vettore.map(  function(e) { let array=e.split(" ");
                               array=array.map( function(x) {return x[0];})
                              let stringa="";
                              array.map( function(x) { stringa=stringa+`${x}`.toUpperCase(); })
                              return stringa;

                                            }
)
console.log(vettore2.sort());

