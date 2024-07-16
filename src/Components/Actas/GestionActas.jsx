import React, { useEffect, useState } from 'react'
import { Button, Col, Container,Row, Table } from 'reactstrap';     
import Swal from 'sweetalert2';
import { ModalEditActa } from './ModalEditActa';
import { VerPdf } from '../Pdf/VerPdf';
import NavBar from '../Navbar/NavBar';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const GestionActas = () => {

    const [actas, setActas] = useState([]);
    const [actaEdit, setActaEdit] = useState({});
    const cookies = new Cookies();
    const token = cookies.get('token')
    
      //hooks de estado del modal de edit Acta
      const [modalEdit, setModalEdit] = useState(false);
      const toggleEdit = () => setModalEdit(!modalEdit);

    useEffect(() => {
       getActas()
    }, []);     

    const getActas = () => {
        fetch(`${REACT_API_BASE_URL}/actas`, {
    headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': `Bearer ${token}`
      },
      method: 'GET'
        })
        .then(response => response.json())
        .then(data =>{ setActas(data)})
        .catch(error => console.log(error));
    }

    
    const toggleEditar = (acta) => {
       setActaEdit(acta)
        toggleEdit()

    }

    const eliminarActa = (id) =>{

        Swal.fire({
            title: "Desea eliminar esta Acta",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
          }).then((result) => {
            if (result.isConfirmed) {
                    fetch(`${REACT_API_BASE_URL}/acta/${id}`, {
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
                            text: "El acta se ha eliminado con exito",
                            icon: "success"
                        });
                        getActas()

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
    <Container className='p-4 bg-custom-dark my-3 rounded bg-opacity-75'>
    <br />
    <Row>
        <Col xs="12">
            <h1 className='text-center text-light'>Gestion de actas</h1>
        </Col>
    </Row>
    <br />
    <Row>
                        <Col xs='12'>
                            <Table bordered striped className='text-center'>
                                <thead className='table-primary'>
                                    <tr>    
                                        <th>#</th>
                                        <th>Fecha y hora de subida</th>
                                        <th>Codigo del acta</th>
                                        <th>Archivo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='table-light'> 
                                    {actas.map((acta)=>
                                <tr key={acta.id}>
                                    <th>{acta.id}</th>
                                    <td>{acta.created_at.split("T")[0]+" "+ acta.created_at.split("T")[1].split(".")[0]}</td>
                                    <td>{acta.codigo}</td>
                                    <td><VerPdf id={acta.id} tipo="acta"/></td>
                                    <td><Button color='custom-warning' className='text-light' onClick={()=>{toggleEditar(acta)}}>Editar</Button> { } <Button color='custom-success'className='text-light' onClick={()=>{eliminarActa(acta.id)}}>Eliminar</Button> 
                                    </td>
                                </tr>)}
                                </tbody>
                            </Table>
                        </Col>      
                    </Row>
                    <ModalEditActa   toggleEdit={toggleEdit} modalEdit={modalEdit} acta={actaEdit}/>
    </Container>
    </React.Fragment>
  )
}