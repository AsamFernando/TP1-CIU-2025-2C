import {useState} from 'react';
import {Container, Nav, Navbar, Form, Button, InputGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom';

//react al hacer un map pide pasar como prop key=s.id al primer componente que recibe el map
//y en los Nav hago s.nombre para mostrarlo
//ocultar el buscador si cambio de pagina
//acomodar el buscador mas ancho y separar del switch y del texto

//para filtrar en tiempo real tengo que crear estado para el form.control donde en onchange recibe el
//input y lo setea con e.target.value y en el prop value lo asigna, luego en onSubmit del form le paso 
//la  funcion handleSubmit que con e.preventDefault no actualiza la pagina y le paso a la funcion que
//filtra el menu en app.jsx el estado

//agregado el estado del switch para cambiar a modo dark q funciona igual q el estado del buscador.
//en app.jsx traigo con querySelector el elemento html y le seteo el atributo data-bs-theme en dark
//con una condicion q evalua lo q devuelve el switch

const NavBar = ({filtrarMenu, botonDarkMode}) => {
    const secciones = [{id:1, nombre:'Inicio'}, {id:2, nombre:'Carta'}, {id:3, nombre:'Carrito'}, {id:4, nombre:'Contacto Y Reservas'}];
    const [value, setValue] = useState('');
    const [dark, setDark] = useState(true);

    const handleSubmit = (e) => e.preventDefault();

    const cambiarEstadoYFiltrar = (e) => {
        setValue(e.target.value)
        filtrarMenu(e.target.value)      
    }

    const cambiarModoDark = (e) => {
        console.log(e.target.checked)
        setDark(e.target.checked)
        botonDarkMode(e.target.checked)
    }

    return (
        <Navbar sticky='top' expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Luna & Granos Café</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {secciones.map(s => <Nav.Link key={s.id} as={Link} to={`/${s.nombre}`}>{s.nombre}</Nav.Link>)}
                    </Nav>
                    <Nav>

                    <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
                        <InputGroup style={{border:0, backgroundColor:'gray-700'}}>
                        <InputGroup.Text style={{border:0}} id="basic-addon1">Buscador</InputGroup.Text>
                            <Form.Control
                                type="search"
                                placeholder="Cafe, medialunas, etc."
                                className="me-2 w-60"
                                aria-label="Search"
                                name='nombre'
                                value={value}
                                onChange={cambiarEstadoYFiltrar}
                            />
                            {/* <Button variant="outline-success" type='submit'>Buscar</Button> */}
                        </InputGroup>
                        <Form.Check
                            inline
                            type='switch'
                            checked={dark}
                            onChange={cambiarModoDark}
                            label={dark?'Dark':'Light'}
                            id='switchDark'
                        />
                    </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;