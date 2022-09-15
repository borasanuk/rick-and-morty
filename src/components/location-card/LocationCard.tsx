// I mean it's more of a row, but LocationRow sounded weird

import { RAMLocation } from "../../services/ram-api/ram-types";
import "./locationCard.scss";

interface LocationCardProps {
  location: RAMLocation;
}

const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <div className="ram-location-card">
      <div className="ram-location-card-title">{location.name}</div>
      <div className="ram-location-card-items">
        <div className="ram-location-card-item md">
          <div className="ram-location-card-item-name">Type</div>
          <div className="ram-location-card-item-data">{location.type}</div>
        </div>
        <div className="ram-location-card-item lg">
          <div className="ram-location-card-item-name">Dimension</div>
          <div className="ram-location-card-item-data">
            {location.dimension}
          </div>
        </div>
        <div className="ram-location-card-item sm">
          <div className="ram-location-card-item-name">Population</div>
          <div className="ram-location-card-item-data">
            {location.residents.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
