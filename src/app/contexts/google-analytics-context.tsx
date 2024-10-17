'use client'

import React, { createContext, useContext, useEffect } from 'react'
import TagManager from 'react-gtm-module'

import { useAuth } from './session-context'
import { env } from '@/env'

import { usePathname } from 'next/navigation'

export enum ButtonEvents {
  VIEW_CUPOM = 'button_click_viewcupom', // READY
  PEGAR_CUPOM = 'button_click_pegarcupom', // READY
  LOGIN_ACTION = 'button_click_login', // READY
  LOGOUT_ACTION = 'button_click_logout', // READY
  PRODUCT_VIEW = 'button_click_product_view', // READY
  CALL_TO_US = 'button_click_calltous', // READY
  FILTER_CATEGORY = 'button_click_filter_category', // READY

  LOGIN_ACTION_PHONE = 'button_click_login_phone', // READY
  LOGIN_ACTION_PHONE_CONTINUAR = 'button_click_login_phone_continuar', // READY
  FINISH_LOGIN_ACTION_SMS = 'button_click_login_sms_continuar', // READY
  REGISTER_CONTINUE = 'button_click_register_user', // READY
  LOGIN_ACTION_TROUBLESHOOTING = 'button_click_login_troubleshooting', // READY
  TABELA_NUTRICIONAL = 'button_click_tabela_nutricional', // READY
}

export enum ExtraEvents {
  SUCCESS_LOGIN = 'successfully_logged_in', // READY
  SUCCESS_REGISTRED = 'successfully_registred_in', // READY
}

interface ITagManagerContextType {
  sendPageViewEvent: (pagePath: string, pageTitle: string) => void
  sendButtonClickEvent: (event: ButtonEvents, eventData?: object) => void
  sendExtraEvents: (event: ExtraEvents, eventData?: object) => void
}

const TagManagerContext = createContext<ITagManagerContextType | undefined>(
  undefined,
)

interface ITagManagerProviderProps {
  children: React.ReactNode
}

export const GoogleTagManagerProvider: React.FC<ITagManagerProviderProps> = ({
  children,
}: ITagManagerProviderProps) => {
  const { user } = useAuth()

  const pathname = usePathname()

  useEffect(() => {
    TagManager.initialize({
      gtmId: env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    })

    const pagePath = pathname // Get the current route path
    const pageTitle = document.title // Get the current page title

    sendPageViewEvent(pagePath, pageTitle)
  }, [])

  const sendPageViewEvent = (pagePath: string, pageTitle: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'page_view',
        pagePath,
        pageTitle,
        userId: user ? user.customerId : undefined,
      },
    })
  }

  const sendButtonClickEvent = (event: ButtonEvents, eventData?: object) => {
    TagManager.dataLayer({
      dataLayer: {
        event,
        ...eventData,
        userId: user ? user.customerId : undefined,
      },
    })
  }

  const sendExtraEvents = (event: ExtraEvents, eventData?: object) => {
    TagManager.dataLayer({
      dataLayer: {
        event,
        ...eventData,
        userId: user ? user.customerId : undefined,
      },
    })
  }

  const contextValue: ITagManagerContextType = {
    sendPageViewEvent,
    sendButtonClickEvent,
    sendExtraEvents,
  }

  return (
    <TagManagerContext.Provider value={contextValue}>
      {children}
    </TagManagerContext.Provider>
  )
}

export const useTagManager = (): ITagManagerContextType => {
  const context = useContext(TagManagerContext)
  if (!context) {
    throw new Error('useTagManager must be used within a TagManagerProvider')
  }
  return context
}
