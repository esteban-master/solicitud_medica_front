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
import ConfirmDialog from './components/confirmDialog';
import MenuPatient from './components/medicalRecord/menuPatient';
import MedicalRecordInfo from './components/medicalRecord/medicalRecordInfo';
import NewMedicalRecord from './components/medicalRecord/newMedicalRecord';
import MedicalCareHistory from './components/patient/medicalCareHistory';

NiceModal.register('scheduleModal', ScheduleModal);
NiceModal.register('confirmDialog', ConfirmDialog);
NiceModal.register('menuPatient', MenuPatient);
NiceModal.register('medicalRecordInfo', MedicalRecordInfo);
NiceModal.register('newMedicalRecord', NewMedicalRecord);
NiceModal.register('medicalRecordHistory', MedicalCareHistory);

const queryClient = new QueryClient()

function App() {
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
