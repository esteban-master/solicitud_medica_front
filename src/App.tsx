import './App.css';
import Router from './Routes';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify';
import NiceModal from "@ebay/nice-modal-react";
import ScheduleModal from './components/scheduleModal';
import SheduleProvider from './state/context/SheduleContext';
import 'react-toastify/dist/ReactToastify.css';
import { app, auth, signIn, signUp } from './firebase/firebaseConfig';
import { useEffect } from 'react';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import AuthProvider from './state/context/auth';


NiceModal.register('scheduleModal', ScheduleModal);

const queryClient = new QueryClient()

function App() {

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log({user})
    })
  }, [])
  
  function handleSubmit() {
    signUp({ email: "esteban@gmail.com", password: 'holaEsteban' }).then((userCredential) => {
      console.log({ userCredential })
    })
    .catch((error) => {
      console.log({ error })
    });
  }

  function handleSignOut() {
    signOut(auth).then(() => {
      console.log("SUCCCES OUT")
    }).catch((error) => {
      console.log("FAILED OUT")
    });
  }

  function handleSignIn() {
    signIn({ email: "esteban@gmail.com", password: 'holaEsteban' }).then((userCredential) => {
      console.log('SIGN IN', userCredential)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ error, errorCode, errorMessage })
    });
  }

  function handleUpdate() {
    const user = auth.currentUser;
    if (user !== null) {
      updateProfile(user, {
        displayName: 'Poto suelto 2',
        photoURL: 'https://via.placeholder.com/600/92c952'
      }).then(function() {
        console.log('Update success')
      }, function(error) {
        console.log('Update failed')
      });
    }
    // "lLcqFzDkGTRL2s4Leiw8Xgi9DFt2"
    // "lLcqFzDkGTRL2s4Leiw8Xgi9DFt2"
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer autoClose={3000}/>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <SheduleProvider>
          <NiceModal.Provider>
            <Router />
        </NiceModal.Provider>

        <button onClick={handleSubmit}>Sign up</button>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignOut}>Salir</button>
        <button onClick={handleUpdate}>Update</button>
        </SheduleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
