"use strict" ;
function greeter(name) {
      const myname = name ;
      const hello = function () {         //solo definita non eseguita
           return "Hello " + myname ;
                      }
  return hello ;
}

const helloTom = greeter("Tom") ;
const helloJerry = greeter("Jerry") ;
console.log(helloTom()) ;
console.log(helloJerry()) ;