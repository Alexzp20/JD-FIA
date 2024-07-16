import React, { useEffect, useState } from 'react';
import { pedirSolicitudes } from '../../Helpers/pedirDatos';
import {  Col, Container, Input, Label, Row, Table } from 'reactstrap';
import FilaSolicitud from './Filas/FilaSolicitud';
import NavBar from '../Navbar/NavBar';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

const BusquedaSolicitud = () => {

    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudesBusqueda, setSolicitudesBusqueda] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const cookies = new Cookies();
    const token = cookies.get('token')

      //funcion que guarda en la busqueda el valor del input de entrada
      const handleChange = e => {
        setBusqueda(e.target.value)
        filtrarBusqueda(e.target.value)
    }

     //funcion para filtrar la busqueda
     const filtrarBusqueda = (terminoBusqueda) => {
        var resultadosBusqueda = solicitudesBusqueda.filter((elemento) => {

            if (elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setSolicitudes(resultadosBusqueda)
    }

    //hook para devolver los datos de las agendas
    useEffect(() => {

        fetch(`${REACT_API_BASE_URL}/solicitudes`, {
            headers: {
               'Authorization': `Bearer ${token}`
      },
        })
        .then(response => response.json())
        .then(data =>{ setSolicitudes(data);
            setSolicitudesBusqueda(data);
            
            console.log(data)})
        .catch(error => console.log(error));
        

    }, []);


    return (
        <React.Fragment>
            <NavBar/>
        <Container>
        <Row>
        <Col xs="12">
        <Container className=' p-2 bg-secondary my-4 rounded bg-opacity-75' >
                <Row>
                    <Col >
                        <h1 className='text-center text-light'>Buscador de Solicitudes</h1>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Label className="text-center text-light" for="inputBusqueda" sm="3">
                        Busqueda por descripción
                    </Label>
                    <Col sm="7">
                        <Input
                            id="inputBusqueda"
                            placeholder="Ingrese una busqueda"
                            type="text"
                            value={busqueda}
                            onChange={handleChange}
                        />
                    </Col>
                    
                </Row>
                <br />
                <br />
                <Row>
                    <Col xs='12'>
                        <Table bordered striped className='text-center'>
                            <thead className='table-primary'>
                                <tr>    
                                    <th>#</th>
                                    <th>Fecha/hora de subida</th>
                                    <th>Codigo de la solicitud</th>
                                    <th>Descripción de la solicitud</th>
                                    <th>Documento de acuerdo</th>
                                    <th>Estado de la solicitud</th>
                                </tr>
                            </thead>
                            <tbody className='table-light'>
                            {solicitudes.map((solicitud)=><FilaSolicitud key={solicitud.id} solicitud={solicitud}/>)}
                            </tbody>
                        </Table>
                    </Col>                          
                </Row>
        </Container>
        </Col>
        </Row>
        </Container>
        </React.Fragment>
    );
}

export default BusquedaSolicitud;
