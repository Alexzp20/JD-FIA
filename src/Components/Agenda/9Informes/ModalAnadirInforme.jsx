import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Container,  Row, Col, Table, Button } from 'reactstrap';
import { VerPdf } from '../../Pdf/VerPdf';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../../Api.js';

export const ModalAnadirInforme = ({modalNew, toggleNew, setInformesAgenda}) => {

    const [informes,setInformes] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get('token')

    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/informesAgenda`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
          },
            }
        )
        .then((data) => data.json())
        .then((res)=>{
            console.log(res)
           setInformes(res)
        })
    }, [])


  return (
    <Container className='p-3 my-4'>
    <Modal scrollable size="xl" isOpen={modalNew} toggle={toggleNew}>
        <ModalHeader toggle={toggleNew}>Añadir informes</ModalHeader>
        <ModalBody>
                <Row>
                    <Col xs="12">
                            <Table className='text-center'>
                                <thead>
                                <tr>    
                                    <th>#</th>
                                    <th>Fecha y hora de subida</th>
                                    <th>Codigo del informe</th>
                                    <th>Documento del infome</th>
                                    <th>Seleccionar</th>
                                </tr>
                                </thead>
                                <tbody>
                                {informes.map((informe)=>
                                    <tr key={informe.id}>
                                    <th scope='row'>{informe.id}</th>
                                    <td >{informe.created_at.split("T")[0]+" "+ informe.created_at.split("T")[1].split(".")[0]}</td>
                                    <td >{informe.codigo}</td>
                                    <td ><VerPdf id={informe.id} tipo="informe"/></td>
                                    <td >
                                        <Button color='custom-primary' onClick={()=>setInformesAgenda(informe)}>
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
  )
}
