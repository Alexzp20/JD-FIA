import React, { useEffect, useState } from 'react';
import {Button, Col, Container, Label, Row, Table } from 'reactstrap';
import FilaAsistencia from './FilaAsistencia';
import ModalNuevaAsistencia from './ModalNuevaAsistencia';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../../Api.js';

const Asistencia = ({setAsistencia}) => {

    const [asistentesPropietarios,setAsistentesPropietarios]= useState([]);
    const [asistentesSuplentes,setAsistentesSuplentes]= useState([]);
    const [asistentesOtros,setAsistentesOtros]= useState([]);
    const [modalNew,setModalNew]= useState(false);
    const [usuarios, setUsuarios]= useState([])
    const toggleNew = () => setModalNew(!modalNew)
    const cookies = new Cookies();
    const token = cookies.get('token')


    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/users/asistencia`, {
        headers: {
              'Authorization': `Bearer ${token}`
            },
            method: 'GET',
        })
        .then((data) => data.json())
        .then((res)=>{
           console.log(res)
           setUsuarios(res)
        })
    }, [])


    useEffect(() => {
        
        const asistentes = [...asistentesPropietarios, ...asistentesSuplentes, ...asistentesOtros]
        setAsistencia(asistentes)


    }, [asistentesPropietarios, asistentesOtros, asistentesSuplentes, setAsistencia]);






    return (
        <Container className=' px-4'>
             <Row>
                <h5>1- Establecimiento del Quorum</h5>
                <br />
                <br />
                <Col xs="9"></Col>
                <Col xs="3">
                    <Label className=' text-center' sm={6} for="newUserBt"><h6>Añadir Asistencia: </h6></Label>
                    <Button id="newUserBt" className='text-light' color='custom-success' onClick={toggleNew}>Asistencia</Button>
                </Col>
            </Row>
            <br />
            <Row>
                <Table bordered striped className='text-center'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Asistente</th>
                            <th>Hora Asistencia</th>
                            <th>Quórom</th>
                            <th>Asistencia</th>
                        </tr>
                        <tr>
                            <th colSpan="4">Miembros de Junta Directiva Propietarios</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'>
                    {asistentesPropietarios && (asistentesPropietarios.map((asistente)=><FilaAsistencia key={asistente.id} asistente={asistente}/>))}
                    </tbody>
                    <thead className='table-primary'>
                        <tr>
                            <th colSpan="4">Miembros de Junta Directiva Suplentes</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'>
                    {asistentesSuplentes && (asistentesSuplentes.map((asistente)=><FilaAsistencia key={asistente.id} asistente={asistente} />))}
                    </tbody>
                    <thead className='table-primary'>
                        <tr>
                            <th colSpan="4">Otros Asistentes</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'>
                    {asistentesOtros && (asistentesOtros.map((asistente)=><FilaAsistencia key={asistente.id} asistente={asistente}/>))}
                    </tbody>
                </Table>
            </Row>

            <ModalNuevaAsistencia modalNew={modalNew} toggleNew={toggleNew} setAsistentesOtros={setAsistentesOtros} setAsistentesPropietarios={setAsistentesPropietarios} setAsistentesSuplentes={setAsistentesSuplentes} usuarios={usuarios}/>
        </Container>
        );
}

export default Asistencia;
