const dayjs = require("dayjs");
const localhost = "http://localhost:3001";

async function getAllExam() {

    const response = await fetch(`${localhost}/api/exams`);
    //response è l'oggetto che abbiamo visto sulle slide Respone.
    const examsJson = await response.json();
    if (response.ok) {
        return examsJson.map((ex) => ({
            code: ex.code, name: ex.name, score: ex.score, date: dayjs(ex.date)
        }))
    }
    else {
        throw examsJson  //oggetto json che contiene l'errore, non posso parsificarlo come ho visto sopra


    }





}


export {getAllExam};

