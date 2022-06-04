import React, { Fragment, useContext, useState } from "react";
import useMaps from "../hooks/useMaps";
import { nivelesEscolares } from "../static";

const Opciones = () => {
  const { setCoords, setOpciones, opciones } = useMaps();

  const [checkedState, setCheckedState] = useState(new Array(4).fill(false));

  const handleChecked = (event, position) => {
    const updatedCheckedState = checkedState.map((opcion, index) => {
      return index === position ? !opcion : opcion;
    });
    setCheckedState(updatedCheckedState);

    const opcionSeleccionada = event.target.value;

    if (updatedCheckedState[position]) {
      setOpciones([...opciones, opcionSeleccionada]);
    } else {
      const opcionesActualizadas = opciones.filter((opcion) => {
        return opcion != opcionSeleccionada;
      });
      setOpciones(opcionesActualizadas);
    }
  };

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
      <div className="p-5">
        {nivelesEscolares.map(({ nombre }, index) => (
          <div key={nombre} className="flex justify-between items-center mb-5">
            <label className="text-white font-bold cursor-pointer" htmlFor={nombre}>
              {nombre}
            </label>
            <input
              className="checked:bg-red-500"
              type="checkbox"
              name={nombre}
              id={nombre}
              value={nombre.toLocaleUpperCase()}
              checked={checkedState[index]}
              onChange={(e) => {
                handleChecked(e, index);
              }}
            />
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

export default Opciones;
