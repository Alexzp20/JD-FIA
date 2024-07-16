import React from 'react';

const FilaAsistencia = ({asistente}) => {


    return (
            <tr>
                <td>{asistente.usuarioAsistente}</td>
                <td>{asistente.horaAsistencia}</td>
                <td>{asistente.quorum === true ? "Si": "No"}</td>
                <td>{asistente.asistencia === true ? "Si": "No"}</td>
            </tr>
    );
}

export default FilaAsistencia;
