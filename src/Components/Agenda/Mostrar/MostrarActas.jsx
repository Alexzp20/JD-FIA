import React from 'react'
import { Table } from 'reactstrap'
import { VerPdf } from '../../Pdf/VerPdf'

export const MostrarActas = ({actas}) => {
  return (
    <Table className='text-center'>
        <thead className='table-primary '>
            <tr>    
                <th>#</th>
                <th>Fecha y hora de subida</th>
                <th>Codigo del acta</th>
                <th>Archivo</th>
            </tr>
        </thead>
        <tbody className='table-light'> 
            {actas.map((acta)=>
        <tr key={acta.id}>
            <th>{acta.id}</th>
            <td>{acta.created_at.split("T")[0]+" "+ acta.created_at.split("T")[1].split(".")[0]}</td>
            <td>{acta.codigo}</td>
            <td><VerPdf id={acta.id} tipo="acta"/></td>
        </tr>)}
        </tbody>
    </Table>
  )
}
