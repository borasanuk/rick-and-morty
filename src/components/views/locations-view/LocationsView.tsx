import { Alert, Badge, Loader, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { RAMLocation } from "../../../services/ram-api/ram-types";
import { fetchLocations } from "../../../services/ram-api/RAMDatabaseService";
import LocationCard from "../../location-card/LocationCard";
import "./locationsView.scss";

const LocationsView = () => {
  const [locations, setLocations] = useState<RAMLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [isUpdateRequested, setIsUpdateRequested] = useState(false);
  const [isNextAvailable, setIsNextAvailable] = useState(true);

  const loaderRef = useRef(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setIsUpdateRequested(true);
    }
  }, []);

  useEffect(() => {
    if (isUpdateRequested && !isLoading && isNextAvailable) {
      setIsUpdateRequested(false);
      setPage((prev) => prev + 1);
    }
  }, [isUpdateRequested, isLoading, isNextAvailable]);

  useEffect(() => {
    if (isNextAvailable) {
      setIsLoading(true);
      fetchLocations(page).then((response) => {
        setIsLoading(false);
        if (response === undefined) {
          setIsError(true);
        } else {
          setIsNextAvailable(response.info.next != null);
          if (response.results)
            setLocations((prev) => [...prev, ...response.results]);
        }
      });
    }
  }, [page, isNextAvailable]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
  }, [handleObserver]);

  return isError ? (
    <Alert icon={<IconAlertCircle size={16} />} title="Uh-oh!" color="red">
      There was an error loading locations. Try refreshing the page, and if that
      doesn't work, send an angry tweet to{" "}
      <a
        href="https://twitter.com/rickandmortyapi"
        target="_blank"
        rel="noreferrer"
      >
        @rickandmortyapi
      </a>
      .
    </Alert>
  ) : (
    <div className="ram-locations-view">
      {locations.map((location) => (
        <LocationCard location={location} key={location.id} />
      ))}
      <div ref={loaderRef} />
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Loader color="green" size="sm" />
          <Text color="dimmed" weight={500}>
            Loading locations
          </Text>
        </div>
      )}
      {!isNextAvailable && (
        <Badge variant="light" className="mx-auto">
          That's all of 'em.
        </Badge>
      )}
      <div className="py-2" />
    </div>
  );
};

export default LocationsView;
