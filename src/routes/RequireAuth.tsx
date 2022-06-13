import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/context/auth'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { state: { user } } = useAuth();
  const location =  useLocation();

  if (!user) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children;
}

export default RequireAuth