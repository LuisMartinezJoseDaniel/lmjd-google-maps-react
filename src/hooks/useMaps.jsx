import { useContext } from 'react'
import MapsContext from "../context/MapsProvider";

const useMaps = () => {
  return useContext(MapsContext);
}

export default useMaps