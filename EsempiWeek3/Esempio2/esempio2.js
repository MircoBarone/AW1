"use strict";

const sqlite = require('sqlite3');
const db = new sqlite.Database('data.sqlite',
(err) => { if (err) throw err; });
for(let i=0; i<100; i++) {
db.run('insert into numbers(number) values(1)',
(err) => { if (err) throw err; });
db.all('select count(*) as tot from numbers',
(err, rows) => {
if(err) throw err;
console.log(rows[0].tot);
}) ;
}
db.close();


//questo codice non mi da la garanzia che la insert venga fatta prima che io faccia il count, le operazioni sono spaiate
//bisogna scrivere le operazioni in ordine, cioè per eseguire la seconda operazione dovrei aspettare che chiuda la callback della prima operazione
