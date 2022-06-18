import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Professional from "../pages/professional";
import RequireAuth from "./RequireAuth";
import AuthProvider from "../state/context/auth";
import Admin from "../pages/admin";

export default function Router() {
  return (
    <BrowserRouter>
    <AuthProvider>
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

          <Route path="admin" element={<Admin />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};