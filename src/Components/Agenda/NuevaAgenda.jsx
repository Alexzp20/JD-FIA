import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Asistencia from './1Asistencia/Asistencia';
import {useForm, Controller} from 'react-hook-form'; 
import AprobacionAgenda from './2Aprobacion/AprobacionAgenda';
import MenuActas from './3Actas/MenuActas';
import TablaSolicitudes from './4Solicitudes/TablaSolicitudes';
import { MenuInformes } from './9Informes/MenuInformes';
import Swal from 'sweetalert2';
import NavBar from '../Navbar/NavBar';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';


const NuevaAgenda = () => {

    const { handleSubmit: handleAgenda ,control} = useForm();
    const [solicitudes , setSolicitudes] = useState ({});
    const [asistencias , setAsistencias] = useState ([]);
    const [actas , setActas] = useState ([]);
    const [votaciones , setVotaciones] = useState ([]);
    const [votacionesActas , setVotacionesActas] = useState ([]);
    const [informes , setInformes] = useState ([]);
    const cookies = new Cookies();
    const token = cookies.get('token')
    

      const onSubmitAgenda = async (data) =>{

        const generales = {...data}
        
        let agenda = {
            "generales": generales,
            "asistencias": asistencias,
            "actas": actas,
            "solicitudes": solicitudes,
            "informes": informes,
            "votaciones": votaciones,
            "votacionesActas": votacionesActas
          }
          console.log(agenda)
        try {
            const response = await fetch(`${REACT_API_BASE_URL}/agenda`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
                    },
              body: JSON.stringify(agenda)
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Agenda Añadida",
                    text: "La Agenda se ha enviado con exito",
                    icon: "success"
                });
            
            } else {
                const errorData = await response.json();
                Swal.fire({
                    title: "Error",
                    text: "",
                    icon: "error"
                });
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
                        <Container className='bg-custom-dark my-4  py-2 rounded bg-opacity-75' >
                             <br />
                             <Form  className="bg-custom-light rounded mb-3 py-3" onSubmit={handleAgenda(onSubmitAgenda)} >
                                <Row>
                                    <Col className='text-center'>
                                        <h4>UNIVERSIDAD DE EL SALVADOR</h4>
                                        <h4>FACULTAD DE INGENIERIA</h4>
                                        <h4>JUNTA DIRECTIVA</h4>
                                        <h4>NUEVA AGENDA</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4"></Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label for="numAgenda">Agenda No.</Label>
                                            <Controller
                                                name="numAgenda"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                    <Input
                                                    {...field}
                                                    id="numAgenda"
                                                    placeholder="Ingrese el numero de agenda"
                                                    type="text"
                                                    />
                                                 }/>  
                                        </FormGroup>
                                        <hr />
                                       
                                    </Col>
                                    <Col xs="4"></Col>
                                </Row>
                                <Row>
                                    <Col xs="2"></Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label for="convoca">Convoca</Label>
                                            <Controller
                                                name="convoca"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                    <Input
                                                    {...field}
                                                    id="convoca"
                                                    placeholder="Ingrese un nombre"
                                                    type="text"
                                                    />
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                        <FormGroup>
                                            <Label for="lugar">Lugar de convocatoria</Label>
                                            <Controller
                                                name="lugar"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                    <Input
                                                    {...field}
                                                    id="lugar"
                                                    placeholder="Ingrese un lugar"
                                                    type="text"
                                                    />
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                        <FormGroup>
                                            <Label for="primeraConvocatoria">Primera Convocatoria</Label>
                                            <Controller
                                                name="primeraConvocatoria"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                    <Input
                                                    {...field}
                                                    id="primeraConvocatoria"
                                                    type="time"
                                                    />
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label for="fechaAgenda">Dia</Label>
                                            <Controller
                                                name="fechaAgenda"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                    <Input
                                                    {...field}
                                                    id="fechaAgenda"
                                                    type="date"
                                                    />
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                        
                                        <FormGroup>
                                            <Label for="tipoConvocatoria">Tipo de convocatoria</Label>
                                            <Controller
                                                name="tipoConvocatoria"
                                                control={control}
                                                defaultValue="ordinario"
                                                render={({ field }) => 
                                                    <Input
                                                    {...field}
                                                    id="tipoConvocatoria"
                                                    type="select"
                                                    >
                                                    <option value="ordinario">
                                                        ordinaria
                                                    </option>
                                                    <option value="extraordinario">
                                                        extraordinaria
                                                    </option>
                                                    </Input>
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                        <FormGroup>
                                            <Label for="segundaConvocatoria">Segunda Convocatoria</Label>
                                            <Controller
                                                name="segundaConvocatoria"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                <Input
                                                {...field}
                                                id="segundaConvocatoria"
                                                type="time"
                                                />
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                    </Col>
                                    <Col xs="2"></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col xs="12">
                                        <Asistencia setAsistencia={setAsistencias}/>
                                        <AprobacionAgenda Controller={Controller} control={control}/>
                                        <MenuActas setTotalActas={setActas} setVotaciones={setVotacionesActas}/>
                                        <TablaSolicitudes setSolicitudes={setSolicitudes} solicitudes={solicitudes} votaciones={votaciones} setVotaciones={setVotaciones}/>
                                        <MenuInformes setTotalInformes={setInformes}/>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                                <Row>
                                                    <Col xs="4"></Col>
                                                    <Col xs="4"><Button className='text-light' color='custom-success' type='submit' block> añadir agenda</Button></Col>
                                                    <Col xs="4"></Col>
                                                </Row>
                                <br />
                                <br />
                                </Form >
                        </Container>
        </React.Fragment>
    );
}

export default NuevaAgenda;
