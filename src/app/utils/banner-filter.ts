import { CMSBanner } from '@/app/data/types/banner'

const currentDate = new Date()

export function filterBannerByCurrentDate(banner: CMSBanner) {
  const daysOfWeek = [
    'segunda',
    'terca',
    'quarta',
    'quinta',
    'sexta',
    'sabado',
    'domingo',
  ] as const

  const currentDayOfWeek = currentDate.getDay()
  const currentDay = daysOfWeek[currentDayOfWeek - 1]

  const valid = banner[`${currentDay}`]

  return valid
}
