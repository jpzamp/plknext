import { z } from 'zod'

export const EmailValidatorSchema = z.object({
  email: z.string().email({
    message: 'Forneça um endereço de e-mail válido.',
  }),
})

export const ConfirmEmailValidatorSchema = z.object({
  confirmEmail: z.string().email({
    message: 'Forneça um endereço de e-mail válido.',
  }),
})
