import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, FormFeedback } from 'reactstrap';
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
import { useParams } from 'react-router-dom';


const NuevaAgenda = () => {

    const {id} = useParams()

    const { handleSubmit: handleAgenda, control, formState: { errors }, setValue } = useForm();
    const [solicitudes , setSolicitudes] = useState ({});
    const [asistencias , setAsistencias] = useState ([]);
    const [actas , setActas] = useState ([]);
    const [votaciones , setVotaciones] = useState ([]);
    const [votacionesActas , setVotacionesActas] = useState ([]);
    const [informes , setInformes] = useState ([]);
    const [solicitudesEditar , setSolicitudesEditar] = useState ([]);
    const [asistenciasEditar , setAsistenciasEditar] = useState ([]);
    const [actasEditar , setActasEditar] = useState ([]);
    const [votacionesEditar , setVotacionesEditar] = useState ([]);
    const [votacionesActasEditar , setVotacionesActasEditar] = useState ([]);
    const [informesEditar , setInformesEditar] = useState ([]);
    const cookies = new Cookies();
    const token = cookies.get('token')
    
    useEffect(() => {
            
        if(id){
            fetch(`${REACT_API_BASE_URL}/agenda/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
              })
               .then(response => response.json())
               .then(data =>{ console.log(data)
                setActasEditar(data.actas)
                setInformesEditar(data.informes)
                setAsistenciasEditar(data.asistencias)
                setSolicitudesEditar(data.solicitudes)
                setVotacionesEditar(data.votaciones)
                setVotacionesActasEditar(data.votacionesActas)
                setValue("numAgenda",data.generales.numero)
                setValue("convoca",data.generales.convoca)
                setValue("lugar",data.generales.lugar)
                setValue("primeraConvocatoria",data.generales.primera_convocatoria)
                setValue("fechaAgenda",data.generales.fecha)
                setValue("tipoConvocatoria",data.generales.tipoConvocatoria)
                setValue("segundaConvocatoria",data.generales.segunda_convocatoria)
                setValue("horaInicio",data.generales.hora_inicio)
                setValue("horaFin",data.generales.hora_finalizacion)
                setValue("horaFin",data.generales.hora_finalizacion)
                setValue("votos", parseInt(data.asistencias.length))


               })
               .catch(error => console.log(error));
        }
           
     }, [id]);
  
    
      const onSubmitAgenda = async (data) =>{

        const generales = {...data}
        let url = '';
        id ===  null ? url = `${REACT_API_BASE_URL}/agenda` : url = `${REACT_API_BASE_URL}/agenda/${id}`;

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
            const response = await fetch(url, {
              method: id === null ? 'POST': 'PUT',
              headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
                    },
              body: JSON.stringify(agenda)
            });
      
            if (response.ok) {
                Swal.fire({
                    title: `Agenda ${id === null ? 'nueva': 'editada'}`,
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
                                        <h4>{id? "EDITAR AGENDA":"NUEVA AGENDA"}</h4>
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
                                                rules={{ required: "El código de la agenda es obligatorio" }}
                                                render={({ field }) => 
                                                    <>
                                                    <Input {...field} id="numAgenda" placeholder="Ingrese el numero de agenda" type="text" invalid={!!errors.numAgenda} />
                                                    {errors.numAgenda && (
                                                    <FormFeedback>{errors.numAgenda.message}</FormFeedback>
                                                    )}
                                                    </>
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
                                                rules={{ required: "Debe poner nombre de quien lo realiza" }}
                                                render={({ field }) => 
                                                    <>
                                                    <Input
                                                    {...field}
                                                    id="convoca"
                                                    placeholder="Ingrese un nombre"
                                                    type="text"
                                                    invalid={!!errors.convoca}
                                                    />
                                                    {errors.convoca && (
                                                    <FormFeedback>{errors.convoca.message}</FormFeedback>
                                                    )}
                                                    </>
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                        <FormGroup>
                                            <Label for="lugar">Lugar de convocatoria</Label>
                                            <Controller
                                                name="lugar"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: "Debe poner lugar donde se realizara" }}
                                                render={({ field }) => 
                                                    <>
                                                    <Input
                                                    {...field}
                                                    id="colugarnvoca"
                                                    placeholder="Ingrese un nombre"
                                                    type="text"
                                                    invalid={!!errors.lugar}
                                                    />
                                                    {errors.lugar && (
                                                    <FormFeedback>{errors.lugar.message}</FormFeedback>
                                                    )}
                                                    </>                                                  
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                        <FormGroup>
                                            <Label for="primeraConvocatoria">Primera Convocatoria</Label>
                                            <Controller
                                                name="primeraConvocatoria"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: "Debe poner hora" }}
                                                render={({ field }) =>
                                                    <>
                                                    <Input
                                                    {...field}
                                                    id="primeraConvocatoria"
                                                    type="time"
                                                    invalid={!!errors.primeraConvocatoria}
                                                    />
                                                    {errors.primeraConvocatoria && (
                                                    <FormFeedback>{errors.primeraConvocatoria.message}</FormFeedback>
                                                    )}
                                                    </> 
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
                                                rules={{ required: "Debe poner un dia" }}
                                                render={({ field }) => 
                                                    <>
                                                    <Input
                                                    {...field}
                                                    id="fechaAgenda"
                                                    type="date"
                                                    invalid={!!errors.fechaAgenda}
                                                    />
                                                    {errors.fechaAgenda && (
                                                    <FormFeedback>{errors.fechaAgenda.message}</FormFeedback>
                                                    )}
                                                    </>
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
                                                rules={{ required: "Debe poner hora" }}
                                                render={({ field }) =>
                                                <>
                                                <Input
                                                {...field}
                                                id="segundaConvocatoria"
                                                type="time"
                                                invalid={!!errors.segundaConvocatoria}
                                                />
                                                {errors.segundaConvocatoria && (
                                                <FormFeedback>{errors.segundaConvocatoria.message}</FormFeedback>
                                                )}
                                                </> 
                                            }/>  
                                        </FormGroup>
                                        <hr />
                                    </Col>
                                    <Col xs="2"></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col xs="12">
                                        <Asistencia setAsistencia={setAsistencias} asistenciasEditar={asistenciasEditar}/>
                                        <AprobacionAgenda Controller={Controller} errors={errors} control={control}/>
                                        <MenuActas votacionesActasEditar={votacionesActasEditar} setTotalActas={setActas} setVotaciones={setVotacionesActas} actasEditar={actasEditar}/>
                                        <TablaSolicitudes votacionesEditar={votacionesEditar} solicitudesEditar={solicitudesEditar} setSolicitudes={setSolicitudes} votaciones={votaciones} setVotaciones={setVotaciones}/>
                                        <MenuInformes informesEditar={informesEditar} setTotalInformes={setInformes}/>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                                <Row>
                                                    <Col xs="4"></Col>
                                                    <Col xs="4"><Button className='text-light' color='custom-success' type='submit' block>{id ? 'editar': 'añadir'} agenda</Button></Col>
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
