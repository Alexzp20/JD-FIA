import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Container, Row, Table } from 'reactstrap';
import NavBar from '../Navbar/NavBar';
import { VerPdf } from '../Pdf/VerPdf';
import { ModalEditarAcuerdo } from './ModalEditarAcuerdo';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const RevisionAcuerdos = () => {

    const {idAgenda} = useParams()
    const [solicitudes, setSolicitudes] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [acuerdoEdit, setAcuerdoEdit] = useState(null);
    const cookies = new Cookies();
    const token = cookies.get('token')
    
    useEffect(() => {
        getAcuerdos()
    }, []);

    const getAcuerdos =() =>{
        fetch(`${REACT_API_BASE_URL}/agenda/acuerdos/${idAgenda}`, 
            {
                headers: {
                       'Authorization': `Bearer ${token}`
                  },
                  method: 'GET',
                        }
        )
        .then(response => response.json())
        .then(data =>{setSolicitudes(data.agenda); console.log(data.agenda) })
        .catch(error => console.log(error));
    }
    
    const toggleEdit = () => setModalEdit(!modalEdit);
        
    const toggleEditar = (solicitud) => {
        setAcuerdoEdit(solicitud)
        toggleEdit()

    }

    const eliminarAcuerdo = (id) =>{
        Swal.fire({
            title: "Desea eliminar este acuerdo",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
          }).then((result) => {
            if (result.isConfirmed) {
                    fetch(`${REACT_API_BASE_URL}/acuerdo/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                  },
                        })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        Swal.fire({
                            title: "Registro eliminado",
                            text: "El acuerdo se ha eliminado con exito",
                            icon: "success"
                        });
                        getAcuerdos()

                    })
                    .catch(err => {
                    Swal.fire({
                            title: "Error al eliminar el registro",
                            text: {err},
                            icon: "error"
                        });
                        console.error(':', err);
                    });
            } else if (result.isDenied) {
              Swal.fire("No se han realizado Cambios", "", "info");
            }
          });
    }


    
  return (
    <React.Fragment>
    <NavBar/>
    <br />
    <Container className='p-4 bg-custom-dark my-2 rounded bg-opacity-75' >
        <Row>
            <h3 className='text-center text-light'>Lista de solicitudes de la agenda</h3>
        </Row> 
        <br />
        <br />
        <Container>
            <Row>
                <Col xs="12">
                <Table bordered striped className='text-center'>
                    <thead className='table-primary'>
                        <tr>    
                            <th>#</th>
                            <th>Fecha y hora de subida</th>
                            <th>Codigo de la solicitud</th>
                            <th>Descripcion de la solicitud</th>
                            <th>Archivo de la solicitud</th>
                            <th>Codigo del acuerdo</th>
                            <th>Archivo del acuerdo</th>
                            <th>Acciones para acuerdos</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'> 
                        {solicitudes && solicitudes.map((solicitud)=>
                    <tr key={solicitud.id} className={`table-${solicitud.estado_id === 4 ? 'success': 'danger' }`}>
                        <th>{solicitud.id}</th>
                        <td>{solicitud.created_at.split("T")[0]+" "+ solicitud.created_at.split("T")[1].split(".")[0]}</td>
                        <td>{solicitud.codigo}</td>
                        <td>{solicitud.descripcion}</td>
                        <td><VerPdf id={solicitud.id} tipo="solicitud"/></td>
                        <td>{solicitud.acuerdos.length > 0 ? solicitud.acuerdos[0].codigo:"-"}</td>
                        <td>{solicitud.acuerdos.length > 0 ? <VerPdf id={solicitud.acuerdos[0].id} tipo="acuerdo"/>: '-'}</td>
                        <td>
    
                        {solicitud.acuerdos.length === 0 && <Link to={`/acuerdo/revision/${idAgenda}/nuevo/${solicitud.id}`}> <Button color='custom-success'className='text-light'>Nuevo</Button></Link>} { } 
                             {solicitud.acuerdos.length > 0 && <Button color='custom-warning' className='text-light my-1' onClick={()=>toggleEditar(solicitud)}>Editar</Button>}{ }
                            {solicitud.acuerdos.length > 0 &&<Button color='custom-danger'className='text-light' onClick={()=>eliminarAcuerdo(solicitud.acuerdos[0].id)}>Eliminar</Button>}
                               
                                               
                        </td>
                    </tr>)}
                    </tbody>
                </Table></Col>
            </Row> 
        </Container>
        <ModalEditarAcuerdo toggleEdit={toggleEdit} modalEdit={modalEdit} solicitud={acuerdoEdit} getAcuerdos={getAcuerdos}/>
    </Container>
</React.Fragment>  
  )
}
