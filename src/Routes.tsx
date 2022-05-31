import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import HomeIcon from '@mui/icons-material/Home';

export const routesItems = [
  { label: 'Inicio', route: 'inicio', component: <Home />, active: true, icon: <HomeIcon /> },
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
              .map(({route, component}) => <Route key={route} path={route} element={component} />)
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