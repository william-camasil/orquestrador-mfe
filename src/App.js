import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";

const LoginScreen = lazy(() => import("login_mfe/LoginScreen"));
const DashboardScreen = lazy(() => import("dashboard_mfe/DashboardScreen"));
const CadPessoaJuridicaScreen = lazy(() =>
  import("cadastro_pessoa_juridica_mfe/CadPessoaJuridicaScreen")
);
const CadPessoaFisicaScreen = lazy(() =>
  import("cadastro_pessoa_fisica_mfe/CadPessoaFisicaScreen")
);

// const App = () => {
//   return (
//     <div className="orquestrador">
//       <p className="orquestrador-p">
//         Orquestrador - host inicial (contém todos os MFEs)
//       </p>
//       <Suspense fallback={<div>Loading LoginScreen...</div>}>
//         <LoginScreen />
//         <DashboardScreen />
//         <CadPessoaJuridicaScreen />
//         <CadPessoaFisicaScreen />
//       </Suspense>
//     </div>
//   );
// };

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/cadastro-pf" element={<CadPessoaJuridicaScreen />} />
          <Route path="/cadastro-pj" element={<CadPessoaFisicaScreen />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
