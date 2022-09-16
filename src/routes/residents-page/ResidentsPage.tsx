import { Select } from "@mantine/core";
import { IconHome, IconHome2, IconHomeSearch, IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FiniteResidentsView from "../../components/views/residents-view/FiniteResidentsView";
import InfiniteResidentsView from "../../components/views/residents-view/InfiniteResidentsView";
import { RAMLocation, RAMResident } from "../../services/ram-api/ram-types";
import {
  fetchResidentsFromURLs,
  searchLocations,
} from "../../services/ram-api/RAMDatabaseService";

interface ResidentsPageProps {
  location?: RAMLocation;
}

const ResidentsPage = (props: ResidentsPageProps) => {
  const [location, setLocation] = useState<RAMLocation | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<RAMLocation[]>([]);
  const [residents, setResidents] = useState<RAMResident[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const routerLocation = useLocation();

  useEffect(() => {
    if (!routerLocation.state) return;
    const defaultLocation = (routerLocation.state as { location: RAMLocation })
      .location;
    if (defaultLocation) {
      setSearchResults([defaultLocation]);
      setLocation(defaultLocation);
      setSelectedValue(defaultLocation.name);
      fetchResidentsFromURLs(defaultLocation.residents).then((results) =>
        setResidents(results)
      );
    }
  }, []);

  const handleSearch = (query: string) => {
    searchLocations(query).then((results) => {
      setSearchResults(results);
    });
  };

  const handleSelect = (value: string | null) => {
    setSelectedValue(value);
    if (value === null) {
      setLocation(undefined);
      return;
    }
    const _location = searchResults.filter((e) => e.name === value)[0];
    setLocation(_location);
    const residentURLs = _location.residents;
    fetchResidentsFromURLs(residentURLs).then((results) =>
      setResidents(results)
    );
  };

  return (
    <div className="ram-locations-page container">
      <div className="py-3"></div>
      <div className="d-flex align-items-center">
        <h4 className="m-0">Residents</h4>
        <Select
          value={selectedValue}
          searchable
          clearable
          className="ms-auto"
          placeholder="Filter by location"
          radius="xl"
          icon={<IconHomeSearch size={16} />}
          nothingFound="No options"
          rightSection={<></>}
          onSearchChange={(query) => handleSearch(query)}
          onChange={(value) => handleSelect(value)}
          data={searchResults.map((location) => {
            return { ...location, value: location.name, label: location.name };
          })}
        />
      </div>
      <hr />
      {location ? (
        <FiniteResidentsView data={residents} />
      ) : (
        <InfiniteResidentsView />
      )}
    </div>
  );
};

export default ResidentsPage;
