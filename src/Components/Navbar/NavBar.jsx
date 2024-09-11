import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Container, Navbar, NavbarBrand, NavbarText, Row,Col, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

const NavBar = () => {
    
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token')
    const user = cookies.get('user')
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    
    const logout = async () =>{
        try {
            const response = await fetch(`${REACT_API_BASE_URL}/logout`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': `Bearer ${token}`
                },
            });
      
            if (response.ok) {
                Swal.fire({
                    title: "Sesion cerrada",
                    text: "Adios",
                    icon: "success"
                });
                cookies.remove('user', { path: '/' })
                cookies.remove('token', { path: '/' })
                cookies.remove('rutas', { path: '/' })
               navigate("/")
            } else {
                const errorData = await response.json();
                console.log(errorData)
                Swal.fire({
                    title: "Error",
                    text: "",
                    icon: "error"
                });
              console.error('');
            }
          } catch (error) {
            Swal.fire({
                    title: "Error en la solicitud",
                    text: {error},
                    icon: "error"
                });
          }
    }

    return (
        <div>
            <Navbar
            className="navbar-light"
            color="custom-primary"
            dark
            light
            >
            <Container fluid>
                <Row style={{ alignItems: 'center'}}>
                    <Col xs="6" >
                        <NavbarBrand >
                        <Link className='text-white'  style={{ textDecoration: 'none'}} to="/inicio" >Junta Directiva</Link>
                        </NavbarBrand>

                    </Col>
                    <Col xs="6" >
                        <Nav fill style={{ alignItems: 'center'}} >
                        <NavItem  >
                            <NavbarText><Link className='text-white' style={{ textDecoration: 'none' }} to="/inicio" >Inicio</Link></NavbarText>                              
                        </NavItem>
                        <NavItem>
                            <NavbarText><Link className='text-white' style={{ textDecoration: 'none'}} to="/junta/miembros" >Miembros JD</Link></NavbarText>                              
                        </NavItem>
                        <NavItem>
                            <NavbarText><Link className='text-white' style={{ textDecoration: 'none'}} to="/perfil" >Perfil</Link></NavbarText>                              
                        </NavItem>
                        <NavItem> 
                            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                                <DropdownToggle color='custom-light' caret>{user.name+" "+ (user.apellido !== null ? user.apellido : '')}</DropdownToggle>
                                <DropdownMenu dark>
                                <DropdownItem className='text-white'header><h5>{user.name+" "+ (user.apellido !== null ? user.apellido : '')}</h5></DropdownItem>
                                <DropdownItem><Link className='text-white' style={{ textDecoration: 'none' }} to="/inicio" >Perfil</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><Button color='custom-light' onClick={()=>logout()}>Cerrar sesión</Button></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        </Nav>
                    </Col>
                </Row>
            </Container>
            </Navbar>

        </div>
     
       
    );
}

export default NavBar;
