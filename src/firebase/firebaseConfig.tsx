import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { toast } from 'react-toastify';

type LoginData = { email: string, password: string }

const firebaseConfig = {
  apiKey: "AIzaSyBtpVS05P2NFbO2g0JCgtFicolBM6uXQVA",
  authDomain: "adulto-mayor-auth.firebaseapp.com",
  projectId: "adulto-mayor-auth",
  storageBucket: "adulto-mayor-auth.appspot.com",
  messagingSenderId: "64736659597",
  appId: "1:64736659597:web:9b62e54c29adaa24bd3ac4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signIn = ({ email, password }: LoginData, success: (user: User) => void, error: () => void) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      success(credentials.user)
      toast.success('Ingreso exitoso', { position: toast.POSITION.BOTTOM_CENTER })
    })
    .catch(() => {
      error()
      toast.error('Credenciales invalidas', { position: toast.POSITION.BOTTOM_CENTER })
    })
};

export const handleSignOut = (succes: () => void) => signOut(auth).then(() => {
  succes()
  toast.success('Sesion finalizada', { position: toast.POSITION.BOTTOM_CENTER })
}).catch(() => {
  toast.error('Intentalo nuevamente', { position: toast.POSITION.BOTTOM_CENTER })
});