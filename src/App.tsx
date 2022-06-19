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

NiceModal.register('scheduleModal', ScheduleModal);

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
