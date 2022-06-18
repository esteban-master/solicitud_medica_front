import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../redux/store';
// import { useAuth } from '../state/context/auth'


const RequireAuth = ({ children }: { children: JSX.Element }) => {
  // const { state: { user } } = useAuth();
  const auth = useAuth()
  const location =  useLocation();
  console.log("PAGE: ", auth)
  if (!auth.logged) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children;
}

export default RequireAuth