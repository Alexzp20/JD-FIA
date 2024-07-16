import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardText, Col, Container, Row} from 'reactstrap';
import NavBar from '../Navbar/NavBar';

const MenuBuzon = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <br />
            <Container className='p-3 bg-custom-dark my-2 rounded bg-opacity-75' >
            <Row>
                <h3 className='text-center text-light'>Solicitudes</h3>
            </Row> 
            <br />
            <br />
            <br />
            <Container>
                    <Row>
                    <Col xs="2"></Col>
                    <Col xs = "2">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/buzon/nuevaSolicitud" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent "
                        >
                            
                            <CardBody>
                            <CardText tag={"h6"} className='text-center'>
                                Subida de solicitudes
                            </CardText>
                                <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src= "/images/Buzon/SubidaDoc.png"
                                    />
                                </CardBody>
                        </Card> 
                    </Link>
                    </Col>
                    <Col xs="1"></Col>
                    <Col xs = "2">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/buzon/revision" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent "
                        >
                            <CardBody>
                            <CardText tag={"h6"} className='text-center'>
                                Revisión de solicitudes
                            </CardText>
                                <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src= "/images/Buzon/Revision.png"
                                    />
                                </CardBody>
                        </Card> 
                    </Link>
                    </Col>
                    <Col xs="1"></Col>
                    <Col xs="2">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/buzon/historial" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent "
                        >
                            <CardBody>
                            <CardText tag={"h6"} className='text-center'>
                                Historial de documentos
                            </CardText>
                                <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src= '/images/Buzon/HistorialDocs.png'
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
    );
}

export default MenuBuzon;
