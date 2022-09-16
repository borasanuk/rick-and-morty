import { Badge } from "@mantine/core";
import { RAMResident } from "../../services/ram-api/ram-types";
import "./residentCard.scss";

const statusIndicatorColors = {
  Alive: "green",
  Dead: "red",
  unknown: "gray",
};
interface ResidentCardProps {
  resident: RAMResident;
}

const ResidentCard = ({ resident }: ResidentCardProps) => {
  const drawStatusIndicator = () => {
    return (
      <Badge
        className="ram-resident-card-status"
        variant="dot"
        color={statusIndicatorColors["Alive"]}
      >
        Alive
      </Badge>
    );
  };

  return (
    <div className="ram-resident-card">
      {drawStatusIndicator()}
      <img className="ram-resident-card-img" src={resident.image} />
      <div className="ram-resident-card-body">
        <div className="ram-resident-card-title">{resident.name}</div>
        <div className="ram-resident-card-item">
          <div className="ram-resident-card-item-label">Species</div>
          <div className="ram-resident-card-item-data">{resident.species}</div>
          {/* <Badge color="green">{resident.species + " - " + resident.gender}</Badge> */}
        </div>
        
        {resident.type && <div className="ram-resident-card-item">
          <div className="ram-resident-card-item-label">Type</div>
          <div className="ram-resident-card-item-data">{resident.type}</div>
        </div>}
        <div className="ram-resident-card-item">
          <div className="ram-resident-card-item-label">Gender</div>
          <div className="ram-resident-card-item-data">{resident.gender}</div>
        </div>
        <div className="ram-resident-card-item">
          <div className="ram-resident-card-item-label">Origin</div>
          <div className="ram-resident-card-item-data">{resident.origin.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ResidentCard;
