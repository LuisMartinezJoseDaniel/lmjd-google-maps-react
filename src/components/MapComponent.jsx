import { useMemo } from "react";
import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";

import useMaps from "../hooks/useMaps";
import MarkerInfo from "./MarkerInfo";

// Imagen del cluster
const clusterOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

const MapComponent = () => {
  const { coords, marcadores } = useMaps();

  //Memorizar estas coordenadas
  const center = useMemo(
    () => ({
      lat: 17.008445329530776,
      lng: -96.7555806258731,
    }),
    []
  );
  //Limpiar el mapa y establecer theme
  const mapOptions = useMemo(
    () => ({
      mapId: "1454c180ca420936",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  // Icono mi Ubicacion
  const customIcon = {
    url: "https://img.icons8.com/fluency/344/map-marker.png",
    scaledSize: new google.maps.Size(34, 34),
  };

  return (
    <GoogleMap
      center={center}
      zoom={8}
      mapContainerClassName="h-screen"
      options={mapOptions}
    >
      {/* Mi ubicacion */}
      {Object.keys(coords).length > 0 && (
        <MarkerInfo coords={coords} icon={customIcon} />
      )}
      {/* Marcadores de la base de datos */}
      {marcadores.length > 0 && (
        <MarkerClusterer options={clusterOptions} gridSize={20}>
          {/* MarkerCluster necesita una funcion por defecto */}
          {(clusterer) =>
            marcadores.map((marcador) => (
              // Marker y markerInfo
              <MarkerInfo
                key={marcador.id}
                nombre={marcador.nombre}
                coords={{ lat: marcador.lat, lng: marcador.lng }}
                clusterer={clusterer}
                texto={marcador.nivel}
              />
            ))
          }
        </MarkerClusterer>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
