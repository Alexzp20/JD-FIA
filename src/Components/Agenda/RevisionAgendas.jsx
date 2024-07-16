import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap';
import NavBar from '../Navbar/NavBar'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const RevisionAgendas = () => {

    const [agendas, setAgendas] = useState([])
    const cookies = new Cookies();
    const token = cookies.get('token')


    useEffect(() => {
      fetch(`${REACT_API_BASE_URL}/agendas`,{
        headers: {
            'Authorization': `Bearer ${token}`
  },
      })
       .then(response => response.json())
       .then(data =>{ setAgendas(data); console.log(data)})
       .catch(error => console.log(error));
      
   }, []);
    
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
                           <Link to={`/agenda/mostrar/${agenda.id}`}> <Button color='custom-success'className='text-light'>Ver agenda</Button></Link>
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
