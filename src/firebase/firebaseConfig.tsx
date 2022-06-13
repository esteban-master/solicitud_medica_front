import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

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

