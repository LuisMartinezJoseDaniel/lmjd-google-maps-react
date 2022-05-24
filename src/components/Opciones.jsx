import React, { useContext, useState } from "react";
import useMaps from "../hooks/useMaps";
import { nivelesEscolares } from "../static";

const Opciones = () => {
  const { setCoords, filtrarEscuelas } = useMaps();

  const [checkedState, setcheckedState] = useState(new Array(4).fill(false));


  const handleOpciones = (e) => {
    const opcion = nivelesEscolares[e.target.value];

    console.log(opcion);
    // setOpciones([opcion]);
    filtrarEscuelas(opcion);
  };

  const handleClick = () => {
    if (!navigator.geolocation) {
      console.log("Tu navegador no soporta la geoloclizacion");
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
    <div className="opciones">
      <div className="filtros mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <label className="me-3" htmlFor="primaria">
            Primaria
          </label>
          <input
            type="checkbox"
            name="primaria"
            id="primaria"
            value="primaria"
            onChange={handleOpciones}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <label className="me-3" htmlFor="secundaria">
            Secundaria
          </label>

          <input
            type="checkbox"
            name="secundaria"
            id="secundaria"
            value="secundaria"
            onChange={handleOpciones}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <label className="me-3" htmlFor="bachillerato">
            Bachillerato
          </label>
          <input
            type="checkbox"
            name="bachillerato"
            id="bachillerato"
            value="bachillerato"
            onChange={handleOpciones}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <label className="me-3" htmlFor="universidad">
            Universidad
          </label>
          <input
            type="checkbox"
            name="universidad"
            id="universidad"
            value="universidad"
            onChange={handleOpciones}
          />
        </div>
      </div>
      <input
        onClick={handleClick}
        type="button"
        value="Ir a mi ubicacion"
        className="btn btn-primary"
      />
    </div>
  );
};

export default Opciones;
