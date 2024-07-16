import React from 'react';
import { Button } from 'reactstrap';
import { VerPdf } from '../../Pdf/VerPdf';

const TablaSolicitud = ({titulo ="", solicitudes}) => {
    return (
        <React.Fragment>
            {titulo !== "" && (
                <thead className='text-center'>
                <tr>
                    <th colSpan="7"><h6>{titulo}</h6></th>
                </tr>
                </thead>
            )}
            <tbody className='table-light text-center'>
            { solicitudes && solicitudes.map((solicitud)=>
                                <tr key={solicitud.id}>
                                <th scope='row'>{solicitud.id}</th>
                                <td >{solicitud.codigo}</td>
                                <td >{solicitud.descripcion}</td>
                                <td ><VerPdf id={solicitud.id} tipo="solicitud"/></td>
                                <td >{solicitud.categoria}</td>
                                <td >{solicitud.subcategoria ? solicitud.subcategoria : '-'}</td>
                            </tr>
                            )}
            </tbody>
        </React.Fragment>
    );
}

export default TablaSolicitud;