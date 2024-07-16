import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import TablaSolicitud from './TablaSolicitud';

export const MostrarSolicitudes = ({solicitudes}) => {

  const [solicitudesSeguimiento, setSolicitudesSeguimiento ] = useState([]);
  const [solicitudesAdminAcademicas, setSolicitudesAdminAcademicas ] = useState([]);
  const [solicitudesComiteTecnico, setSolicitudesComiteTecnico ] = useState([]);
  const [solicitudesProcesosGraduación, setSolicitudesProcesosGraduación ] = useState([]);
  const [solicitudesOtros, setSolicitudesOtros ] = useState([]);
  const [solicitudesFacultad, setSolicitudesFacultad ] = useState([]);
  const [solicitudesConErogacion, setSolicitudesConErogacion] = useState([]);
  const [solicitudesSinErogacion, setSolicitudesSinErogacion] = useState([]);
  const [solicitudesVarios, setSolicitudesVarios ] = useState([]);


  useEffect(() => {
    
    solicitudes.forEach(solicitud => handleSeleccion(solicitud))

  }, [solicitudes]);




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

const anadirSolicitud = (solicitud, solicitudes, setSolicitudes) => {
  if (solicitudes.some((o) => o.id === solicitud.id)) {
  }
  else
  {
      setSolicitudes([...solicitudes, solicitud])  
  }
}

  return (
    <Table className='rounded' striped hover borderless>
                        <thead className='table-primary text-center'>
                            <tr>
                                <th>#</th>
                                <th>Codigo</th>
                                <th>Descripción</th>
                                <th>Documento</th>
                                <th>Categoria</th>
                                <th>Subcategoria</th>
                            </tr>   
                        </thead>
                        <thead>
                          <tr><th colSpan={7}><h5>Seguimiento de acuerdos</h5></th></tr>
                        </thead>
                        <TablaSolicitud solicitudes={solicitudesSeguimiento}  />
                        <thead>
                          <tr><th colSpan={7}><h5>Asuntos de indole academica</h5></th></tr>
                        </thead>
                        <TablaSolicitud titulo="Administración academica" solicitudes={solicitudesAdminAcademicas}  />
                        <TablaSolicitud titulo="Comite tecnico asesor" solicitudes={solicitudesComiteTecnico} />
                        <TablaSolicitud titulo="Dirección general de procesos de graduación" solicitudes={solicitudesProcesosGraduación} />
                        <TablaSolicitud titulo="Otros" solicitudes={solicitudesOtros} />
                        
                        <thead>
                          <tr><th colSpan={7}><h5>Funcionamiento de la facultad</h5></th></tr>
                        </thead>
                        <TablaSolicitud  solicitudes={solicitudesFacultad}/>
                        <thead>
                          <tr><th colSpan={7}><h5>Movimiento de personal</h5></th></tr>
                        </thead>
                        <TablaSolicitud titulo="Con erogación de fondos" solicitudes={solicitudesConErogacion} />
                        <TablaSolicitud titulo="Sin erogación de fondos" solicitudes={solicitudesSinErogacion} />
                       
                        <thead>
                          <tr><th colSpan={7}><h5>Varios</h5></th></tr>
                        </thead>
                       <TablaSolicitud  solicitudes={solicitudesVarios}/>
                    </Table>
  )
}
