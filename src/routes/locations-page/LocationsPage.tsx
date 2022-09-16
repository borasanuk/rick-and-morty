import LocationsView from "../../components/views/locations-view/LocationsView";
import "./locationsPage.scss";

const LocationsPage = () => {
  return (
    <div className="ram-locations-page container">
      <div className="py-3"></div>
      <h4>Locations</h4>
      <hr />
      <LocationsView />
    </div>
  );
};

export default LocationsPage;
