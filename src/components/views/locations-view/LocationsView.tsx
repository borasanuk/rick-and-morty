import { useState, useEffect } from "react";
import { RAMLocation } from "../../../services/ram-api/ram-types";
import { fetchLocations } from "../../../services/ram-api/RAMDatabaseService";
import LocationCard from "../../location-card/LocationCard";
import "./locationsView.scss";

const LocationsView = () => {
  const [locations, setLocations] = useState<RAMLocation[]>([]);

  useEffect(() => {
    fetchLocations().then((results) => setLocations(results));
  });

  return (
    <div className="ram-locations-view">
      {locations.map((location) => (
        <LocationCard location={location} />
      ))}
    </div>
  );
};

export default LocationsView;
