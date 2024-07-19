import React from 'react';
import { Button } from 'reactstrap';
import { VerPdf } from '../../Pdf/VerPdf';
import Cookies from 'universal-cookie';

const TablaSolicitud = ({titulo ="", solicitudes}) => {
    const cookies = new Cookies();
    const user = cookies.get('user')
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
                                <td >{user.roles[0].id === 1 || user.roles[0].id === 2 ?
                                        <VerPdf id={solicitud.id} tipo="solicitud"/>:'No documento'}</td>
                                <td >{solicitud.categoria}</td>
                                <td >{solicitud.subcategoria ? solicitud.subcategoria : '-'}</td>
                            </tr>
                            )}
            </tbody>
        </React.Fragment>
    );
}

export default TablaSolicitud;