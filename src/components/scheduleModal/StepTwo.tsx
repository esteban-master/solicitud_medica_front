import { Fragment } from "react";
import {  Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useShedule } from "../../state/context/SheduleContext";
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import set from 'date-fns/set'
import add from 'date-fns/add'
import isBefore from 'date-fns/isBefore'
import { useHoursOfMedicalCareUsed } from "../../api/medicalCare";

type Dates = { label: string, hour: number, minutes: number }

const ListDates = ({ dates, handleClickDate, dayIndex, hoursOfMedicalCareUsed }: { dayIndex: number ,dates: Dates[], handleClickDate: (date: Date) => void, hoursOfMedicalCareUsed: string[] }) => {
  
  return <Stack spacing={1}>
    {
      dates.map(date => {
        const setDate = set(new Date(), {
          hours: date.hour,
          minutes: date.minutes,
          seconds: 0
        });
        const dateIsBefore = isBefore(add(setDate, { days: dayIndex }), new Date());
        const dateFns = add(setDate, { days: dayIndex });
        const formatDate = format(dateFns, "dd-MMMM-yyyy HH:mm", { locale: esLocale });
        const hourUsed = hoursOfMedicalCareUsed.includes(formatDate)
        return (
          <Button
            key={date.label} 
            style={{
              backgroundColor: '#E5F1FF',
              color: '#004E9C',
              fontWeight: 'bold'
            }} 
            disabled={dateIsBefore || hourUsed}
            variant="text"
            onClick={() =>{
              handleClickDate(dateFns)
            }}
          >
            <Typography style={{ textDecoration: dateIsBefore || hourUsed ? 'none' : 'underline' }}>{dateIsBefore || hourUsed ? '-' : date.label}</Typography>
          </Button>
        )
      })
    }
  </Stack>
}

const dates = [
  {label: '10:00', hour: 10, minutes: 0 },
  {label: '11:30', hour: 11, minutes: 30},
  {label: '13:00', hour: 13, minutes: 0 },
  {label: '16:00', hour: 16, minutes: 0 },
  {label: '17:30', hour: 17, minutes: 30},
]

const datesDay = [dates, dates, dates, dates, dates]

export const StepTwo = () => {

  const { state ,changeState } = useShedule()
  const { data, isLoading, isSuccess } = useHoursOfMedicalCareUsed({
    "id": state.professional.id,
    "startDate": new Date(),
    "endDate": add(new Date(), { days: 3})
  })
  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Fragment>
      <Grid container marginY={2}>
        {
          datesDay.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Stack direction="column" alignItems="center">
                <Stack>
                  <Typography variant="body1" component="p" style={{ fontWeight: 'bold'}}>
                    { format(add(new Date(), { days: index }), "EEEE", { locale: esLocale }) }
                  </Typography>
                  <Typography variant="body2" component="p">
                    { format(add(new Date(), { days: index }), "dd 'de' MMMM", { locale: esLocale }) }
                  </Typography>
                </Stack>
                <ListDates 
                  hoursOfMedicalCareUsed={isSuccess ? data.map(item => format(new Date(item.date), 'dd-MMMM-yyyy HH:mm', { locale: esLocale })) : []} 
                  dayIndex={index} 
                  dates={item} 
                  handleClickDate={date => changeState({ date, activeStep: 2 })} />
              </Stack>
            </Grid>
          ))
        }    
      </Grid>
  </Fragment> 
)}