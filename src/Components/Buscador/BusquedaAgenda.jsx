import React, { useEffect, useState } from 'react';
import {  Col, Container, Input, Label, Row, Table } from 'reactstrap';
import { pedirAgendas } from '../../Helpers/pedirDatos';
import FilaAgenda from './Filas/FilaAgenda';
import NavBar from '../Navbar/NavBar';
import { REACT_API_BASE_URL } from '../../Api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token')

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

            if (elemento.numero.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setAgendas(resultadosBusqueda)
    }

    //hook para devolver los datos de las agendas
    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/indexPublicadas`, {
            headers: {
               'Authorization': `Bearer ${token}`
      },
        })
        .then(response => response.json())
        .then(data =>{ 
            setAgendas(data);
            setAgendasBusqueda(data);
          console.log(data)
            
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
                            <h1 className='text-center text-light'>Buscador de agendas</h1>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Label className="text-center text-light" for="inputBusqueda" sm="3">
                            Busqueda por Codigo
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
                                    <th>Fecha y hora </th>
                                    <th>Codigo de la agenda</th>
                                    <th>Convoca</th>
                                    <th>Lugar</th>
                                    <th>Acciones para la agenda</th>
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
