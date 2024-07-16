import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Swal from 'sweetalert2';
import NavBar from '../Navbar/NavBar';
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const NuevoAcuerdo = () => {

    const {idSolicitud, idAgenda} = useParams()
    const {handleSubmit, control, reset, formState: { errors },setValue} = useForm();
    const [documento, setDocumento ] = useState(null);
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token = cookies.get('token')


    const onSubmit = async (data) =>{

        const form = new FormData();
        form.append('codigoAcuerdo', data.codAcuerdo);
        form.append('documentoAcuerdo', documento);
        form.append('solicitud', idSolicitud);

        try {
            const response = await fetch(`${REACT_API_BASE_URL}/acuerdo`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': `Bearer ${token}`
                    },
              body: form
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Acuerdo Añadido",
                    text: "El accuerdo se ha enviado con exito ",
                    icon: "success"
                });
               reset();
            } else {
                const errorData = await response.json();
                console.log(errorData)
                    Swal.fire({
                        title: "Error",
                        text: "",
                        icon: "error"
                    });
              console.error('');
            }
          } catch (error) {
            Swal.fire({
                    title: "Error en la solicitud",
                    text: {error},
                    icon: "error"
                });
          }


    }


  return (
    <React.Fragment>
    <NavBar/>
    <br />
    <Container>

    <Row>
    <Col xs="2"></Col>
    <Col xs="8">
        <Container className=' p-2 bg-custom-dark my-4 rounded bg-opacity-75' >
            <Row>
                <Col >
                    <h1 className='text-center text-light'>Nuevo Acuerdo</h1>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs="2"></Col>
                <Col xs="8">
                    <Form  onSubmit={handleSubmit(onSubmit)} >
                            <FormGroup>
                                <Label className='text-light' for="codAcuerdo">
                                    Codigo del acuerdo
                                </Label>
                                <Controller
                                    name="codAcuerdo"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) =>  <Input {...field} type="text" id= "codAcuerdo" bsSize="sm" placeholder="Ingrese un codigo" />}
                                />
                            </FormGroup>
                            <FormGroup>
                            <Label className='text-light' for="archivoAcuerdo">
                                    Documento del acuerdo
                            </Label>
                            <Controller
                                    name="archivoAcuerdo"
                                    control={control}
                                    defaultValue=""
                                    render={({ field, fieldState }) =>(
                                        <>
                                        <Input 
                                        {...field} 
                                        type="file" 
                                        id= "archivoAcuerdo"
                                        bsSize="sm"
                                        accept='.pdf'
                                        onChange={(e) => {
                                            setDocumento(e.target.files[0])
                                            field.onChange(e);
                                            field.onBlur(e);     
                                        }} 
                                        /> 
                                         {errors.archivoSolicitud && (
                                            <p style={{ color: 'red' }}>{errors.archivoSolicitud.message}</p>
                                        )}
                                        </>)}
                                        
                                          /* {{fieldState.error && (
                                            <FormFeedback>{fieldState.error.message}</FormFeedback>)}} */
                                />
                            </FormGroup>
                            <Container fluid className='text-center'>
                                <Button className='m-2 text-light' color='custom-success' type='submit'>Subir</Button>
                                
                                <Button className='m-2 text-light' color='custom-danger' onClick={()=>navigate(`/acuerdo/revision/${idAgenda}`)}>Cancelar</Button>
                            </Container>
                    </Form>
                </Col>
                <Col xs="2"></Col>

            </Row>
        </Container>
    </Col>  
    </Row>
    </Container>
    </React.Fragment>
  )
}
