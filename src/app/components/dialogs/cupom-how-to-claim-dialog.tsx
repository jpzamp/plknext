'use client'

import { useState } from 'react'
import Image from 'next/image'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

import Button from '../global/button'
import { X } from 'lucide-react'

import tutorialTotem from '@/public/images/popeyes-tutorial-totem.png'

export default function CouponHowToClaimDialogButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        className="text-lg text-highlight-500 underline mt-2"
        onClick={() => setIsOpen(true)}
      >
        Como utilizar o código?
      </Button>
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
              Para resgatar use o código no caixa ou totem
            </DialogTitle>
            <div className="pt-5 text-center max-w-xl mx-auto">
              <h5 className="text-helper-500 font-bold text-lg">Caixa</h5>
              <p className="text-tertiary-600">
                Em uma loja Popeyes, vá até o caixa e informe o código para o
                atendente.
              </p>
              <h5 className="text-helper-500 font-bold text-lg mt-4">Totem</h5>
              <p className="text-tertiary-600">
                No totem, selecione a opção “Cupom”{' '}
                <span className="text-secondary-500">(imagem 1)</span>, digite o
                código
                <span className="text-secondary-500">(imagem 2)</span> e conclua
                seu pedido.
              </p>
              <Image
                src={tutorialTotem}
                height={280}
                alt="Imagem Tutorial Totem PLK"
                className="mx-auto mt-5"
              />
              <Button
                variant="ghost"
                className="text-lg text-highlight-500 underline mt-2 mx-auto"
                onClick={() => setIsOpen(false)}
              >
                Ok, entendi
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
