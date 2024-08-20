import React, { useEffect, useState } from 'react'
import NavBar from '../../Navbar/NavBar'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import {useForm, Controller} from 'react-hook-form'; 
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { REACT_API_BASE_URL } from '../../../Api';
import ModalEditUsuario from '../ModalEditUsuario';

export const Perfil = () => {

  const cookies = new Cookies();
  const token = cookies.get('token')
  const [usuario, setUsuario] = useState();
  const [usuarioEdit, setUsuarioEdit] = useState({});
  //hooks de estado del modal de edit usuario
   const [modalEdit, setModalEdit] = useState(false);
   const toggleEdit = () => setModalEdit(!modalEdit);

  useEffect(() => {
   consumo()
}, []);

const toggleEditar = () => {
  setUsuarioEdit(usuario)
  toggleEdit();

}

const consumo = () =>{
  fetch(`${REACT_API_BASE_URL}/perfil`, {
    headers: {
        'Authorization': `Bearer ${token}`
},
})
.then(response => response.json())
.then(data =>{ 
    console.log(data)
    setUsuario(data)
})
.catch(error => console.log(error));
}

  return (
    <React.Fragment>
    <NavBar/>
    <br />
    <Container className='p-4 bg-custom-dark my-2 rounded bg-opacity-75' >
        <Row>
            <h3 className='text-center text-light'>Perfil</h3>
        </Row> 
        <br />
        {/* <Container>
          <Row className='text-center'>
            <Col xs="3"></Col>
            <Col xs="6">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="" className='rounded-circle' width="35%" />
            </Col>
            <Col xs="3"></Col>
          </Row>
        </Container> */}
      <Container className='p-4 bg-white rounded my-2'>
      {usuario && (<Row className='text-center'>
            <Col xs="12">
            <h5><b>Nombre: </b>{usuario.name} </h5>
            <h5><b>Correo Electronico: </b> {usuario.email} </h5>
            <h5><b>Puesto:</b> {usuario.puesto_name} </h5>
            <h5><b>Apellido:</b> {usuario.apellido} </h5>
            <h5><b>Nombre de usuario: </b>{usuario.username} </h5>
            </Col>
        </Row>)}
        <br />
        <Row>
          <Col xs="12" className='text-center'>
            <Button color='custom-warning' className='text-white' onClick={()=>toggleEditar()}>Editar Información</Button>
          </Col>
        </Row>
        <ModalEditUsuario toggleEdit={toggleEdit} modalEdit={modalEdit}  usuario ={usuario} url="/editarPerfil" consumo={consumo}/>
      </Container>
    </Container>
</React.Fragment>  
  )
}
