import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const ModalEditInforme = ({informe, toggleEdit, modalEdit,getInformes}) => {
  const {handleSubmit, control, watch, reset, formState: { errors },setValue} = useForm();
    const [documento, setDocumento ] = useState(null);
    const [remitentes, setRemitentes ] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get('token')

    useEffect(() => {
        setValue("codInforme", informe.codigo)
        setValue("remitenteInforme", informe.remitente_id)
    }, [setValue, informe]);


    useEffect(() => {
      fetch(`${REACT_API_BASE_URL}/remitentes`,{
       method: 'GET',
       headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
       }
   })
       .then(response => response.json())
       .then(data =>{ setRemitentes(data)})
       .catch(error => console.log(error));
      
   }, []);



    const onSubmit = async (data) =>{

        
        const form = new FormData();
        form.append('codigoInforme', data.codInforme);
        if(!documento) form.append('documentoInforme', documento);
        form.append('remitente', data.remitenteInforme);

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
               getInformes()
            } else {
                const errorData = await response.json();
                    Swal.fire({
                        title: "Error",
                        text: "El informe no se ha enviado",
                        icon: "error"
                    });
              console.error(errorData);
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
                                <Button className='m-2 text-light' color='custom-success' type='submit'>Editar</Button>
                                
                                <Button className='m-2 text-light' color='custom-danger' onClick={toggleEdit}>Cancelar</Button>
                            </Container>
                    </Form>
    </ModalBody>
</Modal>
  )
}
