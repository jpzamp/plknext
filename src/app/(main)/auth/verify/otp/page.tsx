'use client'

import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'

import { useRouter, useSearchParams } from 'next/navigation'

import { differenceInSeconds, parseISO } from 'date-fns'

import Input from '@/components/global/input'
import Button from '@/components/global/button'
import WrongOtpDialog from '@/components/dialogs/auth-wrong-otp-dialog'

import { useAuth } from '@/app/contexts/session-context'
import {
  ButtonEvents,
  ExtraEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

import { api } from '@/app/data/api'
import { PlkUserModelApi } from '@/app/data/types/user'

import { formatTime } from '@/utils/time'
import { formatPhone } from '@/utils/phone'
import { RedirectToValidatorSchema } from '@/app/data/validators/redirect-to-zod-schema'

interface VerifyOtpStateSchema {
  phone?: string
  email?: string
  cpfRecover?: string
  startedAt?: string
}

export default function VerifyOtpPage() {
  const [otpInfo, setOtpInfo] = useState<VerifyOtpStateSchema>({})
  const [timeLeft, setTimeLeft] = useState<number>(120) // 2 minutos em segundos

  const [isLoadingResendCode, setResendCodeLoading] = useState(false)
  const [isLoadingVerifyCode, setVerifyCodeLoading] = useState(false)
  const [isInvalidOtpModalOpen, setIsInvalidOtpModalOpen] = useState(false)

  const { sendExtraEvents, sendButtonClickEvent } = useTagManager()

  const [otp, setOtp] = useState('')

  const router = useRouter()

  const searchParams = useSearchParams()

  const isRecoverAccount = searchParams.get('recover') !== null

  const { login, fetchUserInfo } = useAuth()

  useEffect(() => {
    const savedData = localStorage.getItem(
      isRecoverAccount
        ? '@Popeyes:emailConfirmation'
        : '@Popeyes:phoneConfirmation',
    )

    if (!savedData) {
      router.push('/auth')
      return
    }

    const { phone, email, cpfRecover, startedAt } = JSON.parse(savedData)

    setOtpInfo({
      phone,
      email,
      cpfRecover,
      startedAt,
    })

    const startedAtDate = parseISO(startedAt)
    const now = new Date()
    const elapsedTime = differenceInSeconds(now, startedAtDate)
    const remainingTime = Math.max(120 - elapsedTime, 0)
    setTimeLeft(remainingTime)

    const timer = createCountDown()

    return () => clearInterval(timer)
  }, [router, isRecoverAccount])

  function createCountDown() {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return timer
  }

  async function handleResendOtpCode() {
    if (timeLeft > 0) return

    setResendCodeLoading(true)

    const response = await api(
      isRecoverAccount
        ? '/customer/v0.1/cpfemail/accountrecovery'
        : '/authentication/v0.1/contactnumbersms/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_number: otpInfo.phone,
          cpf: isRecoverAccount ? otpInfo.cpfRecover : undefined,
        }),
      },
      'API',
    )

    if (response.ok) {
      setTimeLeft(120) // Reset the countdown
      createCountDown()
      setResendCodeLoading(false)
    }
  }

  async function handleVerifyOtp() {
    setVerifyCodeLoading(true)

    sendButtonClickEvent(ButtonEvents.FINISH_LOGIN_ACTION_SMS)

    const response = await api(
      isRecoverAccount
        ? '/customer/v0.1/cpfpin/accountrecovery'
        : '/authentication/v0.1/contactnumber/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PIN: otp,
          cpf: isRecoverAccount ? otpInfo.cpfRecover : undefined,
          contact_number: otpInfo.phone,
        }),
      },
      'API',
    )

    if (response.ok) {
      localStorage.removeItem('@Popeyes:emailConfirmation')

      if (isRecoverAccount) {
        localStorage.setItem(
          '@Popeyes:recoverInfo',
          JSON.stringify({
            cpf: otpInfo.cpfRecover,
          }),
        )

        router.push('/auth/recover-phone/reset')
        return
      }

      /* eslint-disable camelcase */
      const { access_token, customer_id } = await response.json()

      const userProfileResponse = await fetchUserInfo(access_token, customer_id)

      if (!userProfileResponse.ok) return

      const userData: PlkUserModelApi = await userProfileResponse.json()

      login(access_token, {
        name: userData.customer_name,
        lastName: userData.customer_lastname,
        birthday: userData.customer_birthday,
        cpf: userData.customer_cpf,
        customerId: customer_id,
        email: userData.customer_email,
        gender: userData.customer_gender,
        phone: userData.customer_contact,
        sms_confirmed: true,
      })

      localStorage.removeItem('@Popeyes:phoneConfirmation')

      const redirectTo = searchParams.get('redirectTo')

      if (redirectTo) {
        const result = RedirectToValidatorSchema.safeParse({ redirectTo })

        if (result.success) {
          router.replace(redirectTo)
          return
        }
      }

      const registration = searchParams.get('register')

      if (registration) sendExtraEvents(ExtraEvents.SUCCESS_REGISTRED)
      else sendExtraEvents(ExtraEvents.SUCCESS_LOGIN)

      router.push('/')

      setVerifyCodeLoading(false)

      return
    }

    setVerifyCodeLoading(false)

    setIsInvalidOtpModalOpen(true)
  }

  return (
    <>
      <h1 className="font-bold text-3xl mt-14 text-center">
        Insira o código de verificação
      </h1>
      <div className="text-center">
        <p className="mt-4 text-base">
          {isRecoverAccount
            ? 'Insira o código recebido no e-mail'
            : 'Enviamos o código por SMS para o número'}
          <br />{' '}
          <b>
            {!isRecoverAccount
              ? otpInfo.phone && formatPhone(otpInfo.phone)
              : otpInfo.email}
            .
          </b>
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          containerStyle={{
            gap: '16px',
            justifyContent: 'center',
            marginTop: '32px',
          }}
          renderInput={(props) => (
            <Input {...props} className="border-2 min-w-[48px]" />
          )}
        />
        <p className="text-xs max-w-64 mx-auto mt-10">
          Este é um ambiente seguro e todas as suas informações estão protegidas
        </p>
        <Button
          className="w-full rounded-full mt-6"
          disabled={
            otp.length !== 4 || isLoadingResendCode || isLoadingVerifyCode
          }
          loading={isLoadingVerifyCode}
          onClick={handleVerifyOtp}
        >
          Continuar
        </Button>
        <Button
          variant="ghost"
          disabled={timeLeft > 0 || isLoadingVerifyCode}
          className="my-6 bg-none mx-auto"
          onClick={handleResendOtpCode}
          loading={isLoadingResendCode}
        >
          Receber novo código
        </Button>
        <span className="block text-primary-500">{formatTime(timeLeft)}</span>
      </div>
      <WrongOtpDialog
        isOpen={isInvalidOtpModalOpen}
        isLoadingVerifyCode={isLoadingVerifyCode}
        otpTimeLeft={timeLeft}
        setIsOpen={setIsInvalidOtpModalOpen}
        handleResendOtpCode={handleResendOtpCode}
      />
    </>
  )
}
