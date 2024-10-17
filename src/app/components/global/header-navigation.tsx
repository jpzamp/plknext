'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { LogOut, Menu, X } from 'lucide-react'
import AppStoreButton from './app-store-button'

import { useAuth } from '@/app/contexts/session-context'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

import poppy from '@/public/poppy.svg'
import Image from 'next/image'

import { routes } from '@/app/data/routes'
import Button from './button'

const HeaderNav: React.FC = () => {
  const pathname = usePathname()
  const [responsiveMenuOpen, setResponsiveMenuOpen] = useState(false)

  const { isAuthenticated, logout } = useAuth()

  const { sendButtonClickEvent, sendPageViewEvent } = useTagManager()

  useEffect(() => {
    if (responsiveMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [responsiveMenuOpen])

  function handleLogout() {
    sendButtonClickEvent(ButtonEvents.LOGOUT_ACTION)
    logout()
    setResponsiveMenuOpen(false)
  }

  function handleBeforeLoginRedirect() {
    sendButtonClickEvent(ButtonEvents.LOGIN_ACTION)
    setResponsiveMenuOpen(false)
  }

  function handlePathClick(routePath: string, routeLabel: string) {
    sendPageViewEvent(routePath, routeLabel)
    setResponsiveMenuOpen(false)
  }

  return (
    <>
      <nav className="gap-1 h-[88px] text-xl hidden xl:flex">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            onClick={() => handlePathClick(route.path, route.label)}
            className={`font-bold hover:text-primary-500 px-4 content-center border-b-4
            ${pathname.startsWith(route.path) ? 'border-b-primary-500 text-primary-500' : 'text-neutral-900 border-b-transparent'}`}
          >
            {route.label}
          </Link>
        ))}
        {isAuthenticated ? (
          <Button
            className="h-fit my-auto flex no-underline gap-2 text-lg items-center justify-center font-medium"
            variant="ghost"
            onClick={handleLogout}
          >
            <LogOut color="#ff7d00" />
            Sair
          </Button>
        ) : (
          <Button
            className="h-fit my-auto"
            variant="primary"
            redirectTo="/auth"
            onBeforeRedirect={handleBeforeLoginRedirect}
          >
            Entrar
          </Button>
        )}
      </nav>

      <div
        className="block xl:hidden absolute right-7 bottom-3"
        onClick={() => setResponsiveMenuOpen(!responsiveMenuOpen)}
      >
        <button
          id="nav-toggle"
          className="flex items-center px-3 py-2 text-gray-500 hover:text-white"
        >
          {responsiveMenuOpen ? (
            <X color="#F25600" />
          ) : (
            <Menu color="#F25600" />
          )}
        </button>
      </div>

      <div
        className={`fixed top-[68px] h-[calc(100vh-68px)] w-full bg-white z-[9999] ${responsiveMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex-grow w-full border-t border-[#E5E5E5] max-w-[85%] my-3" />
          <div className="flex flex-col items-start w-full gap-6">
            <div className="relative w-full" key={`route-home`}>
              {pathname === '/' && (
                <div className="absolute h-10 left-0 top-[-2px] border-r-primary-500 rounded-full border-r-4" />
              )}
              <Link
                key={'/'}
                href={'/'}
                onClick={() => setResponsiveMenuOpen(false)}
                className={`hover:text-primary-500 px-9 content-center text-2xl
            ${pathname === '/' ? ' text-primary-500 font-bold' : 'text-neutral-900'}`}
              >
                Home
              </Link>
            </div>
            {routes.map((route, index) => (
              <div className="relative w-full" key={`route-${index}`}>
                {pathname.startsWith(route.path) && (
                  <div className="absolute h-10 left-0 top-[-2px] border-r-primary-500 rounded-full border-r-4" />
                )}
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setResponsiveMenuOpen(false)}
                  className={`hover:text-primary-500 px-9 content-center text-2xl
            ${pathname.startsWith(route.path) ? ' text-primary-500 font-bold' : 'text-neutral-900'}`}
                >
                  {route.label}
                </Link>
              </div>
            ))}
            <div className="px-9 w-full mt-4">
              {isAuthenticated ? (
                <Button
                  className="h-fit my-auto flex no-underline gap-2 text-lg items-center justify-center font-medium"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  <LogOut color="#ff7d00" />
                  Sair
                </Button>
              ) : (
                <Button
                  className="h-fit w-full"
                  variant="primary"
                  redirectTo="/auth"
                  onBeforeRedirect={handleBeforeLoginRedirect}
                >
                  Entrar
                </Button>
              )}
            </div>
          </div>
          <div className="flex-grow w-full border-t border-[#E5E5E5] max-w-[85%] my-3 mt-16" />
          <div
            id="download-the-app"
            className="w-full px-9 relative overflow-hidden pb-5"
          >
            <h1 className="font-chicken-script text-3xl text-primary-500">
              Baixe o App
            </h1>
            <span className="text-base">Para resgatar cupons e mais!</span>
            <AppStoreButton store="Apple" className="mt-5 max-w-52" />
            <AppStoreButton store="Google" className="mt-5 max-w-52" />
            <Image
              src={poppy}
              alt="Popeyes Poppy"
              className="absolute top-16 right-[-20px]"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderNav
