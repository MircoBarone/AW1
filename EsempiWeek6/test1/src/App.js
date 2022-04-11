//creiamo un componente bottone


//questo componente deve esserci sempre
//Button è il componente che ho creato sopra
//Gli attributi del componente vengono come proprietà del componente che ho chiamato. attenzione che 
//non chiamo una funzione è react che tiene traccia delle modifiche che vengono fatte.
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyButton from './Button.js';
function App() {
return (
<Container>
<Row>
<Col variant="3">
<p>Prima parte</p>
</Col>
<Col variant="9">
Premi qui: <MyButton lang='it' />
</Col>
</Row>
</Container>
);
}
export default App