import React from 'react';
import { Button } from 'reactstrap';
import { VerPdf } from '../../Pdf/VerPdf';

const FilaSolicitud = ({solicitud}) => {
    return (
        <tr>
            <th scope='row'>{solicitud.id}</th>
            <td>{solicitud.creado.split("T")[0]+" "+ solicitud.creado.split("T")[1].split(".")[0]}</td>
            <td>{solicitud.codigo}</td>
            <td>{solicitud.descripcion}</td>
            <td><VerPdf id={solicitud.id} tipo="solicitud"/></td>
            <td>{solicitud.estado}</td>
        </tr>   
    );
}

export default FilaSolicitud;
