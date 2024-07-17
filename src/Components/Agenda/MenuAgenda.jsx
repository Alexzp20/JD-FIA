import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardText, Col, Container, Row} from 'reactstrap';
import NavBar from '../Navbar/NavBar';

export const MenuAgenda = () => {
  return (
    <React.Fragment>
        <NavBar/>
            <br />
            <Container className='p-3 bg-custom-dark my-2 rounded bg-opacity-75' >
            <Row>
                <h3 className='text-center text-light'>Agenda</h3>
            </Row> 
            <br />
            <br />
            <br />
            <Container>
                    <Row>
                    <Col xs="2"></Col>
                    <Col xs = "2">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/agenda/nueva" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent "
                        >
                            
                            <CardBody>
                            <CardText tag={"h6"} className='text-center'>
                                Crear agenda nueva
                            </CardText>
                                <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src={process.env.PUBLIC_URL+"/images/MenuInicio/Nuevo.png"} 
                                    />
                                </CardBody>
                        </Card> 
                    </Link>
                    </Col>
                    <Col xs="1"></Col>
                    <Col xs = "2">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/agenda/revision" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent "
                        >
                            <CardBody>
                            <CardText tag={"h6"} className='text-center'>
                                Revisión de agendas
                            </CardText>
                                <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src= {process.env.PUBLIC_URL+"/images/Buzon/Revision.png"}
                                    />
                                </CardBody>
                        </Card> 
                    </Link>
                    </Col>
                    <Col xs="1"></Col>
                    <Col xs="2">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/agenda" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent "
                        >
                            <CardBody>
                            <CardText tag={"h6"} className='text-center'>
                               Historial de agendas
                            </CardText>
                                <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src= {process.env.PUBLIC_URL+"/images/Buzon/HistorialDocs.png"}
                                    />
                                </CardBody>
                        </Card> 
                    </Link>
                    </Col>
                    <Col xs="2"></Col>
                    </Row> 
                </Container>
                <br />
            </Container>
            
        </React.Fragment>
  )
}
