import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../redux/store';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const location =  useLocation();

  if (!auth.logged) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children;
}

export default RequireAuth