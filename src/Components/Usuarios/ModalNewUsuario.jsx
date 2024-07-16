import React, { useEffect, useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

const ModalNewUsuario = ({modalNew, toggleNew, consumo}) => {

    const {handleSubmit, control,watch,reset} = useForm();

    const [roles, setRoles] = useState([]);
    const [puestos, setPuestos] = useState([]);
    const rol = parseInt(watch('rolUsuario', ''), 10);
    const cookies = new Cookies();
    const token = cookies.get('token')
    
    const deshabilitar = () =>{
        if(rol === 3  || rol === 4 ) return true
        else return false
    }
    
    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/rols`, {
            headers: {
                'Authorization': `Bearer ${token}`
                } 
        })
        .then((data) => data.json())
        .then((res)=>{
            setRoles(res);
        })
        
        fetch(`${REACT_API_BASE_URL}/puestos`, {
            headers: {
                'Authorization': `Bearer ${token}`
                } 
        })
        .then((data) => data.json())
        .then((res)=>{
            setPuestos(res);
        })
        
    }, []);
    
    const  onSubmit = async (data) =>{
        var newUser = { 
        }
        
        if(data.rolUsuario === '1' || data.rolUsuario === '2' )
        {
            newUser = {
                "username": data.puestoEspUsuario,
                "name": data.nombresUsuario,
                "apellido": data.apellidoUsuario,
                "email": data.correoUsuario,
                "password": data.contraUsuario,
                "password_confirmation": data.contrarepUsuario,
                "fecha_nacimiento": data.nacUsuario,
                "puesto_id": parseInt(data.puestoUsuario),
                "role_id": parseInt(data.rolUsuario)
            }
        }
        else{
            newUser = {
                "username": "escuela/unidad",
                "name": data.nombresUsuario,
                "apellido": null,
                "email": data.correoUsuario,
                "password": data.contraUsuario,
                "password_confirmation": data.contrarepUsuario,
                "puesto_id": null,
                "role_id": parseInt(data.rolUsuario)
                 }  
        }
        try {
            const response = await fetch(`${REACT_API_BASE_URL}/user`, {
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                },
              method: 'POST',
              body:  JSON.stringify(newUser)
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Usuario creado",
                    text: "El usuario se añadio con exito",
                    icon: "success"
                });
               reset();
               consumo()
            } else {
                const errorData = await response.json();
                console.log(errorData);
                Swal.fire({
                    title: "Error",
                    text: "Error al añadir el usuario",
                    icon: "Error"
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
        <Container className='p-3 my-4'>
            <Modal scrollable size="xl" isOpen={modalNew} toggle={toggleNew}>
                <ModalHeader toggle={toggleNew}>Nuevo usuario</ModalHeader>
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
                                                <Input  {...field} id="puestoUsuario" type="select"  disabled={deshabilitar()}>
                                                <option value="0">Seleccione una    </option>
                                                {puestos.map((puesto)=>{
                                                  return  <option value={puesto.id} key={puesto.id}>{puesto.name}</option>
                                                })}
                                                </Input>
                                            )}
                                        />
                                    
                                </FormGroup>
                                <FormGroup >
                                    <Label for="puestoEspUsuario">Puesto (Especifico)</Label>
                                    <Controller
                                            name="puestoEspUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <Input
                                            {...field}
                                            id="puestoEspUsuario"
                                            placeholder="Ingrese un nombre de usuario"
                                            type="text"
                                            disabled={deshabilitar()}
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
                                </FormGroup>
                            </Col>

                            <Col xs="6">
                            <FormGroup >
                                    <Label for="rolUsuario">Rol</Label>
                                    <Controller
                                            name="rolUsuario"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                    <Input {...field} id="rolUsuario" type="select">
                                    {roles.map((rol)=>{
                                      return  <option value={rol.id} key={rol.id}>{rol.name}</option>
                                    })}
                                    </Input>)}
                                        />                          
                                </FormGroup>
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
                        Añadir usuario
                    </Button>{' '}
                    <Button className='text-light' color="custom-danger" onClick={toggleNew}>
                        Cancelar
                    </Button>
                </ModalFooter>
                    </Form>
                </ModalBody>
               
            </Modal>
        </Container>
        );
        
}

export default ModalNewUsuario;
