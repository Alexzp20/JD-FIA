import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => {
    return (
        <footer className='bg-custom-primary'>
        <Container fluid>
         <Row className='text-center text-light'>
             <Col xs="12">
             <p> Copyright © 2023, Universidad de El Salvador.</p>
             </Col>
         </Row>
        </Container>
     </footer>
    );
}

export default Footer;
