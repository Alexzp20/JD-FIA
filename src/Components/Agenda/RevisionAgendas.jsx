import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap';
import NavBar from '../Navbar/NavBar'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';
import Swal from 'sweetalert2';

export const RevisionAgendas = () => {

    const [agendas, setAgendas] = useState([])
    const cookies = new Cookies();
    const token = cookies.get('token')
    

    useEffect(() => {
      getAgendas()
   }, []);

   const getAgendas = () =>{
    fetch(`${REACT_API_BASE_URL}/agendas`,{
        headers: {
            'Authorization': `Bearer ${token}`
        },
      })
       .then(response => response.json())
       .then(data =>{ setAgendas(data); console.log(data)})
       .catch(error => console.log(error));
   }
   

   const publicarOcultarAgenda =  (id, bandera) => {

    Swal.fire({
        title: (bandera === 1 ? 'Publicar ': 'Ocultar' )+' agenda',
        text: (bandera === 1 ? 'Desea Publicar ': 'Desea Ocultar') +' la siguiente agenda:',
        showCancelButton: true,
        confirmButtonText: bandera === 1 ? 'Publicar': 'Ocultar',
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            
            fetch(`${REACT_API_BASE_URL}/publicarAgenda/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
              })
                .then(response => {
                  if (!response.ok) {
                      Swal.fire("Error en la publicación", response.status, "error");
                  }
                  else{
                      response.text()
                  }
                })
                .then(data => {
                    Swal.fire({
                        title: 'Agenda ' + (bandera !== 1 ? 'Ocultada': 'Publicada'),
                        text: data,
                        icon: "success"
                    });
                    getAgendas()
                })
                .catch(error => {
                    Swal.fire("No se han realizado Cambios", {error}, "error");
                });

            
        } else if (result.isDenied) {
          Swal.fire("No se han realizado Cambios", "", "info");
        }
      });

}
 
const eliminarAgenda = (id) =>{

    Swal.fire({
        title: "Desea eliminar esta agenda",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
                fetch(`${REACT_API_BASE_URL}/agenda/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        } 
                    })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    Swal.fire({
                        title: "Registro eliminado",
                        text: "La agenda se ha eliminado con exito",
                        icon: "success"
                    });
                    getAgendas()

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
                      <h3 className='text-center text-light'>Lista de agendas</h3>
                  </Row> 
                  <br />
                  <br />
                  <br />
                  <br />
                  <Container>
                      <Row>
                        <Col xs="12">
                        <Table bordered striped className='text-center'>
                    <thead className='table-primary'>
                        <tr>    
                            <th>#</th>
                            <th>Fecha y hora </th>
                            <th>Codigo de la agenda</th>
                            <th>Convoca</th>
                            <th>Lugar</th>
                            <th>Acciones para la agenda</th>
                            <th>Acciones para los acuerdos</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'> 
                        {agendas && agendas.map((agenda)=>
                    <tr key={agenda.id}>
                        <th>{agenda.id}</th>
                        <td>{agenda.fecha +" "+ agenda.hora_inicio}</td>
                        <td>{agenda.numero}</td>
                        <td>{agenda.convoca}</td>
                        <td>{agenda.lugar}</td>
                        <td>
                          <Link to={`/agenda/mostrar/${agenda.id}/${2}`}> <Button color='custom-success'className='text-light my-2'>Ver agenda</Button></Link>
                            {' '}
                          <Link to={`/agenda/nueva/${agenda.id}`}> <Button color='custom-warning'className='text-light'>Editar agenda</Button></Link>
                            {' '}
                            {agenda.publicada === 1 ? <Button color='custom-danger' className='text-light' onClick={()=>{publicarOcultarAgenda(agenda.id , 0)}}>Ocultar</Button>:
                            <Button color='custom-info' className='text-light' onClick={()=>{publicarOcultarAgenda(agenda.id , 1)}}>Publicar</Button> }
                            {' '}
                            <Button color='custom-dark' disabled={agenda.publicada === 1 } className='text-light' onClick={()=>{eliminarAgenda(agenda.id)}}>Eliminar</Button>
                        </td>
                        <td>
                           <Link to={`/acuerdo/revision/${agenda.id}`}> <Button color='custom-success'className='text-light'>Ver acuerdos</Button></Link>
                        </td>
                    </tr>)}
                    </tbody>
                </Table>
                </Col>
                    </Row> 
                  </Container>
              </Container>
          </React.Fragment>  
  )
}
