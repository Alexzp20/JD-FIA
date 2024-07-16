
import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Container,  Row, Col, Table, Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../../Api.js';

const ModalSolicitudes = ({modal, toggle, handleAsignacion}) => {

    const [solicitudes,setSolicitudes] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get('token')

    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/solicitudes/estado/2`,
            {
                headers: {
                       'Authorization': `Bearer ${token}`
                  },
                  method: 'GET',
            }
        )
        .then((data) => data.json())
        .then((res)=>{
           console.log(res)
           setSolicitudes(res)
        })
    }, [])


    return (
        <Container className='p-3 my-4'>
        <Modal scrollable size="xl" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Añadir Solicitudes</ModalHeader>
            <ModalBody>
                    <Row>
                        <Col xs="12">
                                <Table className='text-center'>
                                    <thead>
                                    <tr>    
                                        <th>#</th>
                                        <th>Codigo de la solicitud</th>
                                        <th>Fecha de subida</th>
                                        <th>Descripción de la solicitud</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {solicitudes.map((solicitud)=>
                                        <tr key={solicitud.id}>
                                        <th scope='row'>{solicitud.id}</th>
                                        <td >{solicitud.codigo}</td>
                                        <td>{solicitud.created_at.split("T")[0]+" "+ solicitud.created_at.split("T")[1].split(".")[0]}</td>
                                        <td >{solicitud.descripcion}</td>
                                        <td >
                                            <Button color='custom-primary' onClick={()=>handleAsignacion(solicitud)}>
                                                Añadir
                                            </Button>
                                        </td>
                                    </tr>
                                    )}
                                    </tbody>
                                </Table>
                        </Col>
                    </Row>
            </ModalBody>
        </Modal>
    </Container>
    );
}

export default ModalSolicitudes;
