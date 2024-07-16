import React, { useEffect, useState } from 'react';
import { pedirAcuerdos } from '../../Helpers/pedirDatos';   
import FilaAcuerdo from './Filas/FilaAcuerdo';
import {  Col, Container, Input, Label, Row, Table } from 'reactstrap';
import NavBar from '../Navbar/NavBar';

const BusquedaAcuerdo = () => {

    const [acuerdos, setAcuerdos] = useState([]);
    const [acuerdosBusqueda, setAcuerdosBusqueda] = useState([]);
    const [busqueda, setBusqueda] = useState("");

      //funcion que guarda en la busqueda el valor del input de entrada
      const handleChange = e => {
        setBusqueda(e.target.value)
        filtrarBusqueda(e.target.value)
    }

     //funcion para filtrar la busqueda
     const filtrarBusqueda = (terminoBusqueda) => {
        var resultadosBusqueda = acuerdosBusqueda.filter((elemento) => {

            if (elemento.descripcion_acuerdo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setAcuerdos(resultadosBusqueda)
    }

    //hook para devolver los datos de las agendas
    useEffect(() => {
        pedirAcuerdos()
        .then((res)=>{
            setAcuerdos(res);
            setAcuerdosBusqueda(res);
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
                            <h1 className='text-center text-light'>Buscador de acuerdos</h1>
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
                                <thead className='table-primary '>
                                    <tr>    
                                        <th>#</th>
                                        <th>Descripción de la solicitud</th>
                                        <th>Descripción del acuerdo</th>
                                        <th>Documento de acuerdo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='table-light'>
                                {acuerdos.map((acuerdo)=><FilaAcuerdo key={acuerdo.id_evento} acuerdo={acuerdo}/>)}
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

export default BusquedaAcuerdo;
