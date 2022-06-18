import { Auth, onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { FC, createContext, useState, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/firebaseConfig";
import { HealthProfessional } from "../../../models/healthProfessional";
type LoginData = { email: string, password: string }

// export type UserEntity = Partial<> & User;

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: any;
}

export type AuthContextType = {
  state: AuthState;
  auth: Auth;
  signIn: (data:LoginData) => void;
  signUp: (data:LoginData) => void;
  signOut: () => Promise<void>;
  changeState: (column: Partial<AuthState>) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Inicializar Auth Context antes de usar");
  }
  return context;
};

const AuthProvider: FC<ReactNode> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null
  })
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setState(prev => ({ ...prev, user }))
    })
  }, [])

  function changeState(state: Partial<AuthState>): void {
    setState(prevState => ({ ...prevState, ...state }))
  }

  const signIn = ({ email, password }: LoginData) => {
    setState(prev => ({ ...prev, isLoading: true }))
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setState(prev => ({ ...prev, isLoading: false }))
        toast.success('Ingreso exitoso', { position: toast.POSITION.BOTTOM_CENTER })
        navigate('/inicio')
      })
      .catch((error) => {
        setState(prev => ({ ...prev, isLoading: false, error: error }))
        toast.error('Credenciales invalidas', { position: toast.POSITION.BOTTOM_CENTER })
      })
  };
  
  const signUp = ({ email, password }: LoginData) => createUserWithEmailAndPassword(auth, email, password);

  const handleSignOut = () => signOut(auth).then(() => {
    toast.success('Sesion finalizada', { position: toast.POSITION.BOTTOM_CENTER })
    setState(prev => ({ ...prev, isProfessional: false }))
  }).catch((error) => {
    toast.error('Intentalo nuevamente', { position: toast.POSITION.BOTTOM_CENTER })
  });

  return (
    <AuthContext.Provider value={{ state, auth, signIn, signUp, signOut: handleSignOut, changeState }}>
      { children }
    </AuthContext.Provider>
  )
}


export default AuthProvider;