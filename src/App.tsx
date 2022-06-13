import './App.css';
import Router from './routes';
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
import { auth } from './firebase/firebaseConfig';
import {  updateProfile } from 'firebase/auth';
import AddProfessionalDialog from './components/addProfessionalDialog';


NiceModal.register('scheduleModal', ScheduleModal);
NiceModal.register('addProfesionalModal', AddProfessionalDialog);

const queryClient = new QueryClient()

function App() {
  
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
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer autoClose={3000}/>
      <ReactQueryDevtools initialIsOpen={false} />
        <SheduleProvider>
          <NiceModal.Provider>
            <Router />
        </NiceModal.Provider>
        </SheduleProvider>
    </QueryClientProvider>
  );
}

export default App;
