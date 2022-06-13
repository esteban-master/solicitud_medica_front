import { FC, createContext, useState, ReactNode, useContext } from "react";

export type SheduleState = {
  professional: any;
  professionalFilter: { id: number, label: string } | null;
  date: Date;
  activeStep: number;
  profesionalEditId: number;
  patientEditId: number;
  openMenuEdit: boolean;
  anchorEl: HTMLElement | null
}

export type SheduleContextType = {
  state: SheduleState;
  changeState: (column: Partial<SheduleState>) => void;
}


export const ScheduleContext = createContext<SheduleContextType | null>(null);

export const useShedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("Inicializar Invoice Context antes de usar");
  }
  return context;
};

const SheduleProvider: FC<ReactNode> = ({ children }) => {
  const [state, setState] = useState<SheduleState>({
    professional: '',
    date: new Date(),
    professionalFilter: null,
    activeStep: 0,
    profesionalEditId: 0,
    patientEditId: 0,
    anchorEl: null,
    openMenuEdit: false
  })

  function changeState(state: Partial<SheduleState>): void {
    setState(prevState => ({ ...prevState, ...state }))
  }

  return (
    <ScheduleContext.Provider value={{ state, changeState }}>
      { children }
    </ScheduleContext.Provider>
  )
}


export default SheduleProvider;