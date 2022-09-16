import { RAMResident } from "../../services/ram-api/ram-types";
import "./residentCard.scss";

interface ResidentCardProps {
  resident: RAMResident;
}

const ResidentCard = ({ resident }: ResidentCardProps) => {
  return (
    <div className="ram-resident-card">
      <img className="ram-resident-card-img" src={resident.image} />
      <div className="ram-resident-card-name">{resident.name}</div>
      <div className="ram-resident-card-item"></div>
    </div>
  );
};

export default ResidentCard;
