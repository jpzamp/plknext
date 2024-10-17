'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/components/global/input'
import Button from '@/components/global/button'

import { FullPhoneValidatorSchema } from '@/app/data/validators/phone-zod-schema'
import { api } from '@/app/data/api'
import { RedirectToValidatorSchema } from '@/app/data/validators/redirect-to-zod-schema'
import { useModalError } from '@/app/contexts/generic-error-context'

type PhoneAuthFormData = z.infer<typeof FullPhoneValidatorSchema>

export default function ResetPhonePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<PhoneAuthFormData>({
    resolver: zodResolver(FullPhoneValidatorSchema),
    mode: 'onChange',
  })

  const { setModalErrorOpen } = useModalError()

  const [cpf, setCpf] = useState<string>('')

  const searchParams = useSearchParams()

  const router = useRouter()

  async function handlePhoneVerify({ ddd, phone }: PhoneAuthFormData) {
    const fullPhone = `${ddd}${phone}`

    const response = await api(
      '/customer/v0.1/cpfcontactnumber/accountrecovery',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf,
          contact_number: fullPhone,
        }),
      },
      'API',
    )

    if (response.ok) {
      localStorage.removeItem('@Popeyes:recoverInfo')
      localStorage.setItem(
        '@Popeyes:phoneConfirmation',
        JSON.stringify({
          phone: fullPhone,
          startedAt: new Date().toISOString(),
        }),
      )

      const redirectTo = searchParams.get('redirectTo')

      if (redirectTo) {
        const result = RedirectToValidatorSchema.safeParse({ redirectTo })

        if (result.success) {
          router.push(`/auth/verify/otp?redirectTo=${redirectTo}`)
          return
        }
      }

      router.push('/auth/verify/otp')
      return
    }

    setModalErrorOpen(true)
  }

  useEffect(() => {
    const savedData = localStorage.getItem('@Popeyes:recoverInfo')

    if (!savedData) {
      router.push('/auth')
      return
    }

    const { cpf } = JSON.parse(savedData)
    setCpf(cpf)
  }, [router])

  return (
    <>
      <h1 className="font-bold text-3xl mt-14 text-center">
        Redefina o número do seu celular
      </h1>
      <p className="text-center mt-4">
        Informe o número que será atualizado no cadastro.
      </p>
      <form
        className="flex flex-col items-center mt-8"
        onSubmit={handleSubmit(handlePhoneVerify)}
      >
        <div className="flex gap-4">
          <Input
            placeholder="DDD"
            errorMessage={errors.ddd ? errors.ddd.message : ''}
            className="max-w-[72px]"
            maxLength={2}
            {...register('ddd')}
          />
          <Input
            placeholder="Seu novo número"
            errorMessage={errors.phone ? errors.phone.message : ''}
            className="md:min-w-72"
            maxLength={9}
            {...register('phone')}
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
            Ajuda para acessar
          </Button>
        </div>
      </form>
    </>
  )
}
