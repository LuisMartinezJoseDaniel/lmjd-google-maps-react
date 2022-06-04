import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

import useMaps from "../hooks/useMaps";
import MarkerInfo from "./MarkerInfo";
import Opciones from "./Opciones";

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
  //Limpiar el mapa
  const mapOptions = useMemo(
    () => ({
      mapId: "1454c180ca420936",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const clusterOptions = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  const customIcon = {
    url: "https://img.icons8.com/fluency/344/map-marker.png",
    scaledSize: new google.maps.Size(34, 34),
  };

  return (
    <div className="" >
      
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerClassName="h-screen"
        options={mapOptions}
      
      >
        {/* Mi ubicacion */}
        {Object.keys(coords).length > 0 && (
          <MarkerInfo coords={coords} nombre="Mi ubicación" icon={customIcon} />
        )}
        {/* Marcadoes de la base de datos */}
        {marcadores.length > 0 && (
          <MarkerClusterer options={clusterOptions} gridSize={20}>
            {/* MarkerCluster necesita una funcion por defecto */}
            {(clusterer) =>
              marcadores.map((marcador) => (
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
    </div>
  );
};

export default MapComponent;
