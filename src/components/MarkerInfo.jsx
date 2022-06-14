import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";


const Titulo = styled.h4`
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
`;

const SpanCoordenada = styled.span`
  font-weight: 700;
`

const MarkerInfo = ( { coords, nombre , icon, clusterer, texto } ) => {

  const [isMarkerActive, setIsMarkerActive] = useState(false);
    const labelOptions = {
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
    };
  return (
    <Marker
      position={coords}
      animation={window.google.maps.Animation.DROP}
      label={{ ...labelOptions, text: texto }}
      icon={icon}
      clusterer={ clusterer ?? null }
      onClick={() => setIsMarkerActive(!isMarkerActive)}
    >
      {isMarkerActive && (
        <InfoWindow position={coords} options={{ maxWidth: 320 }}>
          <>
            <Titulo>
              {nombre}
            </Titulo>
            <p>
              Latitud: <SpanCoordenada>{coords.lat}</SpanCoordenada>
            </p>
            <p>
              Longitud <SpanCoordenada>{coords.lng}</SpanCoordenada>
            </p>
          </>
        </InfoWindow>
      )}
    </Marker>
  );
}

MarkerInfo.propTypes = {
  texto: PropTypes.string,
  icon : PropTypes.object,
  nombre : PropTypes.string,
  coords : PropTypes.object.isRequired,
  
}

MarkerInfo.defaultProps = {
  texto: "Mi ubicion",
  icon: null,
  clusterer: null,
  nombre: "Mi ubicación"
};


export default MarkerInfo