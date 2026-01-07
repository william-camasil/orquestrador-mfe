import React, { lazy, Suspense } from "react"; // Must be imported for webpack to work
import "./App.css";

const LoginScreen = lazy(() => import("login_mfe/LoginScreen"));
const DashboardScreen = lazy(() => import("dashboard_mfe/DashboardScreen"));

const App = () => {
  return (
    <div className="orquestrador">
      <p className="orquestrador-p">
        Orquestrador - host inicial (contém todos os MFEs)
      </p>
      <Suspense fallback={<div>Loading LoginScreen...</div>}>
        <LoginScreen />
        <DashboardScreen />
      </Suspense>
    </div>
  );
};

export default App;
