import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import SobrePage from "../pages/SobrePage";
import FAQPage from "../pages/FAQPage";
import IntegrantesPage from "../pages/IntegrantesPage";
import DashboardPage from "../pages/DashboardPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/integrantes" element={<IntegrantesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
