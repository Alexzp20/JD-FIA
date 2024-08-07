import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Input, Row, Modal, ModalHeader, ModalBody, Label   } from 'reactstrap';

export default function ModalEditarEstadoSolicitud({modalEstado, toggleEstado, solicitud, handleVotacion, votoEditar}) {
 
  const [votosFavor, setVotosFavor] = useState(0)
  const [votosContra, setVotosContra] = useState(0)
  const [votosAbstencion, setVotosAbstencion] = useState(0)
  const [estado, setEstado] = useState("6")
  const [comentario, setComentario] = useState("")
  const [desactivado, setDesactivado] = useState(true);


  useEffect(() => {
   
    console.log(votoEditar)
    if(votoEditar !== null){
      setEstado(votoEditar.estado)
      setVotosFavor(votoEditar.afavor)
      setVotosContra(votoEditar.contra)
      setVotosAbstencion(votoEditar.abstencion)
      setComentario(votoEditar.comentario)
    }else{
      setEstado("6")
      setVotosFavor(0)
      setVotosContra(0)
      setVotosAbstencion(0)
      setComentario("")
    }
   
  }, [votoEditar]);

  const handleVotosFavorChange = (e) => {
    setVotosFavor(e.target.value);
  };
  const handleVotosContraChange = (e) => {
    setVotosContra(e.target.value);
  };
  const handleVotosAbstencionChange = (e) => {
    setVotosAbstencion(e.target.value);
  };
  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };
  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  useEffect(() => {
   
    if(estado === '6'){
      setDesactivado(true)
      setVotosFavor(0)
      setVotosContra(0)
      setVotosAbstencion(0)
    }else{
      setDesactivado(false)
    }
    
  }, [estado]);



  const handleVoto = () =>{
    let voto = {
      "solicitud_id": solicitud.id,
      "afavor": votosFavor,
      "contra": votosContra,
      "abstencion": votosAbstencion,
      "total": parseInt(votosAbstencion) + parseInt(votosContra) + parseInt(votosFavor),
      "comentario": comentario,
      "estado": estado
    }

    handleVotacion(voto)


    setVotosAbstencion(0)
    setVotosFavor(0)
    setVotosContra(0)
    setEstado("6")
    setComentario("")
  }

 
 
  return (
    <Container className='p-3 my-4'>
    <Modal scrollable size="lg" isOpen={modalEstado} toggle={toggleEstado}>
        <ModalHeader toggle={toggleEstado}>Editar estado de la solicitud</ModalHeader>
        <ModalBody>
                <Row>
                    <h6>Solicitud: {solicitud.codigo}</h6>
                    <Col xs="12">   
                    <Label >Editar Estado</Label>
                    <Input type='select'value={estado} onChange={handleEstadoChange}>
                        <option value="4" >Aprobado</option>
                        <option value="5" >Denegado</option>
                        <option value="6" >pendiente</option>
                    </Input>
                    <br />
                    </Col>
                </Row>
                <Row className='text-center'>
                  <Col xs="4">
                    <Label >Votos a favor</Label>
                    <Input type="number" disabled={desactivado} value={votosFavor} onChange={handleVotosFavorChange} />
                    <br />
                  </Col>
                  <Col xs="4">
                    <Label >Votos en contra</Label>
                    <Input type="number" value={votosContra} disabled={desactivado} onChange={handleVotosContraChange}/>
                    <br />
                  </Col>
                  <Col xs="4">
                    <Label >Abstenciones</Label>
                    <Input type="number"value={votosAbstencion} disabled={desactivado} onChange={handleVotosAbstencionChange}/>
                    <br />
                  </Col>
                </Row>
                <Row>
                    <Col xs="12">
                    <br />
                    <Label >Añadir comentario</Label>
                    <Input type="textarea" value={comentario} onChange={handleComentarioChange} />
                    <br />
                    <br />
                    <Button block color="custom-success" className='text-light' onClick={()=>handleVoto()}>Actualizar estado</Button>
                    </Col>
                </Row>
        </ModalBody>
    </Modal>
</Container>
  )
}
