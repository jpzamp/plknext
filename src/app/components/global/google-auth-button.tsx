'use client'

import { CredentialResponse, GoogleLogin } from '@react-oauth/google'

import { useModalError } from '@/app/contexts/generic-error-context'

interface GoogleAuthButtonProps {
  redirectTo?: string
}

export default function GoogleAuthButton({
  redirectTo = undefined,
}: GoogleAuthButtonProps) {
  const { setModalErrorOpen } = useModalError()

  const disabled = true

  function handleGoogleAuthCallback(credentialResponse: CredentialResponse) {
    setModalErrorOpen(true) // GOOGLE AUTHENTICATION NOT IMPLEMENTED YET, WAITING FOR CUSTOMER TEAM
  }

  function handleGoogleAuthError() {
    console.error('Error Google Auth')
  }

  return (
    <>
      {!disabled && (
        <GoogleLogin
          onSuccess={handleGoogleAuthCallback}
          locale="pt-BR"
          containerProps={{
            style: {
              padding: '0px',
              width: '100%',
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
          onError={handleGoogleAuthError}
          useOneTap
        />
      )}
    </>
  )
}
