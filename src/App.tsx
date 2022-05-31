import './App.css';
import Router from './Routes';
import NiceModal from "@ebay/nice-modal-react";
import ScheduleModal from './components/scheduleModal';
import SheduleProvider from './state/context/SheduleContext';

NiceModal.register('scheduleModal', ScheduleModal);

function App() {
  return (
    <SheduleProvider>
      <NiceModal.Provider>
        <Router />
      </NiceModal.Provider>
    </SheduleProvider>
  );
}

export default App;
