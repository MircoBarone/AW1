import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import dayjs from 'dayjs';
import { ExamScores } from './ExamScores';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ExamForm from './ExamForm';
import { useState, useEffect } from 'react';
import {getAllCourses, getAllExam,updatetheExam,addtheExam,deletetheExam} from "./API";



function App() {
  //L'informazione caricata dal cliente deve entrare in uno stato, lo stato lo ho a disposizione, è lo stato
  //che vedi sotto che caricavi con un arreay finto
  const[exams,setExams]=useState([]);
  const[dirty,setDirty]=useState(true);
  const[corsi,setCorsi]=useState([]);
  const[loading,setLoading]=useState(true);
  //per caricare i dati devo utilizzare la api di fetch, la fetch deve essere in un side-effect.
  //conviene fare un file con tutte le API che chiami dal client

  useEffect(()=>{
    if(dirty&&corsi.length)  //trucco per far si che i caricamenti siano sequenziali.
    {
    getAllExam().then((exams)=>{setExams(exams); setDirty(false); setLoading(false);}).catch((err)=>{handleError(err)});
    }
  },[corsi.length,dirty])

  useEffect(()=>{  getAllCourses().then((courses)=>setCorsi(courses)).catch((err)=>handleError(err))},[])
  
  
  
  function addExam(exam) {
    exam.status="added";
    setExams( oldExams => [...oldExams, exam] );
    addtheExam(exam).then(()=>{setDirty(true)}).catch((err)=>{handleError(err)});
    
  }

  function handleError(err)
  {
    console.log(err);
  }

  //Queste funzioni per ora agiscono sul cliente e fanno le operazioni classiche di update delete e add.

  function updateExam(exam) {
    //aggiornamento locale
  
    setExams(exams => exams.map(
      e => (e.code === exam.code) ? Object.assign({}, exam, {status:"updated"}) : e
    ));
    //mi serve sul server un APi che supporta l'aggionamento
    //dopo che ho fatto l'operazione sul server voglio aggionare la lista degli esami e ricaricarla dal server
    //posso fare una funzione
    // posso definire una funzione di gestione dell'errore
    // dentro al then posso usare una useEffect, la stessa use effect che ho definito sopra.
    //utilizziamo uno stato addizionale di servizio
    //se ho fatto l'update dirty deve diventare true

    updatetheExam(exam).then(()=>{console.log("then"); setDirty(true)}).catch((err)=>{handleError(err)})

    
  }
  function deleteExam(code) {
    // setExams(...)   // remove exam
    setExams( exams.map(e=> {  if(e.code ==code)
    {   let ne={...e};
         ne.status="deleted";
         return ne;


    }
    else return e;
    
    }) );

    deletetheExam(code).then(()=>{setDirty(true)}).catch((err)=>{handleError(err)});
  }


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/"  element={ loading? <Loading/> :<ExamScores exams={exams} deleteExam={deleteExam}/>}/>
    <Route path="/add" element={<ExamForm courses={corsi} addExam={addExam} exams={exams}/>}/>
    <Route path="/edit/:examId" element={<ExamForm courses={corsi} exams={exams} updateExam={updateExam}/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}


function Loading(props) {
  return (
    <h2>Loading data ...</h2>
  )
}

export default App;
