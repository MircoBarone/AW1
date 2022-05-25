import {Button, Alert, Form} from 'react-bootstrap';
import { useState } from 'react';
import {Container,Col,Row} from "react-bootstrap";
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';


function ExamForm(props) {
  const params=useParams();
  const examId=params.examId;
  const exams=props.exams;
  const examToEdit=exams.find((exam)=>(exam.code==examId));
  const [code, setCode] = useState(examToEdit ? examToEdit.code : '');
  

  const [score, setScore] = useState(examToEdit ? examToEdit.score : 18);
  const [date, setDate] = useState(examToEdit ? examToEdit.date : dayjs());
  const navigate=useNavigate();

  const [errorMsg, setErrorMsg] = useState('');  // stringa vuota '' = non c'e' errore

  const handleSubmit = (event) => {
    event.preventDefault();
    // validation
    // esempio: che non ci siano spazi nel nome del corso
    if (!code) {
      setErrorMsg('Codice del corso non selezionato');
    } 
     else if (date.isAfter(dayjs())) {
      setErrorMsg('La data non può essere futura');
    } else {
      // add
      //const newExam = { code: code.trim(), name: name.trim(), score: score, date: date }
      const name=props.courses.find(c=>c.code===code).name;
      const newExam={code: code, name:name, score:score, date:date}
      if(!examToEdit)
      {props.addExam(newExam);}
      if(examToEdit)
      {props.updateExam(newExam)}
      navigate("/");
    }
  }

  const handleScore = (event) => {
    const val = event.target.value;
    
    setScore(val);
    /* Careful with validation: either validate at the end in handleSubmit, or when focus is lost,
       or consider that partial input may be invalid (difficult)

        if (val<18)
          setScore(18);
        else if (val>31)
          setScore(31);
        else
          setScore(val);
    */
  }

  return (
    <Container>
     <Row>
      <h1>Form</h1>

     </Row>
     
     <Row>
       <Col>
      {errorMsg ? <Alert variant='danger' onClose={()=> setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
      <Form onSubmit={handleSubmit}>
        
        
        



        <Form.Control as="select" value={code} onChange={ev => setCode(ev.target.value)} disabled={examToEdit ? true : false}>
                  {examToEdit ? <option>{examToEdit.name}</option> :
                  <><option disabled hidden value=''>choose...</option>
                  {props.courses
                      .filter(c => !props.exams.find(e => e.code === c.code))  // Avoid exams that are already present
                      .map(c => <option key={c.code} value={c.code} >{c.name} </option>)}</>}
                </Form.Control>




        <Form.Group>
          <Form.Label>Score</Form.Label>
          <Form.Control type='number' min={18} max={31} value={score} onChange={ev => handleScore(ev)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
        </Form.Group>
        <Button type='submit' >Save</Button>
        <Button onClick={()=>{navigate("/")}} variant='secondary' >Cancel</Button>
      </Form>
      </Col>
      </Row>
    </Container>
  );
}

export default ExamForm;