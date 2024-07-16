import React from 'react';
import { Button, Container, Input, Label, Row, Col,Form} from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

const InicioSesion = () => {

    const {handleSubmit, control} = useForm();
    const navigate = useNavigate();
    const cookies = new Cookies(null, { path: '/' });




    const onSubmit = async (data) =>{

        let user = {
        "email": data.mailText,
        "password": data.userPass
        }
        try {
            const response = await fetch(`${REACT_API_BASE_URL}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
                    },
              body: JSON.stringify(user)
            });
      
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const rutas = data.rutas;
                const user = data.user;
                cookies.set('token',token);
                cookies.set('rutas',rutas);
                cookies.set('user',user);
                
                Swal.fire({
                    title: "Bienvenido",
                    text: "Sesión iniciada con exito",
                    icon: "success"
                });
                navigate('/inicio')

            } else {
                const errorData = await response.json();
                console.log(errorData)
                Swal.fire({
                    title: "Error",
                    text: "credenciales incorrectas",
                    icon: "error"
                });
            }
          } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error en la petición, intentelo mas tarde",
                icon: "error"
            });
          }
    




        }




    return (
        <Container fluid>
            <br />
            <br />
            <br />
            <Row>
                <Col xs="2"></Col>
                <Col xs="8">
                    <Container className=' bg-custom-dark rounded bg-opacity-75'> 
                        <br />
                        <Row>
                            <h2 className='text-center text-light'>Iniciar Sesion</h2>
                        </Row>
                        <br /> 
                        <Row>
                            <Col xs="1"></Col>
                            <Col xs="3" >
                            <img src="/images/inicioSesion/sesion.png" className= "img-fluid" alt="" />
                            </Col>
                            <Col xs="1"></Col>
                            <Col xs="6" >
                                <br />
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Label className='text-light' for="user"> Correo Electronico </Label>
                                    <Controller
                                                name="mailText"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                <Input
                                                    {...field} 
                                                    bsSize="sm"
                                                    className="mb-3 " 
                                                    id="user"
                                                    placeholder="Ingrese su correo electronico"
                                                    type="email"
                                                />}
                                        />  

                                    <Label className='text-light' for="password"> Contraseña </Label>
                                    <Controller
                                                name="userPass"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                <Input  
                                                    {...field}
                                                    bsSize="sm"
                                                    className="mb-3"
                                                    id="password"
                                                    placeholder="Ingrese su Contraseña"
                                                    type="password"
                                                />}
                                        />  
                                    <br />
                                    <Row>
                                        <Col xs='4'></Col>
                                        <Col xs='5'>
                                        <Button color="custom-success" className="text-light"type='submit'>
                                                Iniciar Sesion
                                        </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <br />
                        <br />
            </Container>
                </Col>
                <Col xs="2"></Col>
            </Row>
        </Container>
    );
}

export default InicioSesion;
