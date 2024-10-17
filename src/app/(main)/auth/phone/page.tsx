'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/components/global/input'
import Button from '@/components/global/button'

import { api } from '@/app/data/api'
import { FullPhoneValidatorSchema } from '@/app/data/validators/phone-zod-schema'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

type PhoneAuthFormData = z.infer<typeof FullPhoneValidatorSchema>

export default function PhoneProviderPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<PhoneAuthFormData>({
    resolver: zodResolver(FullPhoneValidatorSchema),
    mode: 'onChange',
  })

  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo')

  const { sendButtonClickEvent } = useTagManager()

  const router = useRouter()

  async function handlePhoneVerify({ ddd, phone }: PhoneAuthFormData) {
    const fullPhone = `${ddd}${phone}`

    const response = await api(
      '/authentication/v0.1/contactnumbersms/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_number: fullPhone,
        }),
      },
      'API',
    )

    if (!response.ok) {
      const queryParams =
        redirectTo !== null
          ? `?redirectTo=${redirectTo}&phone=${fullPhone}`
          : `?phone=${fullPhone}`
      // Redirect the user to the register page with query params
      router.push(`/auth/register${queryParams}`)
      return
    }

    localStorage.setItem(
      '@Popeyes:phoneConfirmation',
      JSON.stringify({
        phone: fullPhone,
        startedAt: new Date().toISOString(),
      }),
    )

    sendButtonClickEvent(ButtonEvents.LOGIN_ACTION_PHONE_CONTINUAR)

    const queryParams = redirectTo !== null ? `?redirectTo=${redirectTo}` : ``

    router.push(`/auth/verify/otp${queryParams}`)
  }

  return (
    <>
      <h1 className="font-bold text-3xl mt-14 text-center">
        Informe o número do seu celular
      </h1>
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
            placeholder="Número"
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
          <Button
            variant="ghost"
            redirectTo="/auth/recover-phone"
            onBeforeRedirect={() =>
              sendButtonClickEvent(ButtonEvents.LOGIN_ACTION_TROUBLESHOOTING)
            }
          >
            Ajuda para acessar
          </Button>
        </div>
      </form>
    </>
  )
}
