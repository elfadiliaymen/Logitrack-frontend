import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/clients/ClientDetails";
import ClientForm from "./pages/clients/ClientForm";
import EditClientForm from "./pages/clients/EditClientForm";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderDetails from "./pages/commandes/OrderDetails";
import Orders from "./pages/commandes/Orders";
import OrderForm from "./pages/commandes/OrderForm";
import EditOrderForm from "./pages/commandes/EditOrderForm";
import Products from "./pages/produits/Products";
import ProductDetails from "./pages/produits/ProductDetails";
import ProductForm from "./pages/produits/ProductForm";
import EditProductForm from "./pages/produits/EditProductForm";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import RouteGuard from "./component/RouteGuard";
import RoleGuard from "./component/RoleGuard";
import AccessDenied from "./component/AccessDenied";
import NavBar from "./component/NavBar";
import Header from "./component/Header";
import Footer from "./component/Footer";

const ALL_ROLES = ["ADMIN", "MANAGER", "AGENT"];
const MANAGEMENT_ROLES = ["ADMIN", "MANAGER"];

function App() {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <div className="app">
      <Header
        onToggleMenu={function () {
          setNavOpen(!navOpen);
        }}
      />
      <div className={"app-layout" + (navOpen ? " nav-open" : "")}>
        <NavBar open={navOpen} />
        <main className="app-main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          <Route
            path="/"
            element={
              <RouteGuard>
                <Navigate to="/dashboard" replace />
              </RouteGuard>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <Dashboard />
              </RoleGuard>
            }
          />

          <Route
            path="/profile"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <Profile />
              </RoleGuard>
            }
          />

          <Route
            path="/users"
            element={
              <RoleGuard allowedRoles={["ADMIN"]}>
                <Users />
              </RoleGuard>
            }
          />

          <Route
            path="/clients"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <Clients />
              </RoleGuard>
            }
          />

          <Route
            path="/clients/new"
            element={
              <RoleGuard allowedRoles={MANAGEMENT_ROLES}>
                <ClientForm />
              </RoleGuard>
            }
          />

          <Route
            path="/clients/:id"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <ClientDetails />
              </RoleGuard>
            }
          />

          <Route
            path="/clients/:id/edit"
            element={
              <RoleGuard allowedRoles={MANAGEMENT_ROLES}>
                <EditClientForm />
              </RoleGuard>
            }
          />

          <Route
            path="/products"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <Products />
              </RoleGuard>
            }
          />

          <Route
            path="/products/new"
            element={
              <RoleGuard allowedRoles={MANAGEMENT_ROLES}>
                <ProductForm />
              </RoleGuard>
            }
          />

          <Route
            path="/products/:id"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <ProductDetails />
              </RoleGuard>
            }
          />

          <Route
            path="/products/:id/edit"
            element={
              <RoleGuard allowedRoles={MANAGEMENT_ROLES}>
                <EditProductForm />
              </RoleGuard>
            }
          />

          <Route
            path="/orders"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <Orders />
              </RoleGuard>
            }
          />

          <Route
            path="/orders/new"
            element={
              <RoleGuard allowedRoles={MANAGEMENT_ROLES}>
                <OrderForm />
              </RoleGuard>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <RoleGuard allowedRoles={ALL_ROLES}>
                <OrderDetails />
              </RoleGuard>
            }
          />

          <Route
            path="/orders/:id/edit"
            element={
              <RoleGuard allowedRoles={MANAGEMENT_ROLES}>
                <EditOrderForm />
              </RoleGuard>
            }
          />
        </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;