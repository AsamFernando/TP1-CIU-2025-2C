import {NavBar} from './components'
import {Routes, Route} from 'react-router-dom'
import {Inicio, Carta, Carrito, ContactoYReserva} from './pages'
import {useState} from 'react';
import menu from './platos/platos.json';

//arreglar los css puestos en los componentes usando css global o modules etc

function App() {
  const [pedido, setPedido] = useState([]);

  const [carta, setCarta] = useState(menu);

  const [darkMode, setDarkMode] = useState('');

  const sumarProducto = (pedidoActual, productoSumar) => {
    return pedidoActual.map(p => p.id == productoSumar.id ? {...p, cantidad: p.cantidad + 1} : p);
  };
  
  const restarProducto = (pedidoActual, productoRestar) => {
    return pedidoActual.map(p => p.id == productoRestar.id ? {...p, cantidad: p.cantidad - 1} : p);
  };

  const agregarProducto = (pedidoActual, productoAgregar) => {
    return [...pedidoActual, {...productoAgregar, cantidad: 1}];
  };

  const eliminarProducto = (pedidoActual, productoEliminar) => {
    return pedidoActual.filter(p => p.id != productoEliminar.id);
  };

  const sumarAlPedido = (producto) => {
    setPedido((prevPedido) => {
        return sumarProducto(prevPedido, producto);
    });
  };

  const restarOEliminarDelPedido = (producto) => {
    setPedido((prevPedido) => {
        return producto.cantidad > 1 ? restarProducto(prevPedido, producto) : eliminarProducto(prevPedido, producto);
    });
  };

  const agregarOSumarAlPedido = (producto) => {
    setPedido((prevPedido) => {
      const productoEncontrado = prevPedido.find(p => p.id == producto.id)
      return !productoEncontrado ? agregarProducto(prevPedido, producto) : sumarProducto(prevPedido, producto);
    });
  };

//Aclarcion: se puede hacer de forma no controlada pasandole el evento que toma el onsubmit transformandolo
//en objeto (ver docs react input) para tomar el atributo name q tiene como valor un string q a su vez funciona como la key de lo
//q se ingreso en el form.control
//de manera no cotrolada filtra cuando se da enter o con el boton buscar 
//o de forma controlada tomando el evento de onchange del form.control con un usestate en navbar q 
//guarda el e.target.value tanto en su estado como en el value del form.control y lo pasa a filtrarMenu
//de manera controlada se puede filtrar en tiempo real a medida q se ingresa texto en el input
//la condicion del switch hay q ponerla al reves al setear el atributo en html para q se ilumine en modo oscuro

  const filtrarMenu = (input) => {
    setCarta(menu.filter(p => p.nombre.toLowerCase().includes(input.toLowerCase())));
  };

  const cambiarDarkMode = (darkModeOn) => {
    const html = document.querySelector('html');
    html.setAttribute('data-bs-theme', !darkModeOn ? '':'dark')
  };

//agregar una ruta con * y que lleve a inicio o pagina de error para cuando se escribe cualquier cosa en la url
//y usar para alguna pagina :id como parametro
  return (
    <>
      <NavBar filtrarMenu={filtrarMenu} botonDarkMode={cambiarDarkMode} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Carta" element={<Carta accionBoton={agregarOSumarAlPedido} carta={carta} />} />
        <Route path="/Carrito" element={<Carrito pedido={pedido} botonAgregar={{agregar:sumarAlPedido, texto:'Agregar'}} botonEliminar={{eliminar:restarOEliminarDelPedido, texto:'Eliminar'}} />} />
        <Route path="/Contacto Y Reservas" element={<ContactoYReserva />} />
      </Routes>
    </>
  );
};

export default App;
