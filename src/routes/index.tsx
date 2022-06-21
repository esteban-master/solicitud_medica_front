import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import Login from "../pages/login";
import MedicalRecord from "../pages/medicalRecord";
import Professional from "../pages/professional";
import RequireAuth from "./RequireAuth";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />

          <Route 
            path="inicio"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route 
            path="profesional"
            element={
              <RequireAuth>
                <Professional />
              </RequireAuth>
            }
          />

          <Route 
            path="paciente/:id/ficha"
            element={
              <RequireAuth>
                <MedicalRecord />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};