import { z } from 'zod'

import validator from 'validator'

export const PhoneValidatorSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{8,9}$/, {
      message: 'O número de celular deve ter entre 8 e 9 dígitos',
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'O número de celular digitado é inválido',
    }),
})

export const DDDValidatorSchema = z.object({
  ddd: z
    .string()
    .min(2, { message: 'DDD inválido' })
    .transform((val) => Number(val))
    .refine((val) => val >= 11 && val <= 99, {
      message: 'DDD inválido',
    })
    .refine((val) => !isNaN(val), { message: 'DDD inválido' }),
})

export const FullPhoneSingleFieldValidatorSchema = z.object({
  phone: z.string().refine((val) => validator.isMobilePhone(val)),
})

export const FullPhoneValidatorSchema = z
  .intersection(DDDValidatorSchema, PhoneValidatorSchema)
  .refine((val) => validator.isMobilePhone(`${val.ddd}${val.phone}`))
