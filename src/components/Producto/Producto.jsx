import {Card, ListGroup, Badge} from 'react-bootstrap'
import {Boton} from '../../components';

//poner un hover a card
//mostrar la cantidad del producto en el catalogo y en el pedido
//

const Producto = ({producto, pedido, accion, textoBoton}) => {
    const propsBotonAgregarAlCarrito = {
        variant:'success',
        onClick:() => accion(producto),
    };

    const productoEnPedido = () => {
        return pedido.find(p => p.id == producto.id);
    };
    //Agregada componente badge q muestra en carta con un circulito arriba a la derecha de cada card
    // la cantidad de cada producto añadido al carrito que sea mayor a cero
    //ver si se puede poner lo del display en el css pero controlado por funcion js
    return (
        <Card className='text-center' style={{ width: '18rem' }}>
            <Badge style={{display: productoEnPedido()?'block':'none'}} className="text-center position-absolute top-0 end-0 rounded-pill bg-danger customBadge" bg="secondary">{productoEnPedido()?productoEnPedido().cantidad:0 }</Badge>
            <Card.Img variant="top" src={`${producto.imagen}`} height={200} width={300} />
            <Card.Body>
                <ListGroup variant='flush'>
                <Card.Title>{producto.nombre}</Card.Title>
                    <ListGroup.Item>
                        {producto.descripcion}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {`precio $${producto.precio}`}
                    </ListGroup.Item>
                </ListGroup>
                <Boton {...propsBotonAgregarAlCarrito} texto={textoBoton} />
            </Card.Body>
        </Card>
    );
};

export default Producto;