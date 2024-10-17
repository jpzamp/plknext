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

interface ContactWithUsDialogProps {
  isOpen?: boolean
  contactEmail: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ContactWithUsSuccessDialog({
  isOpen,
  contactEmail,
  setIsOpen,
}: ContactWithUsDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="relative inset-0 z-[999999] flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-neutral-900 opacity-20" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-2xl md:min-w-[638px] space-y-2 bg-white p-7 rounded-2xl">
          <div className="flex items-end justify-end">
            <X
              color="#F25600"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <DialogTitle className="font-bold text-xl md:text-3xl text-center">
            Mensagem enviada!
          </DialogTitle>
          <div className="pt-5 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
            <p className="text-tertiary-600">
              Sua mensagem foi enviada com sucesso para nosso time! Entraremos
              em contato com você a partir do seu email <b>{contactEmail}</b> em
              até 1 dia útil.
            </p>
            <div className="max-w-[283px]">
              <Button
                className="rounded-full px-14 mt-8 w-full"
                onClick={() => setIsOpen(false)}
              >
                Ok! entendi
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
