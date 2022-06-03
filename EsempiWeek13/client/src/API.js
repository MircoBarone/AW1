

const dayjs = require("dayjs");
const localhost = "http://localhost:3001";
const APIURL = new URL('http://localhost:3001/api/')

async function getAllExam() {

    const response = await fetch(`${localhost}/api/exams`,{credentials: 'include'});
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
    const response = await fetch(new URL('courses',APIURL),{credentials: 'include'});
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
    credentials: 'include',


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
      fetch(new URL(`${localhost}/api/exams/${coursecode}`), {credentials: 'include',
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
        credentials: 'include',
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

  async function logIn(credentials) {
    //fa un fetch con una POSt su localhost/api/sessions
    let response = await fetch(`${localhost}/api/sessions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),  //nel body passo le credentials che voglio inserire
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;  //rilancio il messaggio di errore
    }
  }
  async function logOut() {
    await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
  }
  
  async function getUserInfo() {
    const response = await fetch(new URL('sessions/current', APIURL), {credentials: 'include'});
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
  }
  







export {getAllExam, updatetheExam, getAllCourses,deletetheExam,addtheExam,logIn,logOut};

