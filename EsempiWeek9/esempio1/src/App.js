import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import dayjs from 'dayjs';
import { ExamScores } from './ExamScores';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ExamForm from './ExamForm';
import { useState } from 'react';

const fakeExams = [
  { code: '01TYMOV', name: 'Information systems security', score: 30, date: dayjs('2022-02-01') },
  { code: '01SQJOV', name: 'Data Science and Database Technology', score: 21, date: dayjs('2021-06-15') },
  { code: '04GSPOV', name: 'Software Engineering', score: 26, date: dayjs('2022-06-04') }
];

function App() {
  const[exams,setExams]=useState(fakeExams);
  
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
