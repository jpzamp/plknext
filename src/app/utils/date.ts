import { format, getDay, isAfter, isBefore, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export enum DaysOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export type OpenHours = {
  day: DaysOfWeek
  opensAt: string // "08:00"
  closesAt: string // "22:00"
}

const parseTime = (time: string) => parse(time, 'HH:mm:ss', new Date())

export const isRestaurantOpen = (schedule: OpenHours[]): boolean => {
  const currentDay = getDay(new Date()) as DaysOfWeek
  const currentTime = new Date() // Current date & time

  const todaySchedule = schedule.find((item) => item.day === currentDay)

  if (!todaySchedule) {
    return false
  }

  const { opensAt, closesAt } = todaySchedule
  const opensAtTime = parseTime(opensAt) // Opening time as Date object
  const closesAtTime = parseTime(closesAt) // Closing time as Date object

  const isOpen =
    isAfter(currentTime, opensAtTime) && isBefore(currentTime, closesAtTime)

  return isOpen
}

export const getCurrentDayClosingTime = (schedule: OpenHours[]) => {
  const currentDay = new Date().getDay() as DaysOfWeek

  const todaySchedule = schedule.find((item) => item.day === currentDay)

  if (todaySchedule) {
    return todaySchedule.closesAt
  }

  return null
}

export const getDayNameInPortuguese = (day: DaysOfWeek) => {
  const date = new Date()
  date.setDate(date.getDate() + (day - date.getDay()))

  const dayName = format(date, 'EEEE', { locale: ptBR })
  return dayName.charAt(0).toUpperCase() + dayName.slice(1)
}

export const getCurrentDayName = () => {
  const currentDayName = format(new Date(), 'EEEE', { locale: ptBR })

  return currentDayName.charAt(0).toUpperCase() + currentDayName.slice(1)
}
