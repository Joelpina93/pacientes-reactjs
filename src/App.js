import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
function App() {
    //Citas en local storage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) {
        citasIniciales = [];
    }
    //Areglo de citas
    const [citas, guardarCitas] = useState(citasIniciales);

    //Use Effect para realizar ciertas operaciones cuando el state cambia
    useEffect(() => {
        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', []);
        }
        console.log('Documento listo o las citas cambiaron');
    }, [citas, citasIniciales]);

    //Funcion que toma las citas actuales y agrega la nueva
    const agregarCita = (cita) => {
        guardarCitas([...citas, cita]);
    };

    //Function que elimina una cita por su id
    const eliminarCita = (id) => {
        const nuevasCitas = citas.filter((cita) => cita.id !== id);
        guardarCitas(nuevasCitas);
    };

    //Mensaje condicional
    const titulo =
        citas.length === 0 ? 'Agrega una nueva cita' : 'Citas Agendadas';
    return (
        <Fragment>
            <h1>Administrador de Pacientes</h1>

            <div className='container'>
                <div className='row'>
                    <div className='one-half column'>
                        <Formulario crearCita={agregarCita} />
                    </div>
                    <div className='one-half column'>
                        <h2>{titulo}</h2>
                        {citas.map((cita) => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
