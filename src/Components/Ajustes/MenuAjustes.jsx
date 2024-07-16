import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row} from 'reactstrap';
import NavBar from '../Navbar/NavBar';

const MenuAjustes = () => {
    return (
        <React.Fragment>
            <NavBar/>
        <Container className=' p-2 bg-custom-dark my-4 bg-opacity-75'>
            <Row>
                <Col xs="12">
                    <h1 className='text-center text-light'>Configuraciones</h1>
                </Col>
            </Row>
            <br />
            <br />
            <Row className='text-center text-light'>
                <Col xs="4"><h4>Sección 1</h4></Col>
                <Col xs="4"><h4>Sección 2</h4></Col>
                <Col xs="4"><h4>Sección 3</h4></Col>
            </Row>
            <br />
            <Row className='text-center'>
                <Col xs="4"> <Link style={{ textDecoration: 'none', color: 'White' }} to="/ajustes/usuarios" ><h6>Gestion de usuarios</h6></Link></Col>
                <Col xs="4"> <Link style={{ textDecoration: 'none', color: 'White' }} to="/buzon" ><h6>Opción 2</h6></Link></Col>
                <Col xs="4"> <Link style={{ textDecoration: 'none', color: 'White' }} to="/buzon" ><h6>Opción 3</h6></Link></Col>
            </Row>
        </Container>
        </React.Fragment>
        );
}

export default MenuAjustes;
