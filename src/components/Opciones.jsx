import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types"
import useMaps from "../hooks/useMaps";
import { nivelesEscolares } from "../static";

const Opciones = ({tipo}) => {
  const { setCoords, setOpciones, opciones } = useMaps();

  const [checkedState, setCheckedState] = useState(new Array(4).fill(false));

  const handleChecked = ( event, position ) => {
    const updatedCheckedState = checkedState.map((opcion, index) => {
      return index === position ? !opcion : opcion;
    } );
    setCheckedState(updatedCheckedState);

    const opcionSeleccionada = event.target.value;

    
    if (updatedCheckedState[position]) {
      setOpciones([...opciones, opcionSeleccionada]); //checkbox
    } else {
      //Evitar duplicados
      const opcionesActualizadas = opciones.filter((opcion) => {
        return opcion != opcionSeleccionada;
      });
      setOpciones(opcionesActualizadas);
    }
  };
  // Cambiar checked, name y type en el input
  const handleRadio = ( e ) => {
    const opcionSeleccionada = e.target.value;
    setOpciones( [opcionSeleccionada] ); // RadioButton
  }

  const handleClick = () => {
    if (!navigator.geolocation) {
      console.log("Tu navegador no soporta la geolocalizacion");
    }
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const pos = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      setCoords(pos);
    });
  };
  return (
    <div className="flex flex-col justify-between	h-full">
      <div className="p-5 grid grid-cols-2 gap-3 md:grid-cols-1">
        {nivelesEscolares.map(({ nombre }, index) => (
          <div key={nombre} className="flex items-center gap-3">
            <input
              className="checked:bg-red-500"
              type={ tipo } 
              name={tipo === "checkbox"? nombre: "nivel"}
              id={nombre}
              value={nombre.toLocaleUpperCase()}
              checked={tipo === "checkbox"? checkedState[index]: null}
              onChange={( e ) => {
                tipo === "checkbox" ? handleChecked(e, index) : handleRadio(e);
              }}
            />
            <label className="text-white font-bold cursor-pointer" htmlFor={nombre}>
              {nombre}
            </label>
          </div>
        ))}
      </div>
      <input
        onClick={handleClick}
        type="button"
        value="Ir a mi ubicacion"
        className="uppercase p-5 bg-indigo-700 font-bold text-white cursor-pointer"
      />
    </div>
  );
};

Opciones.propTypes = {
  tipo: PropTypes.string.isRequired
}

Opciones.defaultProps = {
  tipo: "checkbox"
}


export default Opciones;
