import {Table, Button, Form,Alert} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
//importo useState per poterlo utilizzare
import {startTransition, useState} from "react";
import React from 'react';
import {Fragment} from "react";
import dayjs from "dayjs"

//partendo dall'esempio base voglio che i bottoni di cancellazione funzionino, non ha senso ragionare in termini di lista 
//che ho definito, l'idea è mettere la lista in uno stato per poterla modificare al bisogno
//e per poterne tenere il valore.


//Dove metto lo stato
//Se lo metto in App è visibile da tutti e ho risolto il problema
//Di contro devo portarmi dietro le callback per poterlo gestire
//Ho effettivamente bisogno dello stato in Table.


function ExamScores(props) {
  return(
      <ExamTable exams={props.exams}></ExamTable>
  );
}

function ExamTable(props) {
  //creo uno stato
  //Il valore iniziale è il vettore iniziale che ho definito
  //i dati sono un array che ho passato come props
  //un girono i dati saranno forniti dal server
  const [esami,Setesami]=useState(props.exams);
  const [visualizzo,setVisualizzo]=useState(0);
  //attenzione che quando definisci una callback devi farla specifica, non ha senso fare
  //semplice wrapping della funzione si set
  function cancellaEsame(id)
  { let vettore=[...esami];
    vettore=vettore.filter((x)=>(x.code!==id));
    Setesami(vettore);
    //puoi far operare direttamente la filter su Setesami tanto riotna un nuovo array
    //facendo modificare direttamente lo stato


  }
  function AddExam(e)
  {   //L'oggetto che aggiungo deve essere nuovo ma lo creo da zero quindi ok.
      Setesami((esami)=>{ return esami.concat(e)});
      //Se lo stato dipende dal vecchio stato è utile anzi necessario adoperare una callback.



  }
  //Voglio inserire un form, dove lo metto, l'idea è aggiungere un bottone e fare comparire un form.
  //Devo decidere dove far comparire il form.
  //Il form noi lo mettiamo sotto Exam Table--compare con un bottone ed uno stato di servizio

  
  
  return(
    <Fragment>
    <Table>
      <thead>
        <tr>
          <th>Exam</th>
          <th>Score</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          esami.map((ex) => <ExamRow exam={ex} key={ex.code} cancellaesame={cancellaEsame} idesame={ex.code}/>)
        }
      </tbody>
    </Table>
    {  (visualizzo==0) ? <Button onClick={(visualizzo)=>{setVisualizzo(1)}}>Add</Button>:
        
     
     <ExamForm visualizzo={visualizzo} setVisualizzo={setVisualizzo} AddExam={AddExam}></ExamForm>
      }
    
    
    </Fragment>
  );
}
//voglio agire sullo stato dal bottone, lo faccio tramite la SetEsami dal bottone
function ExamRow(props) {
  return(
    <tr><ExamData exam={props.exam}/><ExamActions idesame={props.idesame} cancellaesame={props.cancellaesame} /></tr>
  );
}

function ExamData(props) {
  return(
    <>
      <td>{props.exam.name}</td>
      <td>{props.exam.score}</td>
      <td>{props.exam.date.format('YYYY-MM-DD')}</td>
    </>
  );
}

function ExamActions(props) {
  return <td><Button  variant='danger'
  
  onClick={()=>(props.cancellaesame(props.idesame))}
  ><i className='bi bi-trash3'></i></Button></td>
}


function ExamForm(props)
{ let visualizzo=props.visualizzo;
  let setVisualizzo=props.setVisualizzo;
  let AddExam=props.AddExam;
  const[name,setName]=useState("");
  const[code,setCode]=useState("");
  const[voto,setVoto]=useState(18);
  const[data,setData]=useState(dayjs());

  const[errorMsg,seterrorMsg]=useState("");
  
  const handlerVoto=(event)=>{ const val=event.target.value;   setVoto(val);    }
  
  const handleSubmit=(event)=>{//L'idea è validare i campi e creare un nuovo esame da inserire nella lista
  event.preventDefault();
  if(voto>31)  {setVoto(()=>{return 31;}); seterrorMsg("Voto Riportato a 31"); return;  }
  if(voto<18)  {setVoto(18);   seterrorMsg("Voto riportato a 18"); return;}
  if(name==="") {seterrorMsg("Hai inserito un Titolo Vuoto"); return;}
  if(code==="") {seterrorMsg("Hai inserito un codice vuoto"); return;}
  if(data.diff(dayjs(),"d")>1) {seterrorMsg("Non puoi inserire un esame sostenuto nel futuro"); return;}
  const newObjg={code: code, name: name, score: voto, date: data };
  
  AddExam(newObjg);
  setVisualizzo(()=>(false));
  
  
  
  }



  return (
  //qua vorrei mettere un form, puoi usare un form di bootstrap, oppure i componenti html che hanno mapping sul DOm
  //se fai cosi devi definire lo stile come bootstrap, oppure utilizzi bootstrap react.
 
 <>
  
  {(errorMsg!=="") ? <Alert variant="danger" onClose={()=>{seterrorMsg("")}} dismissible>{errorMsg}</Alert>:false}
  <Form>
  <Form.Group>
  <Form.Label>Codice</Form.Label>
   <Form.Control type="text" placeholder="Inserisci il Codice" value={code}   onChange={(event)=>{setCode(event.target.value)}}></Form.Control>
   </Form.Group>
   <Form.Group>
   <Form.Label>Nome dell'esame</Form.Label>
   <Form.Control type="text" placeholder="Inserisci il Titolo" value={name}   onChange={(event)=>{setName(event.target.value.toUpperCase())}}></Form.Control>
  </Form.Group>
  <Form.Group>
   <Form.Label>Voto</Form.Label>
   <Form.Control type="number" min={18} max={31} placeholder="Inserisci il Voto" value={voto}   onChange={(event)=>{ handlerVoto(event);}}></Form.Control>
  </Form.Group>
  <Form.Group>
   <Form.Label>Data</Form.Label>
   <Form.Control type="date"  placeholder="Inserisci la Data" value={data.format("YYYY-MM-DD")}   onChange={(event)=>{ setData(dayjs(event.target.value));}}></Form.Control>
  </Form.Group>


  <Button onClick={(visualizzo)=>{setVisualizzo(0)}}>Cancel</Button>
  <Button onClick={handleSubmit}>Save</Button>
  </Form> 
  </>
)




}



export {ExamScores};