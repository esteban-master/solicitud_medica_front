import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Schedule from "./pages/schedule";
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const routesItems = [
  { label: 'Inicio', route: 'inicio', component: <Home />, active: true, icon: <HomeIcon /> },
  { label: 'Solicitar hora medica', route: 'agendar', component: <Schedule />, active: true, icon: <EventAvailableIcon /> },
];

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          {
            routesItems
              .filter(route => route.active)
              .map(({route, component}) => <Route path={route} element={component} />)
          }
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};