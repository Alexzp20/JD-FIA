import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const FilaAgenda = ({agenda}) => {
    return (
        <tr key={agenda.id}>
            <th>{agenda.id}</th>
            <td>{agenda.fecha +" "+ agenda.hora_inicio}</td>
            <td>{agenda.numero}</td>
            <td>{agenda.convoca}</td>
            <td>{agenda.lugar}</td>
            <td>
                <Link to={`/agenda/mostrar/${agenda.id}/${1}`}> <Button color='custom-success'className='text-light'>Ver agenda</Button></Link>
            </td>
        </tr>
    );
}

export default FilaAgenda;
