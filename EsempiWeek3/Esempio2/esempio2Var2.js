"use strict";
const sqlite=require('sqlite3');
const db= new sqlite.Database('data.sqlite',(err)=>{if(err) throw err;});

async function insertOne() {
    return new Promise( (resolve, reject) => {
    db.run('insert into numbers(number) values(1)', (err) => {
    if (err) reject(err);  //se ho un errore faccio il reject
    else resolve('Done');   //se non ho un risultato non rispedisco nulla;
    });
    }) ;
    }


    async function printCount() {
        return new Promise( (resolve, reject) => {
        db.all('select count(*) as tot from numbers',
        (err, rows) => {
        if(err)
        reject(err);
        else {
        console.log(rows[0].tot);
        resolve(rows[0].tot);  //se ho un risultato lo rispedisco
        }
        }) ;
        }) }

    
    
        async function main() {
            for(let i=0; i<100; i++) {
            await insertOne();  //inserisco un valore nel database, questo è bloccante
            await printCount();  //stampo il conto di quanti valori ho nel database
            }
            db.close();
            }
            main() ;


//questo mi permette di avere una schedulazione sincrona di funzioni asincrone, le fa comportare come funzioni sincrone.

