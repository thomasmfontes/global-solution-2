import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import SobrePage from "../pages/SobrePage";
import FAQPage from "../pages/FAQPage";
import IntegrantesPage from "../pages/IntegrantesPage";
import DashboardPage from "../pages/DashboardPage";
import PerfilPage from "../pages/PerfilPage";
import RecomendacoesPage from "../pages/RecomendacoesPage";
import EmpregabilidadePage from "../pages/EmpregabilidadePage";
import LoginPage from "../pages/LoginPage";
import RegistroPage from "../pages/RegistroPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/integrantes" element={<IntegrantesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/recomendacoes" element={<RecomendacoesPage />} />
          <Route path="/empregabilidade" element={<EmpregabilidadePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
