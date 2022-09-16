import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  const location = useLocation();

  if (location.pathname === "/") {
   return <Navigate to="/locations" />;
    /* NOTE: I'm doing this here because react-router doesn't let me define a defult outlet with a pathname AFAIK.
    I could use "index" on the Route but I want to have have "/locations" in the pathname in case I want to do sth like "/locations/1" later on. */
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
