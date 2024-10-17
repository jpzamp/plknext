export interface PlkUser {
  name: string
  lastName: string
  gender: string
  phone: string
  email: string
  birthday: string
  cpf: string
  customerId: string
  sms_confirmed: boolean
}

export interface PlkUserModelApi {
  customer_name: string
  customer_lastname: string
  customer_gender: string
  customer_contact: string
  customer_email: string
  customer_birthday: string
  customer_cpf: string
}
