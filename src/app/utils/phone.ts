export function formatPhone(phone: number | string) {
  const phoneStr = phone.toString()

  const countryCode = phoneStr.slice(0, 2)
  const areaCode = phoneStr.slice(2, 4)
  const lastFourDigits = phoneStr.slice(-4)

  return `${countryCode} ${areaCode}****${lastFourDigits}`
}

export const maskPhone = (value: string) => {
  if (!value) return ''
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{5})(\d{4})/, '$1-$2')
  return value
}
