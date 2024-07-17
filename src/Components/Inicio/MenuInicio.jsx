import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Card, CardBody, CardHeader, CardImg, Col} from 'reactstrap';
import Cookies from 'universal-cookie';
import NavBar from '../Navbar/NavBar';

const MenuInicio = () => {

    const [opciones, setOpciones] = useState([]);
    const cookies = new Cookies();
    const rutas = cookies.get('rutas')

    useEffect(() => {
        setOpciones(rutas)
    }, []);

    return (
        <React.Fragment>
            <NavBar/>
            <br />
            <Container className='p-4 bg-custom-dark my-2 rounded bg-opacity-75' >
                <Row>
                    <h3 className='text-center text-light'>Bienvenido</h3>
                </Row> 
                <Row>
                    <h6 className='text-center text-light'>Seleccione la opción que desee</h6>
                </Row> 
                <br />
                <br />
                <br />
                <br />
                <Container>
                    <Row>
                    {opciones.map((opcion)=>
                            <React.Fragment key={opcion.id}>
                                {/*INICIO DEL CARD */}
                                <Col xs = "3">
                                    <br />
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={opcion.ruta} >
                                        <Card
                                            body
                                            color="custom-secondary"
                                            outline
                                            className="bg-custom-primary"
                                            style={{display:'grid', justifyItems: 'center'}}
                                        >
                                            <CardHeader tag={"h4"} className='text-center'>
                                                {opcion.titulo}
                                            </CardHeader>
                                            <CardBody>
                                                <CardImg
                                                    style={{filter: 'invert(100%)', width:"5rem", aspectRatio: 20/22    }}
                                                    alt="Card image cap"
                                                    src={process.env.PUBLIC_URL+opcion.ruta_imagen}
                                                    />
                                                </CardBody>
                                        </Card> 
                                    </Link>
                                 </Col>
                                {/*FIN DEL CARD*/}
                         </React.Fragment>
                        )}
                    </Row> 
                </Container>
            </Container>
        </React.Fragment>  
    );
}

export default MenuInicio;
