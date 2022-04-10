import './App.css';
import Router from './Routes';
import NiceModal from "@ebay/nice-modal-react";

function App() {
  return (
    <NiceModal.Provider>
      <Router />
    </NiceModal.Provider>
  );
}

export default App;
