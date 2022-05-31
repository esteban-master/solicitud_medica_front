import { Fragment } from "react";
import {  Button, Grid, Stack, Typography } from "@mui/material";
import { useShedule } from "../../state/context/SheduleContext";
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import set from 'date-fns/set'
import add from 'date-fns/add'
import isBefore from 'date-fns/isBefore'

type Dates = { label: string, hour: number, minutes: number }

const ListDates = ({ dates, handleClickDate, dayIndex }: { dayIndex: number ,dates: Dates[], handleClickDate: (date: Date) => void}) => {

  return <Stack spacing={1}>
    {
      dates.map(date => {
        const dateIsBefore = isBefore(add(set(new Date(), {
          hours: date.hour,
          minutes: date.minutes,
          seconds: 0
        }), { days: dayIndex }), new Date());
        return (
          <Button
            key={date.label} 
            style={{
              backgroundColor: '#E5F1FF',
              color: '#004E9C',
              fontWeight: 'bold'
            }} 
            disabled={dateIsBefore}
            variant="text"
            onClick={() =>{
              const dateFns = set(new Date(), {
                hours: date.hour,
                minutes: date.minutes,
                seconds: 0
              })

              handleClickDate(add(dateFns, { days: dayIndex }))
            }}
          >
            <Typography style={{ textDecoration: dateIsBefore ? 'none' : 'underline' }}>{dateIsBefore ? '-' : date.label}</Typography>
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
  const { changeState } = useShedule()
  return (
    <Fragment>
      <Grid container marginY={2}>
        {
          datesDay.map((item, index) => (
            <Grid item xs={6}>
              <Stack direction="column" alignItems="center">
                <Stack>
                  <Typography variant="body1" component="p" style={{ fontWeight: 'bold'}}>
                    { format(add(new Date(), { days: index }), "EEEE", { locale: esLocale }) }
                  </Typography>
                  <Typography variant="body2" component="p">
                    { format(add(new Date(), { days: index }), "dd 'de' MMMM", { locale: esLocale }) }
                  </Typography>
                </Stack>
                <ListDates dayIndex={index} dates={item} handleClickDate={date => changeState({ date, activeStep: 2 })} />
              </Stack>
            </Grid>
          ))
        }    
      </Grid>
  </Fragment> 
)}