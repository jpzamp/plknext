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
import GoogleAuthButton from '../global/google-auth-button'

interface NeedAuthFavoriteRestaurantDialogProps {
  isOpen?: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function NeedAuthFavoriteRestaurantDialog({
  isOpen,
  setIsOpen,
}: NeedAuthFavoriteRestaurantDialogProps) {
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
            Faça o login para gerenciar seus favoritos
          </DialogTitle>
          <div className="pt-5 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
            <p className="text-tertiary-600">
              Para acessar sua página de restaurantes favoritos ou favoritar um
              restaurante, você precisa entrar no app.
            </p>
            <div className="max-w-[283px]">
              <Button
                className="rounded-full px-14 mt-8 w-full"
                redirectTo={`/auth/phone?redirectTo=/restaurantes`}
              >
                Entrar com celular
              </Button>
              <GoogleAuthButton />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
