import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LocationsPage from "./routes/locations-page/LocationsPage";
import ResidentsPage from "./routes/residents-page/ResidentsPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="locations" element={<LocationsPage />} />
            <Route path="residents" element={<ResidentsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
