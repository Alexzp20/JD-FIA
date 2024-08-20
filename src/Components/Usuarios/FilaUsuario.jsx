import React from 'react';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { REACT_API_BASE_URL } from '../../Api';
import Cookies from 'universal-cookie';

const FilaUsuario = ({usuario, toggleEdit, setUsuarioEdit, consumo, setIdUsuarioEdit}) => {

    const cookies = new Cookies();
    const token = cookies.get('token')
    const user = cookies.get('user')

    const toggleEditar = () => {

        setUsuarioEdit(usuario);
        setIdUsuarioEdit(usuario.id)
        toggleEdit();


    }

    const handleUsuario = (id, estado)=>{
        Swal.fire({
            title: `Desea ${estado === 1 ? 'Desactivar' : 'Activar'} el usuario` ,
            showCancelButton: true,
            confirmButtonText: `${estado === 1 ? 'Desactivar' : 'Activar'}`,
          }).then((result) => {
            if (result.isConfirmed) {
                    fetch(`${REACT_API_BASE_URL}/activarUser/${id}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                            } 
                        })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire({
                            title: "Registro actualizado",
                            text: "El usuario se ha modificado con exito",
                            icon: "success"
                        });
                        consumo();

                    })
                    .catch(err => {
                        console.error('Error al modificar el registro:', err);
                    });
            } else if (result.isDenied) {
              Swal.fire("No se han realizado Cambios", "", "info");
            }
          });
    }

    return (
        <tr>
            <th scope='row'>{usuario.id}</th>
            <td>{ usuario.apellido ? usuario.name +" "+ usuario.apellido: usuario.name}</td>
            <td>{usuario.email}</td>
            <td>{usuario.puesto_name}</td>
            <td>
                <Button className='m-1 text-light' color='custom-warning' onClick={toggleEditar}>Editar</Button>
                <Button className='m-1 text-light' color={`custom-${usuario.activo === 1? 'danger': 'success'}`} disabled={user.id === usuario.id} onClick={()=>handleUsuario(usuario.id)}>{usuario.activo === 1? 'Desactivar': 'Activar'}</Button>
            </td>
        </tr>   
    );
}

export default FilaUsuario;
