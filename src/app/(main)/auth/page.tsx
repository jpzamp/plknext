'use client'

import Image from 'next/image'
import onBoardingImage from '@/public/images/img-onboarding-popeyes.svg'
import Button from '@/components/global/button'

import { useSearchParams } from 'next/navigation'

import GoogleAuthButton from '@/components/global/google-auth-button'

import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

export default function AuthProviderSelectPage() {
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo')

  const { sendButtonClickEvent } = useTagManager()

  return (
    <>
      <Image
        src={onBoardingImage}
        width={304}
        height={244}
        alt="Imagem Onboarding Popeyes"
      />
      <h1 className="font-bold text-3xl max-w-96 text-center">
        Ofertas para você ou para aproveitar com a família
      </h1>
      <div className="max-w-[283px]">
        <Button
          className="rounded-full px-14 mt-8 w-full"
          redirectTo={
            `/auth/phone` +
            (redirectTo !== null ? `?redirectTo=${redirectTo}` : '')
          }
          onBeforeRedirect={() =>
            sendButtonClickEvent(ButtonEvents.LOGIN_ACTION_PHONE)
          }
        >
          Entrar com celular
        </Button>
        <GoogleAuthButton />
      </div>
    </>
  )
}
