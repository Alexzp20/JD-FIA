import React, {useEffect, useState} from 'react';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import ModalSolicitudes from './ModalSolicitudes';
import ModalEditarEstadoSolicitud from './ModalEditarEstadoSolicitud';
import TablaSolicitud from './TablaSolicitud';

const TablaSolicitudes = ({solicitudes, setSolicitudes, votaciones, setVotaciones}) => {

       //Hooks de arreglos para las solicitudes
       const [solicitudEditarEstado, setSolicitudEditarEstado ] = useState("");
       const [votacion, setVotacion ] = useState([]);
       const [solicitudesSeguimiento, setSolicitudesSeguimiento ] = useState([]);
       const [solicitudesAdminAcademicas, setSolicitudesAdminAcademicas ] = useState([]);
       const [solicitudesComiteTecnico, setSolicitudesComiteTecnico ] = useState([]);
       const [solicitudesProcesosGraduación, setSolicitudesProcesosGraduación ] = useState([]);
       const [solicitudesOtros, setSolicitudesOtros ] = useState([]);
       const [solicitudesFacultad, setSolicitudesFacultad ] = useState([]);
       const [solicitudesConErogacion, setSolicitudesConErogacion] = useState([]);
       const [solicitudesSinErogacion, setSolicitudesSinErogacion] = useState([]);
       const [solicitudesVarios, setSolicitudesVarios ] = useState([]);
       

        //Hacer un array de votaciones, luego en el metodo de añadir, crear el objeto votación y añadirlo al array para que se puedan hacer las votaciones


        useEffect(() => {

        var solicitudes = {
          "Seguimiento": solicitudesSeguimiento,
          "Asuntos de indole academia": {
            "Administración academica": solicitudesAdminAcademicas,
            "Comite tecnico asesor": solicitudesComiteTecnico,
            "Dirección general de procesos de graduación": solicitudesProcesosGraduación,
            "Otros": solicitudesOtros
          },
          "Funcionamiento de la facultad": solicitudesFacultad,
          "Movimiento de personal": {
            "Con erogación de fondos": solicitudesConErogacion,
            "Sin erogación de fondos": solicitudesSinErogacion
          },
          "Varios":solicitudesVarios
        }
  
        setSolicitudes(solicitudes)

        
        }, [solicitudesSeguimiento, solicitudesAdminAcademicas, solicitudesComiteTecnico, solicitudesProcesosGraduación,
          solicitudesOtros, solicitudesFacultad, solicitudesConErogacion, solicitudesSinErogacion, solicitudesVarios, setSolicitudes  
        ])
        

        useEffect(() => {
          setVotaciones(votacion)
        }, [votacion, setVotaciones]);

        const handleVotacion = (voto) =>{
            if (votacion.some((o) => o.solicitud_id === voto.solicitud_id)) {
              let votosFiltrados = votacion.filter((o) => o.solicitud_id !== voto.solicitud_id)
              setVotacion([...votosFiltrados, voto])  
          }
          else
          {
              setVotacion([...votacion, voto])  
          }
        }

        




     //hooks de estado del modal de solicitudes
     const [modal, setModal] = useState(false);
     const toggle = () => setModal(!modal);
     
     //hooks de estado del modal de solicitudes
     const [modalEstado, setModalEstado] = useState(false);
     const toggleEstado = (solicitud) => {

      setSolicitudEditarEstado(solicitud)
       setModalEstado(!modalEstado);
      }
      const togglemodalEstado = () => setModalEstado(!modalEstado);
      



      const anadirSolicitud = (solicitud, solicitudes, setSolicitudes) => {
        if (solicitudes.some((o) => o.id === solicitud.id)) {
            setSolicitudes(solicitudes.filter((o) => o.id !== solicitud.id))
        }
        else
        {
            setSolicitudes([...solicitudes, solicitud])  
        }
      }

      const handleSeleccion = (solicitud) => {

        switch(parseInt(solicitud.categoria_id)) {
            case 1:
                anadirSolicitud(solicitud, solicitudesSeguimiento, setSolicitudesSeguimiento)
              break;
            case 2:
              switch (parseInt(solicitud.subcategoria_id)) {
                case 1:
                      anadirSolicitud(solicitud, solicitudesAdminAcademicas, setSolicitudesAdminAcademicas)
                  break;
                case 2:
                    anadirSolicitud(solicitud, solicitudesComiteTecnico, setSolicitudesComiteTecnico)
                  break;
                case 3:
                    anadirSolicitud(solicitud, solicitudesProcesosGraduación, setSolicitudesProcesosGraduación)
                  break;
                case 4:
                  anadirSolicitud(solicitud, solicitudesOtros, setSolicitudesOtros)
                  break;
              
                default:
                  console.log("No existe la subcategoria")
                  break;
              }
              break;
            case 3:
                anadirSolicitud(solicitud, solicitudesFacultad, setSolicitudesFacultad)
              break;
            case 4:
              switch (parseInt(solicitud.subcategoria_id)) {
                case 5:
                      anadirSolicitud(solicitud, solicitudesConErogacion, setSolicitudesConErogacion)
                  break;
                case 6:
                    anadirSolicitud(solicitud, solicitudesSinErogacion,setSolicitudesSinErogacion)
                  break;
                default:
                  console.log("No existe la subcategoria")
                  break;
              }
              break;
            case 5:
                anadirSolicitud(solicitud, solicitudesVarios, setSolicitudesVarios)
              break;
            default:
              console.log("La opción no coincide con ninguna de las opciones conocidas");
          }
    
  };

  const eliminarElemento = (id, setSolicitudes, solicitudes) =>{
       setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id))
  };

  const subirElemento = (id, setSolicitudes) =>{
    setSolicitudes((prevSolicitudes) => {
      const index = prevSolicitudes.findIndex((solicitud) => solicitud.id === id);
      if (index > 0) {
        const newSolicitudes = [...prevSolicitudes];
        // Intercambiar el elemento actual con el anterior
        [newSolicitudes[index - 1], newSolicitudes[index]] = [newSolicitudes[index], newSolicitudes[index - 1]];
        return newSolicitudes;
      }
      return prevSolicitudes;
    });
  }



    return (
        <Container>
            <h5>4- Asignación de solicitudes</h5>
            <br />
            <Row>
                <Col xs="10"></Col>
                <Col xs="2">
                    <Button className='text-light' color='custom-success' onClick={toggle}>
                      Añadir Solicitud
                    </Button>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs="12 ">
                    <Table className='rounded' striped hover borderless>
                        <thead className='table-primary text-center'>
                            <tr>
                                <th>#</th>
                                <th>Descripción</th>
                                <th>Documento</th>
                                <th>Eliminar</th>
                                <th>Subir</th>
                                <th>Actualizar estado</th>
                            </tr>   
                        </thead>
                        <thead>
                          <tr><th colSpan={7}><h5>Seguimiento de acuerdos</h5></th></tr>
                        </thead>
                        <TablaSolicitud solicitudes={solicitudesSeguimiento} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesSeguimiento} />
                        <thead>
                          <tr><th colSpan={7}><h5>Asuntos de indole academica</h5></th></tr>
                        </thead>
                        <TablaSolicitud titulo="Administración academica" solicitudes={solicitudesAdminAcademicas} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesAdminAcademicas} />
                        <TablaSolicitud titulo="Comite tecnico asesor" solicitudes={solicitudesComiteTecnico} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesComiteTecnico}/>
                        <TablaSolicitud titulo="Dirección general de procesos de graduación" solicitudes={solicitudesProcesosGraduación} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesProcesosGraduación}/>
                        <TablaSolicitud titulo="Otros" solicitudes={solicitudesOtros} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesOtros}/>
                        
                        <thead>
                          <tr><th colSpan={7}><h5>Funcionamiento de la facultad</h5></th></tr>
                        </thead>
                        <TablaSolicitud  solicitudes={solicitudesFacultad} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesFacultad}/>
                        <thead>
                          <tr><th colSpan={7}><h5>Movimiento de personal</h5></th></tr>
                        </thead>
                        <TablaSolicitud titulo="Con erogación de fondos" solicitudes={solicitudesConErogacion} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesConErogacion}/>
                        <TablaSolicitud titulo="Sin erogación de fondos" solicitudes={solicitudesSinErogacion} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesSinErogacion}/>
                       
                        <thead>
                          <tr><th colSpan={7}><h5>Varios</h5></th></tr>
                        </thead>
                       <TablaSolicitud  solicitudes={solicitudesVarios} toggleEstado={toggleEstado} eliminarElemento={eliminarElemento} subirElemento={subirElemento} setSolicitudes={setSolicitudesVarios}/>
                    </Table>
                </Col>
            </Row>
            <ModalSolicitudes toggle={toggle} modal={modal} handleAsignacion={handleSeleccion} ></ModalSolicitudes>
            <ModalEditarEstadoSolicitud toggleEstado={togglemodalEstado} modalEstado={modalEstado} solicitud={solicitudEditarEstado} handleVotacion={handleVotacion} ></ModalEditarEstadoSolicitud>
        </Container>
    );
}

export default TablaSolicitudes;
