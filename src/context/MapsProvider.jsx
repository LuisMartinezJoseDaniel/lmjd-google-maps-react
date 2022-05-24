import { createContext, useState } from "react";

const MapsContext = createContext();

const MapsProvider = ({ children }) => {
  const [coords, setCoords] = useState({});
  const [marcadores, setMarcadores] = useState([]);

  const filtrarEscuelas = async (opcion) => {
    try {
      
      // http://localhost:1337/api/escuelas?filters[nivel][$contains]=PRIMARIA
      const filters = `filters[nivel][$eq]=${opcion}`;
      const url = `http://localhost:1337/api/escuelas?${filters}`;
      const resp = await fetch(url);
      const { data } = await resp.json();

      const arrayCoordenadas = data.map(({ id,attributes }) => ({
        id,
        nombre: attributes.nombre,
        descripcion: attributes.descripcion_tipo,
        lat: attributes.latitud,
        lng: attributes.longitud,
        nivel: attributes.nivel,
      }));
      setMarcadores(arrayCoordenadas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MapsContext.Provider
      value={{
        setCoords,
        coords,
        filtrarEscuelas,
        marcadores
      }}
    >
      {children}
    </MapsContext.Provider>
  );
};

export { MapsProvider };

export default MapsContext;
