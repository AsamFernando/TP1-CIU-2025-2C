import {Form} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
import {Formik} from 'formik';
import {Boton, FormInput} from '../components';
import formSchema from '../schemas/Form.schema'

//poner id a cada checkbox o radio
//arrglar fecha -> arreglada con validacion y settings del browser para mostrar dd/mm/yyyy
//ver validaciones: apellido nombre -> agregar trim para evitar campos con espacios o solo espacios
//telefono -> controlar que sea numerico y que empiece con 11 -> arreglado
//validar q la fecha sea posterior a la actual -> validado
//validar q la fecha no sea posterior a un año o periodo despues de la fecha actual -> validado
//poner una franja horaria -> validado
//poner ids a los map filasDatos, ver si se puede simplificar a un solo map -> arreglado
//si se destilda el check de reserva borrar todos los campos de reserva -> arreglado 
//-----------------------------------------------------------------
//ver si hay q resetear touched y errors y poder enviar solicitud -> no
//ver si es mas facil de hacer con useEffect
//achicar el ancho de los inputs -> hecho en cada comp. hacerlo global
//mensaje de confirmacion con alert al enviar y limpiar formulario
//mejorar el pasaje de props a los inputs
//ver si se puede cambiar de orden los props de los inputs en cargaContacto y cargaReserva
//revisar el check radio q pide q sea componente controlado
const ContactoYReserva = () => {
    
    const cargaContacto = [
        {controlId:'formGridApellido', formControl:{label:'Apellido:', type:'text', placeholder:'Ingrese su Apellido', name:'apellido'}},
        {controlId:'formGridNombre', formControl:{label:'Nombre:', type:'text', placeholder:'Ingrese su Nombre', name:'nombre'}},
        {controlId:'formGridEmail', formControl:{label:'Email:', type:'email', placeholder:'usuario@ejemplo.com', name:'email'}},
        {controlId:'formGridTelefono', formControl:{label:'Telefono:', type:'text', placeholder:'Ej: 1123456789', name:'telefono'}},
        {controlId:'formGridComentarios', tamaño:12, formControl:{label:'Otros datos o comentarios:', as:'textarea', rows:4, name:'comentarios'}},
        {controlId:'formGridCheckboxReserva', tamaño:12, formControl:{type:'checkbox', name:'reserva', label:'Quiero hacer una Reserva!'}},
    ];
    
    const cargaReserva = [
        {controlId:'formGridFechaReserva', formControl:{label:'Fecha de la Reserva:', type:'date', name:'fecha'}},
        {controlId:'formGridHoraReserva', formControl:{label:'Hora de la Reserva:', type:'time', name:'hora'}},
        {controlId:'formGridComensales', formControl:{label:'Cantidad de Personas:', type:'text', placeholder:'Max. 10 personas', name:'comensales'}},
        {controlId:'formGridCheckboxLugar', formControl:{label:'Lugar:', type:'radio', name:'group1', inline:true}},
    ];

    const filasDatos = (datos, values, handleChange, handleBlur, errors, touched, setFieldValue) => {
        return (
            <Row className="mb-3">
                {datos.map((d, i) => {
                    let name = d.formControl.name
                    return (
                        <Form.Group key={i} as={Col} xs={d.tamaño||6} controlId={d.controlId}>
                            <FormInput
                            {...d.formControl}
                            {...{setFieldValue, handleChange, handleBlur}}
                            value={values[name]}
                            errors={errors[name]}
                            touched={touched[name]}
                        />
                        </Form.Group>
                    )}
                )}
            </Row>
        )
    };

    return (
        <Formik
            validationSchema={formSchema}
            onSubmit={console.log}
            initialValues={{
                apellido: '',
                nombre: '',
                email: '',
                telefono: '',
                comentarios: '',
                reserva:false,
                fecha: '',
                hora: '',
                comensales:''
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue}) => {
                return (
                    <Form noValidate onSubmit={handleSubmit}>
                        {filasDatos(cargaContacto, values, handleChange, handleBlur, errors, touched, setFieldValue)}
                        {values.reserva && filasDatos(cargaReserva, values, handleChange, handleBlur, errors, touched, setFieldValue)}
                        <Row className="justify-content-center">
                            <Boton
                                variant='success'
                                type='input'
                                style={{width:'15%', marginTop:'30px'}}
                                texto={values.reserva ? 'Enviar Solicitud':'Enviar Datos'}
                            />
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
};

export default ContactoYReserva;