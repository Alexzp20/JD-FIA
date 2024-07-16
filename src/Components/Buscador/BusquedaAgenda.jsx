import React, { useEffect, useState } from 'react';
import {  Col, Container, Input, Label, Row, Table } from 'reactstrap';
import { pedirAgendas } from '../../Helpers/pedirDatos';
import FilaAgenda from './Filas/FilaAgenda';
import NavBar from '../Navbar/NavBar';

const BusquedaAgenda = () => {

    const [agendas, setAgendas] = useState([]);
    const [agendasBusqueda, setAgendasBusqueda] = useState([]);
    const [busqueda, setBusqueda] = useState("");

      //funcion que guarda en la busqueda el valor del input de entrada
      const handleChange = e => {
        setBusqueda(e.target.value)
        filtrarBusqueda(e.target.value)
    }

     //funcion para filtrar la busqueda
     const filtrarBusqueda = (terminoBusqueda) => {
        var resultadosBusqueda = agendasBusqueda.filter((elemento) => {

            if (elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setAgendas(resultadosBusqueda)
    }

    //hook para devolver los datos de las agendas
    useEffect(() => {
        pedirAgendas()
        .then((res)=>{
            setAgendas(res);
            setAgendasBusqueda(res);
        })
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
                            <h1 className='text-center text-light'>Buscador de agendas</h1>
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
                                        <th>Fecha de creación</th>
                                        <th>Descripción de la agenda</th>
                                        <th>Hora de inicio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='table-light'>
                                {agendas.map((agenda)=><FilaAgenda key={agenda.id_evento} agenda={agenda}/>)}
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

export default BusquedaAgenda;
