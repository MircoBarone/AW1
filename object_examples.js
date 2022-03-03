"use strict";

let book={
author: "Enrico",
title:  "Learning Js",

"for":  "students",
pages:340,

"chapter pages":[30,50,60,100],


};

console.log(book);
const persona= book["author"];
console.log(persona[0]+persona[5]);

book.editor="Polito";  //creo una nuova proprietà

console.log(book);

let surname=book && book.author && book.author.surname;

console.log(surname); //questo non esiste--undefined

//const surname2=book.author.surname;

//console.log(surname2);  //errore stai deferenziando qualcosa che non esiste


const book2=Object.assign({},book); //nuovo oggetto diverso dal precedente
console.log(book2);

const book3={...book};
console.log(book3);


const {author,...rest}=book;
console.log(author);
console.log(" ");
console.log(rest);







