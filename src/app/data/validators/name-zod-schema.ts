import { z } from 'zod'

export const NameValidatorSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'O nome deve conter apenas letras e espaços'),
})

export const LastNameValidatorSchema = z.object({
  lastName: z
    .string()
    .min(2, 'O sobrenome deve ter pelo menos 2 caracteres')
    .max(50, 'O sobrenome deve ter no máximo 50 caracteres')
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      'O sobrenome deve conter apenas letras e espaços',
    ),
})

export const FullNameValidatorSchema = z.intersection(
  NameValidatorSchema,
  LastNameValidatorSchema,
)
