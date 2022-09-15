import { useState, useEffect } from "react";
import { RAMLocation } from "../../services/ram-api/ram-types";
import { fetchLocations } from "../../services/ram-api/RAMDatabaseService";

const LocationsPage = () => {
  const [list, setList] = useState<RAMLocation[]>();

  useEffect(() => {
    fetchLocations().then((results) => setList(results));
  });

  return (
    <div>
      <h3>LocationsPage</h3>
      {list?.map((location) => (
        <p>{location.name}</p>
      ))}
    </div>
  );
};

export default LocationsPage;
