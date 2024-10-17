'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { useMutation } from '@apollo/client'
import { api, CREATE_USER_GQL_QUERY, UserCreateModel } from '@/app/data/api'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RedirectToValidatorSchema } from '@/app/data/validators/redirect-to-zod-schema'
import { FullNameValidatorSchema } from '@/app/data/validators/name-zod-schema'
import {
  ConfirmEmailValidatorSchema,
  EmailValidatorSchema,
} from '@/app/data/validators/email-zod-schema'
import { CpfValidatorSchema } from '@/app/data/validators/cpf-zod-schema'
import { FullPhoneSingleFieldValidatorSchema } from '@/app/data/validators/phone-zod-schema'

import Input from '@/components/global/input'
import Button from '@/components/global/button'

import { formatPhone } from '@/utils/phone'
import { maskCpf } from '@/utils/cpf'
import { useModalError } from '@/app/contexts/generic-error-context'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

const SearchParamsSchema = z.intersection(
  RedirectToValidatorSchema,
  FullPhoneSingleFieldValidatorSchema,
)

const RegisterFormSchema = FullNameValidatorSchema.and(EmailValidatorSchema)
  .and(ConfirmEmailValidatorSchema)
  .and(CpfValidatorSchema)
  .refine((data) => data.email === data.confirmEmail, {
    path: ['confirmEmail'],
    message: 'Os e-mails precisam ser iguais.',
  })

type RegisterFormData = z.infer<typeof RegisterFormSchema>

export async function fetchEmailExists(email: string): Promise<boolean> {
  const result = await api(
    '/customer/v0.1/email/validation',
    { method: 'POST', body: JSON.stringify({ email }) },
    'API',
  )

  if (result.ok) return true

  return false
}

export async function fetchCpfExists(cpf: string): Promise<boolean> {
  const result = await api(
    '/customer/v0.1/cpf/validation',
    { method: 'POST', body: JSON.stringify({ cpf }) },
    'API',
  )

  if (result.ok) return true

  return false
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onChange',
  })

  const [createUser] = useMutation(CREATE_USER_GQL_QUERY)

  const [customErrorEmail, setCustomErrorEmail] = useState<string | undefined>(
    undefined,
  )
  const [customErrorCpf, setCustomErrorCpf] = useState<string | undefined>(
    undefined,
  )

  const { setModalErrorOpen } = useModalError()

  const { sendButtonClickEvent } = useTagManager()

  const searchParams = useSearchParams()
  const router = useRouter()

  const redirectTo = searchParams.get('redirectTo')
  const phone = searchParams.get('phone')

  useEffect(() => {
    const result = SearchParamsSchema.safeParse({ redirectTo, phone })

    if (!result.success) {
      router.push('/')
    }
  }, [searchParams, router, redirectTo, phone])

  async function handleRegister(formData: RegisterFormData) {
    sendButtonClickEvent(ButtonEvents.REGISTER_CONTINUE)

    const { name, lastName, email, cpf } = formData

    const parsedCpf = cpf.replaceAll('-', '').replaceAll('.', '')

    const [emailExists, cpfExists] = await Promise.all([
      fetchEmailExists(email),
      fetchCpfExists(parsedCpf),
    ])

    if (emailExists) {
      setCustomErrorEmail(
        'O endereço de email digitado já foi utilizado por outra pessoa.',
      )
      return
    }

    if (cpfExists) {
      setCustomErrorCpf('O CPF digitado já foi utilizado por outra pessoa.')
      return
    }

    const UserModel = {
      name,
      lastname: lastName,
      email,
      cpf: parsedCpf,
      number: phone,
      user_id_facebook: '',
      receive_mail: true,
      receive_sms: true,
      term_accepted: true,
    } as UserCreateModel

    try {
      const result = await createUser({
        variables: UserModel,
      })

      if (!result.data || !result.data.saveCustomerPWA) {
        setModalErrorOpen(true)
        return
      }

      const { saveCustomerPWA } = result.data

      if (saveCustomerPWA.startsWith(`{customer_id=`)) {
        localStorage.setItem(
          '@Popeyes:phoneConfirmation',
          JSON.stringify({
            phone,
            startedAt: new Date().toISOString(),
          }),
        )

        const queryParams =
          redirectTo !== null
            ? `?redirectTo=${redirectTo}&register=true`
            : `?register=true`

        router.push(`/auth/verify/otp${queryParams}`)
      }
    } catch (error) {
      console.error(error)
      setModalErrorOpen(true)
    }
  }

  return (
    <>
      <h1 className="font-bold text-3xl mt-4 text-center">
        Confira e complete as suas informações
      </h1>
      <p className="text-xs mt-3">
        Essas informações garantem sua identificação e segurança de acesso.
      </p>
      <form
        className="w-full mt-4 flex flex-col gap-2"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Input
          placeholder="Seu telefone"
          value={`55 ${phone ? formatPhone(phone) : ''}.`}
          className=""
          disabled
        />
        <Input
          placeholder="Nome"
          errorMessage={errors.name ? errors.name.message : ''}
          className=""
          {...register('name')}
        />
        <Input
          placeholder="Sobrenome"
          errorMessage={errors.lastName ? errors.lastName.message : ''}
          className=""
          {...register('lastName')}
        />
        <Input
          placeholder="E-mail"
          errorMessage={
            errors.email ? errors.email.message : customErrorEmail || ''
          }
          className=""
          {...register('email', {
            onBlur: () => {
              if (customErrorEmail) setCustomErrorEmail(undefined)
            },
          })}
        />
        <Input
          placeholder="Confirme seu E-mail"
          errorMessage={
            errors.confirmEmail
              ? errors.confirmEmail.message
              : customErrorEmail || ''
          }
          className=""
          {...register('confirmEmail')}
        />
        <Input
          placeholder="CPF"
          errorMessage={errors.cpf ? errors.cpf.message : customErrorCpf || ''}
          className=""
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
        <div className="flex flex-col items-center text-center text-xs mt-6">
          <p>
            Ao continuar, você concorda com as{' '}
            <Link className="text-tertiary-800 font-bold" href="#">
              Diretrizes de Privacidade de Dados
            </Link>{' '}
            e{' '}
            <Link className="text-tertiary-800 font-bold" href="#">
              Termos de condições de Uso
            </Link>{' '}
            do aplicativo Popeyes Brasil.
          </p>
          <p className="mt-4">
            Você também concorda com o recebimento de ações promocionais via
            e-mail, sms e push. Na página Permissões e privacidade você pode
            gerenciar suas preferências.
          </p>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting || !isDirty || !isValid}
            className="rounded-full px-24 mt-4"
          >
            Continuar
          </Button>
          <Button variant="ghost" redirectTo="/auth" className="mt-4">
            Já tenho cadastro
          </Button>
          <p className="mt-4">
            Este é um ambiente seguro e todas as suas informações estão
            protegidas.
          </p>
        </div>
      </form>
    </>
  )
}
