import { PlkCupom } from '@/app/data/types/cupom'

import { parseISO, isBefore, isAfter } from 'date-fns'

const currentDate = new Date()

export function filterCupomByCurrentDate(cupom: PlkCupom) {
  const daysOfWeek = [
    'domingo',
    'segunda',
    'terca',
    'quarta',
    'quinta',
    'sexta',
    'sabado',
  ] as const

  const currentDayOfWeek = currentDate.getDay()
  const currentDay = daysOfWeek[currentDayOfWeek]

  const valid = cupom[`${currentDay}`]

  if (valid === undefined) return true

  return valid
}

export function filterCupomByStartAndEndDate(cupom: PlkCupom) {
  const startDate = cupom.start_cupom
  const endDate = cupom.end_cupom

  if (startDate != null && endDate != null) {
    const startFnsDate = parseISO(startDate)
    const endFnsDate = parseISO(endDate)

    return (
      isAfter(currentDate, startFnsDate) && isBefore(currentDate, endFnsDate)
    )
  }

  if (startDate != null) {
    const startFnsDate = parseISO(startDate)

    return isAfter(currentDate, startFnsDate)
  }

  if (endDate != null) {
    const endFnsDate = parseISO(endDate)

    return isBefore(currentDate, endFnsDate)
  }

  return startDate == null && endDate == null
}
