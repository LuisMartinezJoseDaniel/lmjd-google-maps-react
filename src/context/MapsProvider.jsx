import { createContext, useEffect, useState } from "react";
import { getFiltros } from "../static";

const MapsContext = createContext();

const MapsProvider = ({ children }) => {
  const [coords, setCoords] = useState({});
  const [marcadores, setMarcadores] = useState([]);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    if (!opciones.length) {
      setMarcadores([]);
      return;
    }
    const filtrarEscuelas = async () => {
      try {
        // http://localhost:1337/api/escuelas?filters[nivel][$contains]=PRIMARIA
        // const filters = `filters[nivel][$eq]=${'PRIMARIA'}`;

        const filters = getFiltros(opciones);
        const url = `http://localhost:1337/api/escuelas?${filters}`;
        const resp = await fetch(url);
        const { data } = await resp.json();
        
        // limpiar datos
        const arrayCoordenadas = data.map(({ id, attributes }) => ({
          id,
          nombre: attributes.nombre,
          descripcion: attributes.descripcion_tipo,
          lat: attributes.latitud,
          lng: attributes.longitud,
          nivel: attributes.nivel,
        }));
        // crear arreglo de marcadores
        setMarcadores(arrayCoordenadas);
      } catch (error) {
        console.log(error);
      }
    };
    filtrarEscuelas();

    return () => { setMarcadores( [] ) }
    
  }, [opciones]);

  return (
    <MapsContext.Provider
      value={{
        setCoords,
        coords,
        marcadores,
        setOpciones,
        opciones,
      }}
    >
      {children}
    </MapsContext.Provider>
  );
};

export { MapsProvider };

export default MapsContext;
