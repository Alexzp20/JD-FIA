import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Container,  Row, Col, Table, Button } from 'reactstrap';
import { VerPdf } from '../../Pdf/VerPdf';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../../Api.js';

const ModalAnadirActa = ({modalNew, toggleNew, setActasAgenda}) => {

    const [actas,setActas] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get('token')

    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/actasAgenda`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                  method: 'GET',
                })
        .then((data) => data.json())
        .then((res)=>{
            console.log(res)
           setActas(res)
        })
    }, [])
       
  
    return (
        <Container className='p-3 my-4'>
        <Modal scrollable size="xl" isOpen={modalNew} toggle={toggleNew}>
            <ModalHeader toggle={toggleNew}>Añadir Actas</ModalHeader>
            <ModalBody>
                    <Row>
                        <Col xs="12">
                                <Table className='text-center'>
                                    <thead>
                                    <tr>    
                                        <th>#</th>
                                        <th>Fecha y hora de subida</th>
                                        <th>Codigo del acta</th>
                                        <th>Documento del acta</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {actas.map((acta)=>
                                        <tr key={acta.id}>
                                        <th scope='row'>{acta.id}</th>
                                        <td >{acta.created_at.split("T")[0]+" "+ acta.created_at.split("T")[1].split(".")[0]}</td>
                                        <td >{acta.codigo}</td>
                                        <td ><VerPdf id={acta.id} tipo="acta"/></td>
                                        <td >
                                            <Button color='custom-primary' onClick={()=>setActasAgenda(acta)}>
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

export default ModalAnadirActa;
