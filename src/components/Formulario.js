import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';
const Formulario = ({ crearCita }) => {
    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    //Crar State de error
    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = (estate) => {
        actualizarCita({
            ...cita,
            [estate.target.name]: estate.target.value,
        });
        actualizarError(false);
    };

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = (evento) => {
        evento.preventDefault();

        //Validar
        if (!inputValidator()) {
            actualizarError(true);
            return;
        }
        //Asignar un ID
        cita.id = uuid();
        console.log(cita.id);
        //Crear la cita
        crearCita(cita);
        //Reinicar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        });
    };

    const inputValidator = () => {
        var isValid = true;
        if (mascota.trim() === '') {
            isValid = false;
        } else if (propietario.trim() === '') {
            isValid = false;
        } else if (fecha.trim() === '') {
            isValid = false;
        } else if (hora.trim() === '') {
            isValid = false;
        } else if (sintomas.trim() === '') {
            isValid = false;
        }
        return isValid;
    };

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? (
                <p className='alerta-error'>
                    Todos los campos son obligatorios
                </p>
            ) : null}
            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre dueño de la mascota'
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    name='sintomas'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={sintomas}
                />
                <button type='submit' className='u-full-width button-primary'>
                    Agregar cita
                </button>
            </form>
        </Fragment>
    );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
};

export default Formulario;
