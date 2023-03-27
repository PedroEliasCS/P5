/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
/**
 * Faz a manutenção das rotas da aplicação
 */
const AppRoutes = () => {
  /**
   * Faz o teste de privatização da rota quando colocado englobando a mesma
   * @param props é passado automaticamente quando chamdo no React.FC
   */

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
