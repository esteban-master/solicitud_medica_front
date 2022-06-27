import esLocale from 'date-fns/locale/es'
import formatDateFns from 'date-fns/format'

export const formatDate = (date: string, format: string): string => {
  return formatDateFns(new Date(date), format, { locale: esLocale })
}
