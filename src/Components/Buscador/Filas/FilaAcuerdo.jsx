import React from 'react';
import { Button } from 'reactstrap';

const FilaAcuerdo = ({acuerdo}) => {
    return (
        <tr>
            <th scope='row'>{acuerdo.id_acuerdo}</th>
            <td>{acuerdo.descripcion_solicitud}</td>
            <td>{acuerdo.descripcion_acuerdo}</td>
            <td>{acuerdo.documento_acuerdo}</td>
            <td><Button className="text-white" color='custom-danger'>Eliminar</Button></td>
        </tr>   
    );
}

export default FilaAcuerdo;
