import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { RAMLocation } from "./services/ram-api/ram-types";
import { fetchLocations } from "./services/ram-api/RAMDatabaseService";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
