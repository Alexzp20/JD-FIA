import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Label, Row, Table } from 'reactstrap';
import ModalAnadirActa from './ModalAnadirActa';
import Swal from 'sweetalert2';
import { ModalEditarEstadoActa } from './ModalEditarEstadoActa';
import { VerPdf } from '../../Pdf/VerPdf';

const MenuActas = ({setTotalActas, setVotaciones, actasEditar, votacionesActasEditar}) => {

    const [modalNew, setModalNew] = useState(false);
    const [modalEditarEstado, setModalEditarEstado] = useState(false);
    const [actas, setActas] = useState([]);
    const [actaEditar, setActaEditar] = useState({});
    const [votacion, setVotacion ] = useState([]);
    const [votoEditar, setVotoEditar ] = useState(null);

    const toggleNew = () =>{
        setModalNew(!modalNew)
    }
    const toggleEditarEstado = () =>{
        setModalEditarEstado(!modalEditarEstado)
    }

    const handleEditarEstado  = (acta)=>{
        
        buscarVoto(acta.id) 
        setActaEditar(acta)
        toggleEditarEstado()
    }

    const buscarVoto = (id) => {
        const votoEncontrado = votacion.find(voto => voto.acta_id === id);
        setVotoEditar(votoEncontrado || null)
      }

    
    useEffect(() => {
       if(actasEditar) setActas(actasEditar) 
    }, [actasEditar]);

    useEffect(() => {
        if(votacionesActasEditar) setVotacion(votacionesActasEditar)
    }, [votacionesActasEditar]);

    useEffect(() => {
        setTotalActas(actas)
    }, [actas, setTotalActas]);
    
    useEffect(() => {
        setVotaciones(votacion)
      }, [votacion, setVotaciones]);

      const handleVotacion = (voto) =>{
          if (votacion.some((o) => o.acta_id === voto.acta_id)) {
            let votosFiltrados = votacion.filter((o) => o.acta_id !== voto.acta_id)
            setVotacion([...votosFiltrados, voto])  
        }
        else
        {
            setVotacion([...votacion, voto])  
        }
      }


    const anadirActa = (acta) =>{
      
        if (actas.some((o) => o.id === acta.id)) {
            setActas(actas.filter((o) => o.id !== acta.id))
        }
        else
        {
            setActas([...actas, acta])  
        }
    }


    const deleteActa = (index) =>{

        Swal.fire({
            title: "Desea eliminar esta acta de la agenda",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
          }).then((result) => {
            if (result.isConfirmed) {

                setActas(actas.filter((o) => o.id !== index))
                Swal.fire({
                    title: "Registro eliminado",
                    text: `El acta se ha eliminado con exito`,
                    icon: "success"
                });
            } else if (result.isDenied) {
              Swal.fire("No se han realizado Cambios", "", "info");
            }
          });
    }



    return (
        <Container>
            <Row>
                <h5>3-Aprobación de actas</h5>
                <br />
                <br />
                <Col xs="9"></Col>
                <Col xs="3">
                    <Label className=' text-center' sm={6} for="newUserBt"><h6>Añadir Acta: </h6></Label>
                    <Button id="newUserBt" className='text-light' color='custom-success' onClick={toggleNew}>Nueva Acta</Button>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                <ModalAnadirActa modalNew={modalNew} toggleNew={toggleNew} setActasAgenda={anadirActa}/>
                </Col>
            </Row>
                 <Row>
                    <Col xs="12">
                        <br />
                        <Table className='text-center'>
                            <thead className='table-primary'>
                                <tr>
                                    <th>#</th>
                                    <th>Codigo de Acta</th>
                                    <th>fecha de Acta</th>
                                    <th>Documento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {actas.length >0 && (actas.map((acta)=>{
                                    return <tr key={acta.id}>
                                            <th>{acta.id}</th>
                                            <td>{acta.codigo}</td>
                                            <td>{acta.created_at.split("T")[0]+" "+ acta.created_at.split("T")[1].split(".")[0]}</td>
                                            <td><VerPdf id={acta.id} tipo="acta"/></td>
                                            <td><Button color='custom-danger' className='text-light' onClick={()=>{deleteActa(acta.id)}}>Eliminar</Button>
                                               {''} <Button color='custom-dark' className='text-light' onClick={()=>{handleEditarEstado(acta)}}>Editar estado</Button>
                                            </td>
                                           </tr>
                                }))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <ModalEditarEstadoActa votoEditar={votoEditar} modalEstado={modalEditarEstado} toggleEstado={toggleEditarEstado} acta={actaEditar} handleVotacion={handleVotacion}/>
       </Container>
    );
}

export default MenuActas;
