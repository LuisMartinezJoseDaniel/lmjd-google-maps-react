import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";

import useMaps from "../hooks/useMaps";
import Opciones from "./Opciones";


const MapComponent = () => {
  const { coords, marcadores } = useMaps();

  const center = { lat: 17.008445329530776, lng: -96.7555806258731 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCKjO2pMOuWGIDCZYUEC_V0_hPVUNLvyiU",
  });

  if (!isLoaded) {
    return;
  }

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  return (
    <div className="w-100" style={{ height: "100vh" }}>
      <Opciones />

      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {Object.keys(coords).length > 0 && (
          <Marker
            position={center}
            animation={window.google.maps.Animation.DROP}
          />
        )}

        {marcadores.length > 0 && (
          <MarkerClusterer
            options={options}

          >
            {(clusterer) =>
              marcadores.map((marcador) => (
                <Marker
                  key={marcador.id}
                  position={{ lat: marcador.lat, lng: marcador.lng }}
                  clusterer={clusterer}
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
