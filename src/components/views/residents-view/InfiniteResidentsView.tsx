import { Alert, Badge, Loader, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { RAMResident } from "../../../services/ram-api/ram-types";
import { fetchResidents } from "../../../services/ram-api/RAMDatabaseService";
import ResidentCard from "../../resident-card/ResidentCard";
import "./residentsView.scss";

const InfiniteResidentsView = () => {
  const [residents, setResidents] = useState<RAMResident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [isUpdateRequested, setIsUpdateRequested] = useState(true);
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
      fetchResidents(page).then((response) => {
        setIsLoading(false);
        if (response === undefined) {
          setIsError(true);
        } else {
          setIsNextAvailable(response.info.next != null);
          if (response.results)
            setResidents((prev) => [...prev, ...response.results]);
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
      There was an error loading residents. Try refreshing the page, and if that
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
    <>
      <div className="ram-residents-view">
        {residents.map((resident) => (
          <ResidentCard resident={resident} key={resident.id} />
        ))}
        <div ref={loaderRef} />
      </div>
      <div className="py-2" />
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Loader color="green" size="sm" />
          <Text color="dimmed" weight={500}>
            Loading residents
          </Text>
        </div>
      )}
      {!isNextAvailable && (
        <div className="d-flex">
          <Badge variant="light" className="mx-auto">
            That's all of 'em.
          </Badge>
        </div>
      )}
      <div className="py-2" />
    </>
  );
};

export default InfiniteResidentsView;
