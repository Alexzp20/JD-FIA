import React from 'react';
import { Button } from 'reactstrap';

const FilaAgenda = ({agenda}) => {
    return (
        <tr>
            <th scope='row'>{agenda.id_evento}</th>
            <th>{agenda.fecha}</th>
            <td>{agenda.descripcion}</td>
            <td>{agenda.hora_inicio}</td>
            <td>
                <Button className='m-1 text-white' color='custom-warning'>Editar</Button>
                <Button className="text-white" color='custom-danger'>Eliminar</Button>
            </td>
        </tr>   
    );
}

export default FilaAgenda;
