'use client'

import GenericErrorDialog from '@/components/dialogs/generic-error-dialog'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalErrorContextProps {
  isModalErrorOpen: boolean
  setModalErrorOpen: (isOpen: boolean) => void
}

const ModalErrorContext = createContext<ModalErrorContextProps | undefined>(
  undefined,
)

export const ModalErrorProvider = ({ children }: { children: ReactNode }) => {
  const [isModalErrorOpen, setModalErrorOpen] = useState<boolean>(false)

  return (
    <ModalErrorContext.Provider value={{ isModalErrorOpen, setModalErrorOpen }}>
      {children}
      <GenericErrorDialog
        isOpen={isModalErrorOpen}
        setIsOpen={setModalErrorOpen}
      />
    </ModalErrorContext.Provider>
  )
}

export const useModalError = () => {
  const context = useContext(ModalErrorContext)
  if (!context) {
    throw new Error(
      'useModalError deve ser usado dentro de um ModalErrorProvider',
    )
  }
  return context
}
