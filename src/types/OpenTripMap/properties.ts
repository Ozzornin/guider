type properties = {
  xid: string; // Unique identifier of the object in OpenTripMap
  name: string; // The name of the object
  address?: {
    city?: string;
    state?: string;
    county?: string;
    suburb?: string;
    country?: string;
    country_code?: string;
    neighbourhood?: string;
  };
  kinds?: string; // Comma-separated list of categories. see List of categories
  osm?: string; // OpenStreetMap identifier of the object
  wikidata?: string; // Wikidata identifier of the object
  rate: "0" | "1" | "2" | "3" | "1h" | "2h" | "3h"; // Rating of the object popularity
  image?: string; // Image URL
  preview?: {
    description?: string; // Image thumbnail
    source?: string; // Image thumbnail URL
    width?: number; // Thumbnail width in pixels
    height?: number; // Thumbnail height in pixels
  };
  wikipedia?: string; // Link to Wikipedia
  wikipedia_extracts?: {
    description?: string; // Extracts of the wikipedia page
    title?: string; // Page title in wikipedia
    text?: string; // Plain-text extract
    html?: string; // Limited HTML extract
  };
  voyage?: string; // Link to WikiVoyage
  url?: string; // Link to website
  otm: string; // Link to object at opentripmap.com
  sources: {
    description?: string; // Sources of information on object
    geometry?: "osm" | "wikidata" | "snow" | "cultura.ru" | "rosnedra"; // Source of object geometry
    attributes?: (
      | "osm"
      | "wikidata"
      | "snow"
      | "cultura.ru"
      | "rosnedra"
      | "user"
    )[]; // Sources of object attributes
  };
  info?: {
    description?: string; // Extended object information (for some object categories)
    src?: string; // Source ID
    src_id?: number; // Object identifier in the source
    descr?: string; // Object description
  };
  bbox?: {
    description?: string; // Minimum bounding box for the object geometry
    lon_min?: number; // Longitude minimum
    lon_max?: number; // Longitude maximum
    lat_min?: number; // Latitude minimum
    lat_max?: number; // Latitude maximum
  };
  point: {
    description?: string; // Point geographic coordinates of the object
    lon: number; // Longitude
    lat: number; // Latitude
  };
};

export default properties;
