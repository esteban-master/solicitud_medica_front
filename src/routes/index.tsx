import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import Login from "../pages/login";
import HomeIcon from '@mui/icons-material/Home';
import Professional from "../pages/professional";
import RequireAuth from "./RequireAuth";
import Admin from "../pages/admin";
import AuthProvider from "../state/context/auth";

export const routesItems = [
  { 
    label: 'Inicio', 
    route: 'inicio', 
    component: <Home />, 
    active: true, 
    icon: <HomeIcon />, 
    protected: false 
  },
  { 
    label: 'Profesional', 
    route: 'profesional', 
    component: <Home />, 
    active: true, 
    icon: <HomeIcon />, 
    protected: true ,
  },
];

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

          <Route 
            path="admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />

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