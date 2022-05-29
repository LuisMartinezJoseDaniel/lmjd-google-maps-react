import { useJsApiLoader } from "@react-google-maps/api";
import MapComponent from "./components/MapComponent";
import { MapsProvider } from "./context/MapsProvider";


function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  if (!isLoaded) {
    return;
  }

  return (
    <MapsProvider>
      <MapComponent />
    </MapsProvider>
  );
}

export default App;
