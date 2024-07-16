import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../../Navbar/NavBar'
import { Button, Col, Container, Label, Row } from 'reactstrap'
import { MostrarAsistencia } from './MostrarAsistencia'
import { MostrarActas } from './MostrarActas'
import { MostrarSolicitudes } from './MostrarSolicitudes'
import { MostrarInformes } from './MostrarInformes'
import Cookies from 'universal-cookie'
import { REACT_API_BASE_URL } from '../../../Api.js';

export const MostrarAgenda = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [actas, setActas] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [generales, setGenerales] = useState({});
    const [informes, setInformes] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);
    const [votaciones, setVotaciones] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get('token')



    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/agenda/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
      },
        })
        .then(response => response.json())
        .then(data =>{ 
            console.log(data)
            setActas(data.actas)
            setAsistencias(data.asistencias)
            setGenerales(data.generales)
            setInformes(data.informes)
            setSolicitudes(data.solicitudes)
            setVotaciones(data.votaciones)
        })
        .catch(error => console.log(error));


    }, []);


  return (
    <React.Fragment>
                    <NavBar/>
                    <br />
                        <Container className='bg-custom-light my-4  py-2 rounded' >
                             <br />
                                <Row>
                                    <Col className='text-center'>
                                        <h4>UNIVERSIDAD DE EL SALVADOR</h4>
                                        <h4>FACULTAD DE INGENIERIA</h4>
                                        <h4>JUNTA DIRECTIVA</h4>
                                        <h4>NUEVA AGENDA</h4>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                <Row>
                                    <Col xs="4"></Col>
                                    <Col xs="4" className='text-center'>
                                     <h5>Agenda No: {generales.numero}</h5>
                                    </Col>
                                    <Col xs="4"></Col>
                                </Row>
                                <br />
                                <Row className=''>
                                    <Col xs="2"></Col>
                                    <Col xs="3">
                                    <h5>Convoca: {generales.convoca}</h5>
                                    <h5>Lugar de convocatoria: {generales.lugar}</h5>
                                    <h5>Primera convocatoria: {generales.primera_convocatoria}</h5>
                                    </Col>
                                    <Col xs="2"></Col>
                                    <Col xs="3">
                                    <h5>Dia: {generales.fecha}</h5>
                                    <h5>Tipo de convocatoria: {"ordinaria"}</h5>
                                    <h5>Segunda Convocatoria: {generales.segunda_convocatoria}</h5>
                                    </Col>
                                    <Col xs="2"></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col xs="12" className='m-1'>
                                    <h4>1- Establecimiento del quorum</h4>
                                    <br />
                                    <MostrarAsistencia asistencia={asistencias}/>
                                    <br />
                                    <h4>2- Analisis y aprobación de agenda</h4>
                                    <br />
                                    <Row>
                                    <Col xs="2"></Col>
                                    <Col xs="3">
                                    <h5>Hora de inicio: {generales.hora_inicio}</h5>
                                    </Col>
                                    <Col xs="2"></Col>
                                    <Col xs="3">      
                                    <h5>Hora de finalización: {generales.hora_finalizacion}</h5>
                                    </Col>
                                    <Col xs="2"></Col>
                                    </Row>
                                    <br />
                                    <br />
                                    <h4>3- Aprobación de actas</h4>
                                    <br />
                                    <MostrarActas actas={actas}/>
                                    <br />
                                    <br />
                                    <h4>4- Solicitudes</h4>
                                    <br />
                                    <MostrarSolicitudes solicitudes={solicitudes}/>
                                    <br />
                                    <h4>9- Informes </h4>
                                    <MostrarInformes informes={informes}/>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                    <Row>
                                        <Col xs="4"></Col>
                                        <Col xs="4"><Button className='text-light' color='custom-danger' onClick={()=>navigate('/agenda/revision')} block> Cerrar</Button></Col>
                                        <Col xs="4"></Col>
                                    </Row>
                                <br />
                                <br />
                        </Container>
        </React.Fragment>
  )
}
