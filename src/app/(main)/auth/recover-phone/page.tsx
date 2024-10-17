'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CpfValidatorSchema } from '@/app/data/validators/cpf-zod-schema'

import Input from '@/components/global/input'
import Button from '@/components/global/button'

import { maskCpf } from '@/utils/cpf'
import { api } from '@/app/data/api'
import { RedirectToValidatorSchema } from '@/app/data/validators/redirect-to-zod-schema'

type CpfAuthFormData = z.infer<typeof CpfValidatorSchema>

export async function recoverPhone(cpf: string): Promise<Response> {
  const result = await api(
    '/customer/v0.1/cpfemail/accountrecovery',
    { method: 'POST', body: JSON.stringify({ cpf }) },
    'API',
  )

  return result
}

export default function RecoverPhonePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<CpfAuthFormData>({
    resolver: zodResolver(CpfValidatorSchema),
    mode: 'onChange',
  })

  const [customErrorCpf, setCustomErrorCpf] = useState<string | undefined>(
    undefined,
  )

  const searchParams = useSearchParams()

  const router = useRouter()

  async function handleCpfVerify({ cpf }: CpfAuthFormData) {
    const parsedCpf = cpf.replaceAll('.', '').replaceAll('-', '')

    const recoverPhoneResponse = await recoverPhone(parsedCpf)

    const recoverPhoneResponseData = await recoverPhoneResponse.json()

    if (!recoverPhoneResponse.ok) {
      setCustomErrorCpf(recoverPhoneResponseData.msg)
      return
    }

    localStorage.setItem(
      '@Popeyes:emailConfirmation',
      JSON.stringify({
        email: recoverPhoneResponseData.email,
        cpfRecover: parsedCpf,
        startedAt: new Date().toISOString(),
      }),
    )

    const redirectTo = searchParams.get('redirectTo')

    if (redirectTo) {
      const result = RedirectToValidatorSchema.safeParse({ redirectTo })

      if (result.success) {
        router.push(`/auth/verify/otp?recover=true&redirectTo=${redirectTo}`)
        return
      }
    }

    router.push('/auth/verify/otp?recover=true')
  }

  return (
    <>
      <h1 className="font-bold text-3xl mt-14 text-center">Informe seu CPF</h1>
      <p className="text-center mt-4">
        Informe seu CPF para validar sua conta.
        <br />
        Enviaremos um código de verificação para o e-mail <br /> cadastrado.
      </p>
      <form
        className="flex flex-col items-center mt-8"
        onSubmit={handleSubmit(handleCpfVerify)}
      >
        <div className="flex gap-4">
          <Input
            placeholder="CPF"
            errorMessage={
              errors.cpf ? errors.cpf.message : customErrorCpf || ''
            }
            className="min-w-80"
            {...register('cpf', {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target
                event.target.value = maskCpf(value)
              },
              onBlur: () => {
                if (customErrorCpf) setCustomErrorCpf(undefined)
              },
            })}
          />
        </div>
        <div className="max-w-64 text-center mt-8">
          <p className="text-xs mb-6">
            Este é um ambiente seguro e todas as suas informações estão
            protegidas
          </p>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || !isDirty || !isValid}
            className="rounded-full w-full mb-6"
          >
            Continuar
          </Button>
          <Button variant="ghost" redirectTo="/fale-conosco">
            Preciso de ajuda
          </Button>
        </div>
      </form>
    </>
  )
}
