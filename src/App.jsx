import { useState } from "react";
import MapComponent from "./components/MapComponent";
import { MapsProvider } from "./context/MapsProvider";

function App() {
 
  return (
    <MapsProvider>
      <MapComponent />
    </MapsProvider>
  );
}

export default App;
