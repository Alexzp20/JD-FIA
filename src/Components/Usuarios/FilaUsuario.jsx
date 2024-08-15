import React from 'react';
import { Button } from 'reactstrap';

const FilaUsuario = ({usuario, toggleEdit, setUsuarioEdit, deleteUser}) => {


    const toggleEditar = () => {

        setUsuarioEdit(usuario);
        toggleEdit();

    }

    return (
        <tr>
            <th scope='row'>{usuario.id}</th>
            <td>{ usuario.apellido ? usuario.name +" "+ usuario.apellido: usuario.name}</td>
            <td>{usuario.email}</td>
            <td>{usuario.puesto_name}</td>
            <td>
                <Button className='m-1 text-light' color='custom-warning' onClick={toggleEditar}>Editar</Button>
                <Button className='m-1 text-light' color='custom-danger' onClick={()=>{deleteUser(usuario.id)}}>Eliminar</Button>
            </td>
        </tr>   
    );
}

export default FilaUsuario;
