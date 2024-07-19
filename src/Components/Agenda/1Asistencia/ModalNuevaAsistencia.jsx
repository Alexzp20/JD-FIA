import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row, Modal, ModalHeader, ModalBody, Label   } from 'reactstrap';


const ModalNuevaAsistencia = ({modalNew, toggleNew, setAsistentesPropietarios, setAsistentesSuplentes, setAsistentesOtros, usuarios}) => {

    const [tipoAsistente, setTipoAsistente] = useState("0");
    const [usuarioAsistente, setUsuarioAsistente] = useState(0);
    const [invitadoAsistente, setInvitadoAsistente] = useState('');
    const [disableInvitadoAsistente, setDisableInvitadoAsistente] = useState(true);
    const [horaAsistencia, setHoraAsistencia] = useState('');
    const [asistencia, setAsistencia] = useState(false);
    const [quorum, setQuorum] = useState(false);

    const handleTipoAsistente = (event) => {
        setTipoAsistente(event.target.value); 
      };

    const handleUsuarioAsistente = (event) => {
        setUsuarioAsistente(event.target.value); 
      };

    const handleInvitadoAsistente = (event) => {
        setInvitadoAsistente(event.target.value); 
      };

    const handleHoraAsistencia = (event) => {
        setHoraAsistencia(event.target.value); 
      };

    const handleAsistencia = () => {
        setAsistencia(!asistencia); 
      };

    const handleQuorum = () => {
        setQuorum(!quorum); 
      };

      useEffect(() => {        

        console.log(tipoAsistente)
        if(tipoAsistente !== "2"){
            setDisableInvitadoAsistente(true)
            setInvitadoAsistente('')
        }
        else
        {
            setDisableInvitadoAsistente(false)
            setUsuarioAsistente(0)
        }

      }, [tipoAsistente]);




const AnadirAsistencia = () =>{

    let nuevaAsistencia = null

    if(parseInt(tipoAsistente) !== 2 && parseInt(usuarioAsistente) !== 0){
    
       nuevaAsistencia = {
        "tipoAsistente": tipoAsistente,
        "usuarioAsistente": parseInt(usuarioAsistente),
        "horaAsistencia": horaAsistencia,
        "asistencia": asistencia,
        "quorum": quorum    
    }

    }else if(parseInt(tipoAsistente) === 2 && invitadoAsistente !== ''){
        nuevaAsistencia = {
            "tipoAsistente": tipoAsistente,
            "invitado": invitadoAsistente,
            "horaAsistencia": horaAsistencia,
            "asistencia": asistencia,
            "quorum": quorum    
        }
    }
    if(nuevaAsistencia){
        switch (parseInt(tipoAsistente)) {
            case 0:
               setNuevaAsistencia(setAsistentesPropietarios, nuevaAsistencia)
            break;
            case 1:
                setNuevaAsistencia(setAsistentesSuplentes, nuevaAsistencia)
            break;
            case 2:
                setNuevaAsistencia(setAsistentesOtros, nuevaAsistencia)
            break;
        
            default:
                break;
        }

    }
    
}

const setNuevaAsistencia = (setAsistentes, nuevaAsistencia) =>{
    setAsistentes(prevAsistentes => {
        const nuevoArreglo = [...prevAsistentes]; // Crear una copia del arreglo original
        nuevoArreglo.push(nuevaAsistencia); // Añadir el nuevo valor al arreglo
        return nuevoArreglo;
    })

    setTipoAsistente('0')
    setUsuarioAsistente(0)
    setInvitadoAsistente('')
    setHoraAsistencia('')
    setAsistencia(false)
    setQuorum(false)




}







    return (
        <Container className='p-3 my-4'>
        <Modal scrollable size="lg" isOpen={modalNew} toggle={toggleNew}>
            <ModalHeader toggle={toggleNew}>Añadir nueva asistencia</ModalHeader>
            <ModalBody>
                    <Row>
                        <Col xs="12">   
                        <Label >Tipo de asistente</Label>
                        <Input type='select' id='tipoAsistente' value={tipoAsistente} onChange={handleTipoAsistente}>
                            <option value="0" >Propietario</option>
                            <option value="1" >Suplente</option>
                            <option value="2" >Otro</option>
                        </Input>
                        <br />
                        <Label >Seleccione el usuario</Label>
                        <Input type="select" id='usuarioAsistente' disabled={!disableInvitadoAsistente} value={usuarioAsistente} onChange={handleUsuarioAsistente}>
                        <option value="0" >Seleccione un usuario</option>
                        {usuarios.length > 0 && usuarios.map(usuario => <option value={usuario.id} >{usuario.name + " " + usuario.apellido}</option> )}
                        </Input>
                        <br />
                        <Label >Ingrese el nombre del invitado (Solo para externos)</Label>
                        <Input type="text" id='invitadoAsistencia' disabled={disableInvitadoAsistente} value={invitadoAsistente} onChange={handleInvitadoAsistente}/>
                        <br />
                        <Label >Ingrese la hora de asistencia</Label>
                        <Input type="time" id='horaAsistencia' value={horaAsistencia} onChange={handleHoraAsistencia}/>
                        <br />
                        </Col>
                        <Col xs="6" className='text-center'>
                        <Label >Asistencia</Label>
                        <br />
                        <Input type="checkbox" className=' bg-custom-dark' id='asistencia' checked={asistencia} onChange={handleAsistencia}/>
                        </Col>
                        <Col xs="6" className='text-center'>
                        <Label >Quorum</Label>
                        <br />
                        <Input type="checkbox" className=' bg-custom-dark' id='quorum' checked={quorum} onChange={handleQuorum}/>
                        </Col>  
                        <br />
                        <br />
                        <br />  
                        <br />
                        <Button block color="custom-success" className='text-light' onClick={AnadirAsistencia}>Añadir asistencia</Button>
                    </Row>
            </ModalBody>
        </Modal>
    </Container>
    );
}

export default ModalNuevaAsistencia;
