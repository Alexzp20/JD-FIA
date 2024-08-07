import React from 'react';

const FilaAsistencia = ({asistente}) => {


    return (
            <tr>
                <td>{asistente.usuarioAsistente ? asistente.usuarioAsistente : asistente.invitado}</td>
                <td>{asistente.horaAsistencia ? asistente.horaAsistencia: asistente.hora}</td>
                <td>{asistente.quorum === true ? "Si": asistente.quarum ? "Si" : "No"}</td>
                <td>{asistente.asistencia === true ? "Si": asistente.asistencia === 1 ? 'Si': "No"}</td>
            </tr>
    );
}

export default FilaAsistencia;
