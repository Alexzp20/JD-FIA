import React, { useEffect, useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';
import Swal from 'sweetalert2';

const ModalEditUsuario = ({modalEdit, toggleEdit,usuario}) => {

    const {handleSubmit, control,watch,setValue} = useForm();
    const puesto = parseInt(watch('puestoUsuario', ''), 10);
    const [puestos, setPuestos] = useState([]);
    const [idEdit,setIdEdit] = useState('');
    const cookies = new Cookies();
    const token = cookies.get('token')

    const deshabilitar = () =>{
        if( puesto > 4 && puesto < 9) return true
        else return false
    }
    
    useEffect(() => {
        setValue('puestoUsuario',usuario.puesto_id)
        setValue('nombreUsuario',usuario.username)
        setValue('nombresUsuario',usuario.name)
        setValue('apellidoUsuario',usuario.apellido)
        setValue('correoUsuario',usuario.email)
        setValue('nacUsuario',usuario.fecha_nacimiento)
        setIdEdit(usuario.id)
    }, [setValue,usuario])
    

    
    useEffect(() => {

        fetch(`${REACT_API_BASE_URL}/puestos`, {
            headers: {
                'Authorization': `Bearer ${token}`
                } 
        })
        //pedirUsuarios()
        .then((data) => data.json())
        .then((res)=>{
            setPuestos(res);
        })
        
    }, []);
    
    const onSubmit = (data) =>{
        var newUser = { 
        }
        
        if(data.puestoUsuario === '5' || data.puestoUsuario === '6' || data.puestoUsuario === '7' || data.puestoUsuario === '8')
            {
                newUser = {
                    "username": data.nombreUsuario,
                    "name": data.nombresUsuario,
                    "apellido": null,
                    "email": data.correoUsuario,
                    "password": data.contraUsuario,
                    "password_confirmation": data.contrarepUsuario,
                    "fecha_nacimiento": null,
                    "puesto_id": parseInt(data.puestoUsuario),
                    }  
        }
        else{
                newUser = {
                    "username": data.nombreUsuario,
                    "name": data.nombresUsuario,
                    "apellido": data.apellidoUsuario,
                    "email": data.correoUsuario,
                    "password": data.contraUsuario,
                    "password_confirmation": data.contrarepUsuario,
                    "fecha_nacimiento": data.nacUsuario,
                    "puesto_id": parseInt(data.puestoUsuario),
                }
        }
        if(newUser.password === '' && newUser.password_confirmation === ''){
        newUser.password = null
        newUser.password_confirmation = null
        }

        console.log(newUser)
        fetch(`${REACT_API_BASE_URL}/users/${idEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
                        },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: "Usuario creado",
                text: "El usuario se añadio con exito",
                icon: "success"
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Error al añadir el usuario",
                icon: "error"
            });
        });

        }

    return (
        <Container className='p-3 my-4'>
            <Modal scrollable size="xl" isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Editar Usuario</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xs="6">
                            <FormGroup >
                                    <Label for="puestoUsuario">Puesto</Label>
                                    <Controller
                                            name="puestoUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Input  {...field} id="puestoUsuario" type="select">
                                                <option value="0">Seleccione una    </option>
                                                {puestos.map((puesto)=>{
                                                  return  <option value={puesto.id} key={puesto.id}>{puesto.name}</option>
                                                })}
                                                </Input>
                                            )}
                                        />
                                    
                                </FormGroup>
                                <FormGroup >
                                    <Label for="nombreUsuario">Nombre de usuario</Label>
                                    <Controller
                                            name="nombreUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="nombreUsuario"
                                            placeholder="Ingrese un nombre de usuario"
                                            type="text"
                                            />}
                                        />
                                    
                                </FormGroup>
                                <FormGroup >
                                    <Label for="nombresUsuario">Nombre</Label>
                                    <Controller
                                            name="nombresUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="nombresUsuario"
                                            placeholder="Ingrese un nombre"
                                            type="text"
                                            />
                                            }
                                        />


                                </FormGroup>
                                <FormGroup >
                                    <Label for="contraUsuario">Contraseña</Label>
                                    <Controller
                                            name="contraUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="contraUsuario"
                                            placeholder="Ingrese una contraseña"
                                            type="password"
                                            />
                                        }
                                        />
                                        <Label for="verContraseña">Ver Contraseña</Label> 
                                        <Controller
                                            name="verContra"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="verContra"
                                            type="checkbox"
                                            />
                                            }
                                        />
                                </FormGroup>
                            </Col>

                            <Col xs="6">
                                <FormGroup >
                                    <Label for="correoUsuario">Correo electronico</Label>
                                    <Controller
                                            name="correoUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="correoUsuario"
                                            placeholder="Ingrese correo electronico"
                                            type="email"
                                            />
                                            }
                                        />
                                </FormGroup>
                                <FormGroup >
                                    <Label for="apellidoUsuario">Apellidos</Label>
                                    <Controller
                                            name="apellidoUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="apellidoUsuario"
                                            placeholder="Ingrese un apellido"
                                            type="text"
                                            disabled={deshabilitar()}
                                            />
                                            }
                                        />
                                </FormGroup>
                                <FormGroup >
                                    <Label for="contrarepUsuario">Repetir contraseña</Label>
                                    <Controller
                                            name="contrarepUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="contrarepUsuario"
                                            placeholder="Ingrese una contraseña"
                                            type="password"
                                            />
                                            }
                                        />
                                </FormGroup>
                                <FormGroup >
                                    <Label for="nacUsuario">Fecha de nacimiento</Label>
                                    <Controller
                                            name="nacUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="nacUsuario"
                                            type="date"
                                            disabled={deshabilitar()}
                                            />
                                            }
                                        />
                                </FormGroup>
                               
                            </Col>
                        </Row>
                        <br />
                        <ModalFooter>
                    <Button className='text-light' color="custom-success" type='submit'>
                        Editar usuario
                    </Button>{' '}
                    <Button className='text-light' color="custom-danger" onClick={toggleEdit}>
                        Cancelar
                    </Button>
                </ModalFooter>
                    </Form>
                </ModalBody>
               
            </Modal>
        </Container>
    );
}

export default ModalEditUsuario;
