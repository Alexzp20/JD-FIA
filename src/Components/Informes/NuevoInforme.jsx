import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Swal from 'sweetalert2';
import NavBar from '../Navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const NuevoInforme = () => {

    const {handleSubmit, control, reset, setValue,formState: { errors }} = useForm();
    const [documento, setDocumento ] = useState(null);
    const [remitentes, setRemitentes ] = useState([]);
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token = cookies.get('token') 
    const fileInputRef = useRef(null);


    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/remitentes`,{
         method: 'GET',
         headers: {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json'
         }
     })
         .then(response => response.json())
         .then(data =>{ setRemitentes(data); console.log(data)})
         .catch(error => console.log(error));
        
     }, []);



    const onSubmit = async (data) =>{

        const form = new FormData();
        form.append('codigoInforme', data.codInforme);
        form.append('documentoInforme', documento);
        form.append('remitente', data.remitenteInforme);
        
        try {
            const response = await fetch(`${REACT_API_BASE_URL}/informe`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
                },
              body: form
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Informe Añadido",
                    text: "El informe se ha enviado con exito ",
                    icon: "success"
                });
               reset();
               setDocumento(null)
               setValue("archivoSolicitud", "")
               if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            } else {
                const errorData = await response.json();
                console.log(errorData)
                    Swal.fire({
                        title: "Error",
                        text: "El informe no se ha enviado",
                        icon: "error"
                    });
              console.error('');
            }
          } catch (error) {
            Swal.fire({
                    title: "Error en la petición",
                    text: {error},
                    icon: "error"
                });
          }


    }



  return (
    <React.Fragment>
        <NavBar/>
    <Container>
    <Row>
    <Col xs="2"></Col>
    <Col xs="8">
        <Container className=' p-2 bg-custom-dark my-4 rounded bg-opacity-75' >
            <Row>
                <Col >
                    <h1 className='text-center text-light'>Nuevo Informe</h1>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs="2"></Col>
                <Col xs="8">
                    <Form  onSubmit={handleSubmit(onSubmit)} >
                            <FormGroup>
                                <Label className='text-light' for="codInforme">
                                    Codigo del informe
                                </Label>
                                <Controller
                                    name="codInforme"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "El código del informe es obligatorio" }}
                                    render={({ field }) => (
                                     <>
                                         <Input {...field} type="text" id= "codInforme" bsSize="sm" placeholder="Ingrese un codigo" invalid={!!errors.codInforme} />
                                        {errors.codInforme && (
                                        <FormFeedback>{errors.codInforme.message}</FormFeedback>
                                        )}
                                    </>
                                    )} 
                                    
                                />
                            </FormGroup>
                            <FormGroup>
                            <Label className='text-light' for="archivoInforme">
                                    Documento del informe
                            </Label>
                            <Controller
                                    name="archivoInforme"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Debe seleccionar un archivo .pdf",
                                        validate: {
                                            fileFormat: value => {
                                                const file = value && value[0];
                                                return file && file.type === 'application/pdf' || "El archivo debe ser un PDF";
                                            },
                                            fileSize: value => {
                                                const file = value && value[0];
                                                return file && file.size <= 524288000 || "El archivo debe ser menor o igual a 500 MB";
                                            }
                                        }
                                    }}
                                    render={({ field, fieldState }) =>(
                                        <>
                                        <Input
                                            type="file"
                                            id="archivoInforme"
                                            bsSize="sm"
                                            accept='.pdf'
                                            innerRef={fileInputRef}
                                            onChange={(e) => {
                                                    setDocumento(e.target.files[0]);
                                                    field.onChange(e.target.files);
                                                    field.onBlur();
                                            }}
                                            invalid={!!errors.archivoInforme}
                                                /> 
                                         {errors.archivoInforme && (
                                                    <FormFeedback>{errors.archivoInforme.message}</FormFeedback>
                                                )}

                                        </>)}
                                />
                            </FormGroup>
                            <FormGroup>
                                    <Label className='text-light' for="remitenteInforme">
                                        Remitente del informe
                                    </Label>
                                    <Controller
                                            name="remitenteInforme"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (

                                                <Input {...field} type="select" id= "remitenteInforme" bsSize="sm"  >
                                                    <option value=""  >Seleccione una opción</option>
                                                    {remitentes.map((remitente) =><option value={remitente.id} key={remitente.id}>{remitente.name}</option>)}
                                                </Input>
                                            )}
                                            />
                            </FormGroup>


                            <Container fluid className='text-center'>
                                <Button className='m-2 text-light' color='custom-success' type='submit'>Subir</Button>
                                
                                <Button className='m-2 text-light' color='custom-danger'onClick={()=>navigate('/informe')}>Cancelar</Button>
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
