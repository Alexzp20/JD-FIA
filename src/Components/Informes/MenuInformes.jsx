import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardText, Col, Container, Row} from 'reactstrap';
import NavBar from '../Navbar/NavBar';

export const MenuInformes = () => {
    return (
        <React.Fragment>
        <NavBar/>
        <Container className='p-3 bg-custom-dark my-5 rounded bg-opacity-75' >
    
        <Row className='p-2'>
            <h3 className='text-center text-light'>Informes</h3>
        </Row> 
        <br />
        <br />
        <br />
        <Container>
                <Row>
                <Col xs="3"></Col>
                  <Col xs = "2">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/informe/nuevo" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent"
                        >
                           
                            <CardBody>
                            <CardText tag={"h6"} className='text-center pb-2'>
                                Ingresar informes
                            </CardText>
                                <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src= "/images/Informe/nuevo.png"
                                    />
                                </CardBody>
                        </Card> 
                    </Link>
                  </Col>
                  <Col xs="2"></Col>
                  <Col xs="2">
                  <Link style={{ textDecoration: 'none', color: 'white' }} to="/informe/gestion" >
                        <Card
                            body
                            color="custom-secondary"
                            outline
                            className="bg-transparent"
                            >
                           
                            <CardBody>
                            <CardText tag={"h6"} className='text-center pb-2'>
                                Gestionar informes
                            </CardText>
                               <CardImg 
                                    style={{filter: 'invert(100%)'}}
                                    alt="Card image cap"
                                    src= '/images/Informe/gestion.png'
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
      )
}
