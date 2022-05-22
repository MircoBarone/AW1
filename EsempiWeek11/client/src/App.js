import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import dayjs from 'dayjs';
import { ExamScores } from './ExamScores';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ExamForm from './ExamForm';
import { useState, useEffect } from 'react';
import {getAllExam} from "./API";



function App() {
  //L'informazione caricata dal cliente deve entrare in uno stato, lo stato lo ho a disposizione, è lo stato
  //che vedi sotto che caricavi con un arreay finto
  const[exams,setExams]=useState([]);
  //per caricare i dati devo utilizzare la api di fetch, la fetch deve essere in un side-effect.
  //conviene fare un file con tutte le API che chiami dal client

  useEffect(()=>{
    getAllExam().then((exams)=>setExams(exams)).catch((err)=>{console.log(err)});
   
  },[])
  function addExam(exam) {
    setExams( oldExams => [...oldExams, exam] );
    
  }

  function updateExam(exam) {
    setExams(exams => exams.map(
      e => (e.code === exam.code) ? Object.assign({}, exam) : e
    ));
    
  }
  function deleteExam(code) {
    // setExams(...)   // remove exam
    setExams( exams.filter( (e)=> e.code !== code ) );
  }


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/"  element={<ExamScores exams={exams} deleteExam={deleteExam}/>}/>
    <Route path="/add" element={<ExamForm addExam={addExam} exams={exams}/>}/>
    <Route path="/edit/:examId" element={<ExamForm exams={exams} updateExam={updateExam}/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
