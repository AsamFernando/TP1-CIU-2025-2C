import {Container, Row, Col} from "react-bootstrap";
import {Producto} from "../components";

//ver si como acomodar las columnas del container en pantalla completa -> arreglado
//-------------------------------------------
//poner un hover a cada card
//poder ver la cantidad de cada producto en la card si ya fue añadido

const Carta = ({accionBoton, carta, pedido}) => {
    return (
        <Container className="my-4" fluid>
            <Row className="justify-content-lg-center customRowCarta">
                {carta.map(p => <Col key={p.id} className="d-flex justify-content-center customStyle" xs={12} sm={6} md={4} lg={4} xl={2} xxl={2}>{<Producto producto={p} textoBoton='Añadir al Carrito' accion={accionBoton} pedido={pedido} />}</Col>)}
            </Row>
        </Container>
    )
};

export default Carta;