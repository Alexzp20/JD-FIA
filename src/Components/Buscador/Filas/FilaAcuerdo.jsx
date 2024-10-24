import React from 'react';
import { Button } from 'reactstrap';
import { VerPdf } from '../../Pdf/VerPdf';

const FilaAcuerdo = ({acuerdo}) => {
    return (
        <tr className='table-success'>
            <th scope='row'>{acuerdo.id_acuerdo}</th>
            <td>{acuerdo.codigo_acuerdo}</td>
            <td>{acuerdo.codigo_solicitud}</td>
            <td>{acuerdo.descripcion}</td>
            <td><VerPdf id={acuerdo.id_acuerdo} tipo="acuerdo"/></td>
        </tr>   
    );
}

export default FilaAcuerdo;
