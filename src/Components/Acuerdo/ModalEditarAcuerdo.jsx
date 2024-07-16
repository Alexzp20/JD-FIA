import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const ModalEditarAcuerdo = ({toggleEdit, modalEdit,solicitud,getAcuerdos}) => {

    const {handleSubmit, control, reset, formState: { errors },setValue} = useForm();
    const [documento, setDocumento ] = useState(null);
    const cookies = new Cookies();
    const token = cookies.get('token')


    useEffect(() => {
        console.log(solicitud)
        if(solicitud !== null ){
            setValue('codAcuerdo', solicitud.acuerdos[0].codigo)
        }
    }, [solicitud,setValue]);



    const onSubmit = async (data) =>{

        const form = new FormData();
        form.append('solicitud',solicitud.id);
        form.append('codigoAcuerdo', data.codAcuerdo);
        documento && form.append('documentoAcuerdo', documento);
        


        try {
            const response = await fetch(`${REACT_API_BASE_URL}/acuerdo/${solicitud.acuerdos[0].id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': `Bearer ${token}` ,
                },
              method: 'POST',
              body: form
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Acuerdo Editado",
                    text: "El acuerdo se ha editado con exito ",
                    icon: "success"
                });
                console.log(response)
                reset()
                getAcuerdos()
                toggleEdit()
            } else {
                const errorData = await response.json();
                console.log(errorData)
                Swal.fire({
                    title: "Error, datos invalidos al editar",
                    text: "",
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
     <Modal scrollable size="lg" isOpen={modalEdit} toggle={toggleEdit}>
    <ModalHeader toggle={toggleEdit}>Editar Acuerdo</ModalHeader>
    <ModalBody>
        <Row>
            <Col xs="12">
                <Form  onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label  for="codAcuerdo">
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
                <Label for="archivoAcuerdo">
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
                <ModalFooter>
                    <Button className='text-light' color="custom-success" type='submit'>
                        Editar Solicitud
                    </Button>{' '}
                    <Button className='text-light' color="custom-danger" onClick={toggleEdit}>
                        Cancelar
                    </Button>
                </ModalFooter>
                </Form>
            </Col>
        </Row>
    </ModalBody>
</Modal>
  )
}
