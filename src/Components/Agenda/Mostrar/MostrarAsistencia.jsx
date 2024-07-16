import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import FilaAsistencia from '../1Asistencia/FilaAsistencia';

export const MostrarAsistencia = ({asistencia}) => {
    
    const [asistentesPropietarios, setAsistentesPropietarios] = useState([]);
    const [asistentesSuplentes, setAsistentesSuplentes] = useState([]);
    const [asistentesOtros, setAsistentesOtros] = useState([]);

    useEffect(() => {
        let propietarios = []
        let suplentes = []
        let otros =  []
    
        asistencia && asistencia.map((asistente) =>{
            asistente.tipo_asistente === 0?
                propietarios.push(asistente): 
                asistente.tipo_asistente === 1?
                    suplentes.push(asistente):
                    otros.push(asistente)
        })

        setAsistentesSuplentes(suplentes)
        setAsistentesPropietarios(propietarios)
        setAsistentesOtros(otros)





    }, [asistencia]);


  return (
    <Table bordered striped className='text-center'>
    <thead className='table-primary'>
        <tr>
            <th>Asistente</th>
            <th>Hora Asistencia</th>
            <th>Quórom</th>
            <th>Asistencia</th>
        </tr>
        <tr>
            <th colSpan="4">Miembros de Junta Directiva Propietarios</th>
        </tr>
    </thead>
    <tbody className='table-light'>
    {asistentesPropietarios && (asistentesPropietarios.map((asistente)=> <tr>
                <td>{asistente.invitado !== null ? asistente.invitado : asistente.name+' '+asistente.apellido}</td>
                <td>{asistente.hora}</td>
                <td>{asistente.quarum === 1 ? "Si": "No"}</td>
                <td>{asistente.asistencia === 1 ? "Si": "No"}</td>
            </tr>))}
    </tbody>
    <thead className='table-primary'>
        <tr>
            <th colSpan="4">Miembros de Junta Directiva Suplentes</th>
        </tr>
    </thead>
    <tbody className='table-light'>
    {asistentesSuplentes && (asistentesSuplentes.map((asistente)=><tr>
                <td>{asistente.invitado !== null ? asistente.invitado : asistente.name+' '+asistente.apellido}</td>
                <td>{asistente.hora}</td>
                <td>{asistente.quarum === 1 ? "Si": "No"}</td>
                <td>{asistente.asistencia === 1 ? "Si": "No"}</td>
            </tr>))}
    </tbody>
    <thead className='table-primary'>
        <tr>
            <th colSpan="4">Otros Asistentes</th>
        </tr>
    </thead>
    <tbody className='table-light'>
    {asistentesOtros && (asistentesOtros.map((asistente)=><tr>
                <td>{asistente.invitado !== null ? asistente.invitado : asistente.name+' '+asistente.apellido}</td>
                <td>{asistente.hora}</td>
                <td>{asistente.quarum === 1 ? "Si": "No"}</td>
                <td>{asistente.asistencia === 1 ? "Si": "No"}</td>
            </tr>))}
    </tbody>
</Table>
  )
}
