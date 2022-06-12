import { Auth, onAuthStateChanged, User, AuthError, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { FC, createContext, useState, ReactNode, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/firebaseConfig";

type LoginData = { email: string, password: string }

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: any
}

export type AuthContextType = {
  state: AuthState;
  auth: Auth;
  signIn: (data:LoginData) => void;
  signUp: (data:LoginData) => void;
  signOut: () => Promise<void>;
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

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setState(prev => ({ ...prev, user }))
    })
  }, [])

  const signIn = ({ email, password }: LoginData) => {
    setState(prev => ({ ...prev, isLoading: true }))
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setState(prev => ({ ...prev, isLoading: false }))
        toast.success('Ingreso exitoso', { position: toast.POSITION.BOTTOM_CENTER })
      })
      .catch((error) => {
        console.log({error})
        setState(prev => ({ ...prev, isLoading: false, error: error }))
        toast.error('Credenciales invalidas', { position: toast.POSITION.BOTTOM_CENTER })
      })
  };
  
  const signUp = ({ email, password }: LoginData) => createUserWithEmailAndPassword(auth, email, password);

  const handleSignOut = () => signOut(auth).then(() => {
    toast.success('Sesion finalizada', { position: toast.POSITION.BOTTOM_CENTER })
  }).catch((error) => {
    toast.error('Intentalo nuevamente', { position: toast.POSITION.BOTTOM_CENTER })
  });

  return (
    <AuthContext.Provider value={{ state, auth, signIn, signUp, signOut: handleSignOut }}>
      { children }
    </AuthContext.Provider>
  )
}


export default AuthProvider;