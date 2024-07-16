import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Label, Row, Table } from 'reactstrap';
import NavBar from '../Navbar/NavBar';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';


const Miembros = () => {


    const [fechaInicial, setFechaInicial] = useState('2024-01-01');
    const [fechaFinal, setFechaFinal] = useState('2024-01-01');
    const [usuarios, setUsuarios ] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados ] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get('token')

    const reiniciar = () =>{
        setFechaInicial('');
        setFechaFinal('');
    }
  
    

    useEffect(() => {

        var filtrados; 

        if(fechaFinal === '' && fechaInicial === ''){
            filtrados = usuariosFiltrados
        }
        else{
          filtrados = usuariosFiltrados.filter((usuario) => {
                const usuarioNac = new Date(usuario.fecha_nacimiento);
                return usuarioNac >= new Date(fechaInicial) && usuarioNac <= new Date(fechaFinal);
              });
        }
            setUsuarios(filtrados);
        }, [fechaFinal,fechaInicial]); 
        
        
    useEffect(() => {
        fetch(`${REACT_API_BASE_URL}/users/puesto?puesto_id=2`, 
            {
                headers: {
                 'Authorization': `Bearer ${token}`
                  },
                  method: 'GET',
            }
        )
        .then((data) => data.json())
        .then((res)=>{
           setUsuarios(res);
           setUsuariosFiltrados(res);
        }) 
    }, []);

    return (
        <React.Fragment>
            <NavBar/>
        <Container className=' p-4 bg-custom-dark my-4 rounded bg-opacity-75' >
                    <Row>
                        <Col xs="12">
                            <h1 className='text-center text-light'>Miembros de la junta directiva</h1>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row className='text-light'>
                        <Col xs="1"></Col>
                        <Col xs="4"> 
                            <Label >Fecha inicial</Label>
                            <Input type="date" value={fechaInicial} onChange={(e) => setFechaInicial(e.target.value)}></Input>
                        </Col>
                        <Col xs="2">
                            </Col>
                        <Col xs="4">
                            <Label >Fecha final</Label>
                            <Input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)}></Input>
                        </Col>
                        <Col xs="1"></Col>
                    </Row>
                    <br />
                        <Row>
                            <Col xs="5"></Col>
                            <Col xs="2">
                                <Button block color='custom-secondary' onClick={()=>{reiniciar()}}> Reiniciar fechas</Button>
                            </Col>
                            <Col xs="5"></Col>
                        </Row>
                    <br />
                    <Row>
                        <Table className='text-center'>
                            <thead className='table-primary'>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo electronico</th>
                                    <th>Carnet</th>
                                    <th>Fecha Nacimiento</th>
                                </tr>
                            </thead>
                            <tbody>
                            { usuarios.length > 0 && usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <th scope='row'>{usuario.id}</th>
                                    <td>{usuario.name}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.carnet}</td>
                                    <td>{usuario.fecha_nacimiento}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
       </Container>
    </React.Fragment>
    );
}

export default Miembros;
