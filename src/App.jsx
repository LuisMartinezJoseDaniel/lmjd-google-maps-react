import { useJsApiLoader } from "@react-google-maps/api";
import MapComponent from "./components/MapComponent";
import Opciones from "./components/Opciones";
import { MapsProvider } from "./context/MapsProvider";


function App() {
  // Revisar que el API KEY se cargue correctamente
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });
  
  if (!isLoaded) {
    return;
  }

  return (
    <MapsProvider>
      <div className="md:flex bg-cyan-900">
        <aside className="md:w-3/12">
          <Opciones tipo="checkbox"/>
        </aside>
        <main className="md:w-full h-screen">
          <MapComponent />
        </main>
      </div>
    </MapsProvider>
  );
}

export default App;
