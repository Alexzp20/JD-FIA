import React, { useEffect, useState } from 'react';
import { Col, Container, Input, Label, Row, Table } from 'reactstrap';
import { pedirEstFechas } from '../../Helpers/estadisticos';
import NavBar from '../Navbar/NavBar';

const EstAreas = () => {

     /* 
    const [acuerdos, setAcuerdos] = useState([]);

    //hook para devolver los datos de las agendas
  useEffect(() => {
        pedirEstFechas()
        .then((res)=>{
            setAcuerdos(res)
        })
    }, []);*/

    return (
        <React.Fragment>
        <NavBar/>
        <Container>
            <Row>
                <Col xs="12">
                    <Container className=' p-2 bg-custom-dark my-4 rounded bg-opacity-75' >
                        <br />
                    <Row>
                        <Col >
                            <h1 className='text-center text-light'>Estadisticas de acuerdos por areas</h1>
                        </Col>
                       
                    </Row>
                    <br />
                    <Row>
                            <Col xs="2"></Col>
                            <Col xs="3" className='text-center text-light'> <Label>Ingrese una area de acuerdos</Label></Col>
                            <Col xs="2"></Col>
                            <Col xs="3"> <Input type="select"/></Col>
                            <Col xs="3"></Col>  
                            <Col xs="2"></Col>
                    </Row>
                    <br />  
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col xs="12">
                        <Table bordered className='text-center' size="sm">
                          
                            <thead>
                                <tr><th className='table-info' colSpan="2">Estadistico de acuerdos para el area X en total</th></tr>
                                <tr>
                                    <th>Subcategorias</th>
                                    <th>N°</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ><th scope='row' className='table-info' colSpan="2">Categoria 1</th></tr>
                                <tr >
                                    <th scope='row'>Subcategoria 1</th>
                                    <td> 32</td>
                                </tr> 
                                <tr >
                                    <th scope='row'>Subcategoria 2</th>
                                    <td> 47</td>
                                </tr>
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

export default EstAreas;
