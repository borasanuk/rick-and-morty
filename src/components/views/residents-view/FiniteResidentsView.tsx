import { Alert, Loader, Badge, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";
import { isError } from "util";
import { RAMResident } from "../../../services/ram-api/ram-types";
import ResidentCard from "../../resident-card/ResidentCard";

interface FiniteResidentsViewProps {
  data: RAMResident[];
  loading?: boolean;
}

const FiniteResidentsView = ({
  data: residents,
  loading,
}: FiniteResidentsViewProps) => {
  return (
    <>
      <div className="ram-residents-view">
        {residents.length > 0 ? (
          residents.map((resident) => (
            <ResidentCard resident={resident} key={resident.id} />
          ))
        ) : (
          <Text color="dimmed" weight={500}>
            No residents.
          </Text>
        )}
      </div>
      <div className="py-2" />
      {loading && (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Loader color="green" size="sm" />
          <Text color="dimmed" weight={500}>
            Loading residents
          </Text>
        </div>
      )}
      <div className="py-2" />
    </>
  );
};

export default FiniteResidentsView;
