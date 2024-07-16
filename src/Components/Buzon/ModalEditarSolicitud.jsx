import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export default function ModalEditarSolicitud({modalEdit, toggleEdit,solicitud, getSolicitudes}) {

    const {handleSubmit, control, watch, reset,setValue} = useForm();
    const [categorias, setCategorias ] = useState([]);
    const [subCategorias, setSubCategorias ] = useState([]);
    const idCategoriaSeleccionada = parseInt(watch('categoriaSolicitud', ''), 10);
    const cookies = new Cookies();
    const token = cookies.get('token')


      useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/categorias`,
            {
                headers: {
                 'Authorization': `Bearer ${token}`
                  },
                  method: 'GET',
            }
        )
         .then(response => response.json())
         .then(data =>{ 
            setCategorias(data); 
        })
         .catch(error => console.log(error));
        
     }, []);
         
     
     useEffect(() => {
         const categoria = categorias.find(cat => cat.id === parseInt(idCategoriaSeleccionada));
         if (categoria) {
             setSubCategorias(categoria.subcategorias);
             categoria.subcategorias.length > 0 ? setValue('subCategoriaSolicitud', solicitud.subcategoria_id) : setValue('subCategoriaSolicitud', ''); // Reset subcategory when category changes
            } else {
                setSubCategorias([]);
                setValue('subCategoriaSolicitud', '');
            }
        }, [idCategoriaSeleccionada, categorias, setValue]);


        
        useEffect(() => {
            setValue('codSolicitud', solicitud.codigo)
            setValue('descSolicitud', solicitud.descripcion)
            setValue('categoriaSolicitud', solicitud.categoria_id)
        }, [solicitud]);
    
    const onSubmit = async (data) =>{

        
        let solicitudEdit = {
            "codigo": data.codSolicitud,
            "descripcion": data.descSolicitud,
            "categoria_id": data.categoriaSolicitud,
            "subcategoria_id": !data.subCategoriaSolicitud? null : data.subCategoriaSolicitud
        }

        console.log({solicitudEdit})

        try {
            const response = await fetch(`${REACT_API_BASE_URL}/solicitud/edit/${solicitud.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
              method: 'PUT',
              body: JSON.stringify(solicitudEdit)
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Solicitud Editada",
                    text: "La solicitud se ha editado con exito ",
                    icon: "success"
                });
                console.log(response)
                reset()
                getSolicitudes()
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
    <ModalHeader toggle={toggleEdit}>Editar Solicitud</ModalHeader>
    <ModalBody>
        <Row>
                        <Col xs="12">
                            <Form  onSubmit={handleSubmit(onSubmit)} >
                                    <FormGroup>
                                        <Label for="codSolicitud">
                                            Codigo de la solicitud
                                        </Label>
                                        <Controller
                                            name="codSolicitud"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>  <Input {...field} type="text" id= "codSolicitud"  placeholder="Ingrese un codigo" />}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label  for="descSolicitud">
                                            Descripción de la solicitud
                                        </Label>
                                        <Controller
                                            name="descSolicitud"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>  <Input {...field} type="textarea" id= "descSolicitud" placeholder="Ingrese una descripción" />}
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                    <Label for="categoriaSolicitud">
                                        Categoria de la solicitud
                                    </Label>
                                    <Controller
                                            name="categoriaSolicitud"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (

                                                <Input {...field}type="select" id= "categoriaSolicitud">
                                                    <option value="" >Seleccione una opción</option>
                                                    {categorias.map((categoria) =><option value={categoria.id} key={categoria.id}>{categoria.name}</option>)}
                                                </Input>
                                            )}
                                        />
                                    
                                    </FormGroup>
                                    {subCategorias.length > 0 && (
                                        <FormGroup>
                                        <Label for="subCategoriaSolicitud">
                                            Subcategoria de la solicitud
                                        </Label>
                                        <Controller
                                                name="subCategoriaSolicitud"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
    
                                                    <Input {...field}type="select" id= "subCategoriaSolicitud">
                                                         <option value="" >Seleccione una opción</option>
                                                        {subCategorias.map((subcategoria) =><option value={subcategoria.id} key={subcategoria.id}>{subcategoria.name}</option>)}    
                                                    </Input>
                                                )}
                                            />
                                        
                                        </FormGroup>
                                    )}
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
