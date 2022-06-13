import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useProfessions } from '../../api/profession'

type Props = {
  value: { id: number, label: string } | null;
  changeState: (event: React.SyntheticEvent<Element, Event>, item: { id: number, label: string } | null) => void;
};

export default function ProfessionsList({ value, changeState }: Props) {
  const professions =  useProfessions()

  if (professions.isLoading) {
    return <CircularProgress />
  }

  const professionsOptions: { label: string, id: number }[] = professions.isSuccess ? professions.data.map(item => ({ label: item.name, id: item.id })) : [];

  return (
    <Autocomplete
      onChange={changeState}
      disablePortal
      fullWidth
      value={value}
      options={professionsOptions}
      isOptionEqualToValue={(option, valuee) => option.id === valuee.id}
      renderInput={(params) => <TextField {...params} label="Profesional" />}
    />
  )
}

