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

interface WrongOtpDialog {
  isOpen?: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function GenericErrorDialog({
  isOpen,
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
        <DialogPanel className="max-w-2xl md:min-w-[638px] space-y-2 bg-white p-7 rounded-2xl">
          <div className="flex items-end justify-end">
            <X
              color="#F25600"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <DialogTitle className="font-bold text-xl md:text-3xl text-center">
            Ocorreu um erro ao processar
          </DialogTitle>
          <div className="pt-5 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
            <p className="text-tertiary-600">
              Ops! Parece que a Poppy não conseguiu processar muito bem essas
              informações, tente novamente.
            </p>
            <div className="max-w-[283px]">
              <Button
                className="rounded-full px-14 mt-8 w-full"
                onClick={() => setIsOpen(false)}
              >
                Tentar novamente
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
