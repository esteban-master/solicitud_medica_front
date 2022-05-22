import './App.css';
import Router from './Routes';
import NiceModal from "@ebay/nice-modal-react";
import { ScheduleModal } from './components/schedule/ScheduleModal';

NiceModal.register('schedule', ScheduleModal);

function App() {
  return (
    <NiceModal.Provider>
      <Router />
    </NiceModal.Provider>
  );
}

export default App;
