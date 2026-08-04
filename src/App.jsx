import React from "react";
import { Routes, Route } from "react-router-dom";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/clients/ClientDetails";

function App() {
  return (
    <Routes>
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:id" element={<ClientDetails />} />
    </Routes>
  );
}

export default App;