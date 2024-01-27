import geometry from "./geometry";
import properties from "./properties";

type feature = {
  type: string;
  id: string;
  geometry: geometry;
  properties: properties;
};

export default feature;
