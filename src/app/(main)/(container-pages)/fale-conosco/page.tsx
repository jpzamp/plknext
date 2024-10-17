'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Textarea } from '@headlessui/react'
import { useForm } from 'react-hook-form'

import BackArrow from '@/components/global/back-arrow'
import Button from '@/components/global/button'
import Input from '@/components/global/input'
import ContactWithUsSuccessDialog from '@/components/dialogs/contact-with-us-success-dialog'

import { NameValidatorSchema } from '@/app/data/validators/name-zod-schema'
import { EmailValidatorSchema } from '@/app/data/validators/email-zod-schema'

import { api } from '@/app/data/api'
import { useAuth } from '@/app/contexts/session-context'

import { useModalError } from '@/app/contexts/generic-error-context'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

const ContactFormSchema = NameValidatorSchema.and(EmailValidatorSchema).and(
  z.object({
    message: z
      .string()
      .min(10, 'Escreva uma mensagem com pelo menos 10 caracteres.'),
  }),
)

type ContactFormData = z.infer<typeof ContactFormSchema>

export default function ContactUsPage() {
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false)

  const { user } = useAuth()

  const { setModalErrorOpen } = useModalError()

  const { sendButtonClickEvent } = useTagManager()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    mode: 'onChange',
  })

  async function handleContact({ name, email, message }: ContactFormData) {
    sendButtonClickEvent(ButtonEvents.CALL_TO_US)

    const parsedData = {
      bodyhtml: `<text><b>CLIENTE: </b>${name}<br><b>EMAIL DO CLIENTE: </b>${email}</text><br><br><b>MENSAGEM:</b> ${message}`,
      name,
      subject: 'Preciso de ajuda',
      toemail: 'lgpd.bk@burgerking.com.br',
    }

    const result = await api(
      '/authentication/v0.1/sendmail',
      { method: 'POST', body: JSON.stringify(parsedData) },
      'API',
    )

    if (result.ok) {
      setSuccessModalVisible(true)
      return
    }

    setModalErrorOpen(true)
  }

  useEffect(() => {
    setValue('name', user ? `${user?.name} ${user?.lastName}` : '')
    setValue('email', user?.email || '')
  }, [user, setValue])

  return (
    <>
      <div className="pt-12 mx-8 md:mx-20 pb-12">
        <BackArrow />
        <form onSubmit={handleSubmit(handleContact)}>
          <h2 className="text-tertiary-800 text-3xl font-bold mt-8">
            Preciso de ajuda
          </h2>
          <p className="mt-6">
            Entraremos em contato com você em até 1 dia útil.
            <br />
            <br /> Informe seus dados de contato
          </p>
          <Input
            className="w-full mt-6"
            placeholder="Nome"
            errorMessage={errors.name ? errors.name.message : ''}
            disabled={user !== null}
            {...register('name')}
          />
          <Input
            className="w-full"
            placeholder="E-mail"
            errorMessage={errors.email ? errors.email.message : ''}
            {...register('email')}
          />
          <label className="block text-xl font-bold text-tertiary-800 mb-2">
            Escreva sua solicitação
          </label>
          <Textarea
            placeholder="Digite aqui o que deseja"
            className="w-full outline-none resize-none p-4 min-h-52 border border-tertiary-400 rounded-lg focus:bg-primary-100 focus:border-primary-500 transition-all duration-300"
            {...register('message')}
          />
          {errors.message && (
            <p
              id="error-message"
              className="absolute text-xs text-error-500 mt-1"
            >
              {errors.message.message}
            </p>
          )}

          <div className="w-full flex items-center justify-center mt-12">
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting || !isDirty || !isValid}
              className="px-28 mx-auto rounded-full"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
      <ContactWithUsSuccessDialog
        contactEmail={getValues('email')}
        isOpen={isSuccessModalVisible}
        setIsOpen={setSuccessModalVisible}
      />
    </>
  )
}
