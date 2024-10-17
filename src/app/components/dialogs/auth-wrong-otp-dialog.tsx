'use client'

import { Dispatch, SetStateAction } from 'react'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

import { X } from 'lucide-react'
import Button from '../global/button'
import { formatTime } from '@/utils/time'

interface WrongOtpDialog {
  email?: string
  isOpen?: boolean
  isLoadingVerifyCode?: boolean
  otpTimeLeft: number
  handleResendOtpCode: () => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function WrongOtpDialog({
  isOpen,
  otpTimeLeft,
  isLoadingVerifyCode,
  handleResendOtpCode,
  setIsOpen,
}: WrongOtpDialog) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="relative inset-0 z-[999999] flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-neutral-900 opacity-20" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-4xl md:min-w-[856px] space-y-2 bg-white p-7 rounded-2xl">
          <div className="flex items-end justify-end">
            <X
              color="#F25600"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <DialogTitle className="font-bold text-xl md:text-3xl text-center">
            Código de verificação inválido
          </DialogTitle>
          <div className="pt-5 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
            <p className="text-tertiary-600 mb-7">
              Pode ter sido um erro de digitação. Confira o número e digite
              novamente.
              <br />
              <br />
              Você pode solicitar um novo código após 2 minutos.
            </p>
            <Button
              variant="primary"
              className="rounded-full px-11"
              onClick={() => setIsOpen(false)}
            >
              Digitar novamente
            </Button>
            <Button
              variant="ghost"
              disabled={otpTimeLeft > 0 || isLoadingVerifyCode}
              className="text-lg text-highlight-500 underline mt-3 mx-auto"
              onClick={() => {
                handleResendOtpCode()
                setIsOpen(false)
              }}
            >
              Receber novo código
            </Button>
            <span className="block text-primary-500 mt-6">
              {formatTime(otpTimeLeft)}
            </span>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
