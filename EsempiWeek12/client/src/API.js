

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
//get all Courses
async function getAllCourses() {
    // call: GET /api/courses
    const response = await fetch(`${localhost}/api/courses`);
    const coursesJson = await response.json();
    if (response.ok) {
      return coursesJson.map((co) => ({ code: co.code, name: co.name, CFU: co.CFU }));
    } else {
      throw coursesJson;  // an object with the error coming from the server
    }
  }






//funzione di update

async function updatetheExam(exam) {
    console.log(exam);
    const response = await fetch(`${localhost}/api/exams/${exam.code}`,{
    method:'PUT',
    headers:{   'Content-Type': 'application/json'},
    body: JSON.stringify({code:exam.code, score:exam.score, date:exam.date.format("YYYY-MM-DD")}),



    });
    
    
    
  
    if (response.ok) {
          
        }
    
    else {  const examJson = await response.json();
        
        
            throw examJson;
        


    }





}
function deletetheExam(coursecode) {
    // call: DELETE /api/exams/:coursecode
    return new Promise((resolve, reject) => {
      fetch(new URL(`${localhost}/api/exams/${coursecode}`), {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }
  
  function addtheExam(exam) {
    // call: POST /api/exams
    return new Promise((resolve, reject) => {
      fetch(new URL(`${localhost}/api/exams`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: exam.code, score: exam.score, date: exam.date.format('YYYY-MM-DD') }),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }








export {getAllExam, updatetheExam, getAllCourses,deletetheExam,addtheExam};

