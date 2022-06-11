import React from "react";
import { Autocomplete, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import ListProfessional from "./ListProfessional";
import { useShedule } from "../../state/context/SheduleContext";
import { useHealthProfessionals } from "../../api/healthProfessionals";
import { useProfessions } from "../../api/profession";

const StepOne = () => {
  const { state ,changeState } = useShedule();
  const professions =  useProfessions()
  const healthProfessionals  = useHealthProfessionals(state.professionalFilter?.id)

  if (professions.isLoading) {
    return <CircularProgress />
  }

  const professionsOptions: { label: string, id: number }[] = professions.isSuccess ? professions.data.map(item => ({ label: item.name, id: item.id })) : [];
  console.log({professionsOptions, healthProfessionals})
  return (
    <Grid container spacing={2}>
      {
        professions.isSuccess && 
        <React.Fragment>
          <Grid item xs={12}>
            <Autocomplete
              onChange={(_, item) => changeState({ professionalFilter: item })}
              disablePortal
              fullWidth
              value={state.professionalFilter}
              options={professionsOptions}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} label="Profesional" />}
            />
          </Grid>
          {
            !state.professionalFilter ? (
              <Grid item xs={12}>
                <Typography variant="h2" component="h2">Selecione un profesional</Typography>
              </Grid>
            ) : (
            <React.Fragment>
              {
                healthProfessionals.isLoading ? <CircularProgress /> : healthProfessionals.isSuccess && 
                  <React.Fragment>
                    <Grid item xs={12}>
                      <Typography variant="h2" component="h2">{healthProfessionals.data.length} resultados para {state.professionalFilter.label}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ListProfessional data={healthProfessionals.data}/>
                    </Grid>
                  </React.Fragment>
                  
              }
            </React.Fragment>
            )
          }
      </React.Fragment>
      }
    </Grid>
  )
}

export default StepOne;