import React from 'react'
import { Table } from 'reactstrap'
import { VerPdf } from '../../Pdf/VerPdf'

export const MostrarInformes = ({informes}) => {
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
            {informes.map((informe)=>
        <tr key={informe.id}>
            <th>{informe.id}</th>
            <td>{informe.created_at.split("T")[0]+" "+ informe.created_at.split("T")[1].split(".")[0]}</td>
            <td>{informe.codigo}</td>
            <td><VerPdf id={informe.id} tipo="acta"/></td>
        </tr>)}
        </tbody>
    </Table>
  )
}
