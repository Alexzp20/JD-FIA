import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const ModalEditInforme = ({informe, toggleEdit, modalEdit}) => {
  const {handleSubmit, control, watch, reset, formState: { errors },setValue} = useForm();
    const [documento, setDocumento ] = useState(null);
    const cookies = new Cookies();
    const token = cookies.get('token')

    useEffect(() => {
        setValue("codActa", informe.codigo)
    }, [setValue, informe]);


    const onSubmit = async (data) =>{

        const form = new FormData();
        form.append('codigoInforme', data.codInforme);
        form.append('documentoInforme', documento);

        try {
            const response = await fetch(`${REACT_API_BASE_URL}/informe/${informe.id}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
                }, 
              body: form
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Informe Editado",
                    text: "El informe se ha editado con exito ",
                    icon: "success"
                });
               reset();
               toggleEdit()
            } else {
                const errorData = await response.json();
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
    <Modal scrollable size="lg" isOpen={modalEdit} toggle={toggleEdit}>
    <ModalHeader toggle={toggleEdit}>Editar Informe</ModalHeader>
    <ModalBody>
        <Form  onSubmit={handleSubmit(onSubmit)} >
                            <FormGroup>
                                <Label  for="codInforme">
                                    Codigo del informe
                                </Label>
                                <Controller
                                    name="codInforme"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) =>  <Input {...field} type="text" id= "codInforme" bsSize="sm" placeholder="Ingrese un codigo" />}
                                />
                            </FormGroup>
                            <FormGroup>
                            <Label  for="archivoActa">
                                    Documento del informe
                            </Label>
                            <Controller
                                    name="archivoActa"
                                    control={control}
                                    defaultValue=""
                                    render={({ field, fieldState }) =>(
                                        <>
                                        <Input 
                                        {...field} 
                                        type="file" 
                                        id= "archivoActa"
                                        bsSize="sm"
                                        accept='.pdf'
                                        onChange={(e) => {
                                            setDocumento(e.target.files[0])
                                            field.onChange(e);
                                            field.onBlur(e);  
                                            console.log(!!fieldState.error, fieldState.error)     
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
                                <Button className='m-2 text-light' color='custom-success' type='submit'>Editar</Button>
                                
                                <Button className='m-2 text-light' color='custom-danger' onClick={toggleEdit}>Cancelar</Button>
                            </Container>
                    </Form>
    </ModalBody>
</Modal>
  )
}
