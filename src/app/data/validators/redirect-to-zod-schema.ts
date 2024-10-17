import { z } from 'zod'

const pathPattern = /^\/([a-zA-Z0-9-_]+\/)*[a-zA-Z0-9-_]*$/

export const RedirectToValidatorSchema = z.object({
  redirectTo: z
    .string()
    .nullable()
    .optional()
    .refine((val) => {
      if (val === null || val === undefined) return true
      return pathPattern.test(val)
    }),
})
