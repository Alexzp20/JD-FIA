import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardText, Col, Container, Row} from 'reactstrap';
import NavBar from '../Navbar/NavBar';


const MenuEstadistico = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <br />
            <Container className='p-3 bg-custom-dark my-2 rounded bg-opacity-75' >
            <Row>
                <h3 className='text-center text-light'>Estadisticos</h3>
            </Row> 
            <br />
            <br />
            <br />
            <Container>
                    <Row>
                    <Col xs="3"></Col>
                      <Col xs = "2">
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/estadistico/fechas" >
                            <Card
                                body
                                color="custom-secondary"
                                outline
                                className="bg-transparent"
                            >
                               
                                <CardBody>
                                <CardText tag={"h6"} className='text-center'>
                                    Por rango de fechas
                                </CardText>
                                    <CardImg 
                                        style={{filter: 'invert(100%)'}}
                                        alt="Card image cap"
                                        src= {process.env.PUBLIC_URL+"/images/Estadistico/calendario.png"}
                                        />
                                    </CardBody>
                            </Card> 
                        </Link>
                      </Col>
                      <Col xs="2"></Col>
                      <Col xs="2">
                      <Link style={{ textDecoration: 'none', color: 'white' }} to="/estadistico/areas" >
                            <Card
                                body
                                color="custom-secondary"
                                outline
                                className="bg-transparent"
                            >
                               
                                <CardBody>
                                <CardText tag={"h6"} className='text-center'>
                                    Por areas de acuerdos
                                </CardText>
                                   <CardImg 
                                        style={{filter: 'invert(100%)'}}
                                        alt="Card image cap"
                                        src= {process.env.PUBLIC_URL+"/images/estadistico/area.png"}
                                        />
                                    </CardBody>
                            </Card> 
                        </Link>
                      </Col>
                      <Col xs="3"></Col>
                    </Row> 
                </Container>
                <br />
            </Container>
            
        </React.Fragment>
    );
}

export default MenuEstadistico;
