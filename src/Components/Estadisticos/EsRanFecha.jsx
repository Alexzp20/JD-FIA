import React, { useEffect, useState } from 'react';
import { Col, Container, Input, Label, Row, Table } from 'reactstrap';
import { pedirEstFechas } from '../../Helpers/estadisticos';
import ContenidoFechas from './ContenidoFechas';
import NavBar from '../Navbar/NavBar';


const EstRanFecha = () => {

    const [acuerdos, setAcuerdos] = useState([]);

    //hook para devolver los datos de las agendas
    useEffect(() => {
        pedirEstFechas()
        .then((res)=>{
            setAcuerdos(res)
        })
    }, []);


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
                            <h1 className='text-center text-light'>Estadisticas de acuerdos por rango de fechas</h1>
                        </Col>
                       
                    </Row>
                    <br />
                    <Row>
                            <Col xs="2"></Col>
                            <Col xs="3" className='text-center text-light'> <Label>Ingrese una fecha de inicio</Label></Col>
                            <Col xs="2"></Col>
                            <Col xs="3" className='text-center text-light'> <Label>Ingrese una fecha de inicio</Label></Col>
                            <Col xs="3"></Col>  
                            <Col xs="2"></Col>
                    </Row>
                    <Row>
                            <Col xs="2"></Col>
                            <Col xs="3"> <Input type="date"/></Col>
                            <Col xs="2"></Col>
                            <Col xs="3"><Input type="date"/></Col>
                            <Col xs="2"></Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col xs="12">
                        <Table bordered className='text-center' size="sm">
                          
                            <thead>
                                <tr><th className='table-info' colSpan="2">Estadistico de acuerdos en el periodo de X hasta Y</th></tr>
                                <tr>
                                    <th>Subcategorias</th>
                                    <th>N°</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acuerdos.map((acuerdo)=>{
                                    return(
                                        <React.Fragment>
                                        <tr key={acuerdo.id}><th scope='row' className='table-info' colSpan="2">{acuerdo.categoria}</th></tr>
                                        <ContenidoFechas sub={acuerdo.subCategoria}/> 
                                        </React.Fragment>
                                        
                                    )           
                                })}
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

export default EstRanFecha;
