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
import { PlkCupom } from '@/app/data/types/cupom'
import { X } from 'lucide-react'

import warningIcon from '@/public/icons/warning-icon.svg'
import formatBRL from '@/utils/format-price'
import CouponHowToClaimDialogButton from './cupom-how-to-claim-dialog'
import { useAuth } from '@/app/contexts/session-context'
import NeedAuthDialog from './cupom-need-auth-dialog'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

interface CouponClaimDialogButtonProps {
  coupon: PlkCupom
}

export default function CouponClaimDialogButton({
  coupon,
}: CouponClaimDialogButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNeedAuthModal, setNeedAuthModal] = useState(false)

  const { isAuthenticated } = useAuth()

  const { sendButtonClickEvent } = useTagManager()

  function handleClaimCupom() {
    sendButtonClickEvent(ButtonEvents.PEGAR_CUPOM, {
      cupomName: coupon.nome,
      isDayOffer: false,
      cupomCode: coupon.codigo,
      categoryOrder: coupon.ordem,
      cupomValue: coupon.valor_regular || coupon.valor_descontado,
    })
    if (!isAuthenticated) {
      setNeedAuthModal(true)
      return
    }
    setIsOpen(true)
  }

  return (
    <>
      <Button
        variant="primary"
        className="rounded-full w-full md:w-auto md:px-56 mt-6"
        onClick={handleClaimCupom}
      >
        Pegar cupom
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
            <DialogTitle className="font-bold text-3xl text-center">
              Detalhes do cupom
            </DialogTitle>
            <div className="pt-5">
              <div className="flex items-center justify-center gap-2 bg-warning-100 w-full py-3 text-center">
                <Image
                  src={warningIcon}
                  width={24}
                  height={24}
                  alt="Icone de Alerta"
                />
                <span className="text-neutral-800">
                  Cupom válido para hoje{' '}
                  {new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="bg-neutral-150 px-4 md:px-11 py-6 w-full mt-6">
                <div className="w-full flex flex-col md:flex-row bg-white rounded-2xl">
                  <div className="w-3/4 ml-6 flex py-3">
                    <Image
                      src={coupon.imagens[0]?.url}
                      alt="Imagem do cupom"
                      width={90}
                      height={90}
                    />
                    <div className="text-xl ml-4 mt-2">
                      <h5>{coupon.nome}</h5>
                      <span className="block text-2xl font-bold text-secondary-500 mt-1">
                        {formatBRL(coupon.valor_descontado)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-3/12 bg-helper-300 py-2 rounded-b-2xl md:rounded-2xl md:rounded-l-none flex flex-col items-center justify-center text-white font-bold">
                    <span className="text-sm">Seu código</span>
                    <h4 className="text-3xl">{coupon.codigo}</h4>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-sm md:text-xl mt-6 text-neutral-800">
                  Mostre o código do cupom para o atendente do caixa ou digite
                  no totem.
                </p>
                <CouponHowToClaimDialogButton />
                <p className="text-center text-xs text-tertiary-600 mt-4">
                  Para pedir mais vezes o mesmo item você precisa informar no
                  caixa ou digitar o mesmo código no totem quantas vezes quiser.
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <NeedAuthDialog
        couponId={coupon.id}
        isOpen={isNeedAuthModal}
        setIsOpen={setNeedAuthModal}
      />
    </>
  )
}
