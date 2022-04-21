import {Table, Button} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
//importo useState per poterlo utilizzare
import {startTransition, useState} from "react";
import React from 'react';
import {Fragment} from "react";
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
        
     
     <ExamForm visualizzo={visualizzo} setVisualizzo={setVisualizzo}></ExamForm>
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
  const[name,setName]=useState("");
  return (
  //qua vorrei mettere un form, puoi usare un form di bootstrap, oppure i componenti html che hanno mapping sul DOm
  //se fai cosi devi definire lo stile come bootstrap, oppure utilizzi bootstrap react.
 
 <>
  <form>
  <input type="text" name="nome" className="form-control" placeholder="Inserisci un Titolo" value={name} onChange={(event)=>{setName(event.target.value.toUpperCase())}}></input>
  </form>
  <Button onClick={(visualizzo)=>{setVisualizzo(0)}}>Cancel</Button>  
  </>
)




}



export {ExamScores};