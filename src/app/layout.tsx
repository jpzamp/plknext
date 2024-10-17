import type { Metadata } from 'next'
import Script from 'next/script'

import localFont from 'next/font/local'
import { Roboto } from 'next/font/google'

import './globals.css'

import { env } from '@/env'
import { AuthProvider } from './contexts/session-context'
import { GoogleTagManagerProvider } from './contexts/google-analytics-context'
import { GoogleOAuthProvider } from '@react-oauth/google'

const chickenSans = localFont({
  src: [
    {
      path: '../../public/fonts/ChickenSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ChickenSans-Bold.woff2',
      weight: '800',
    },
  ],
  variable: '--font-chicken-sans',
})

const chickenScript = localFont({
  src: [
    {
      path: '../../public/fonts/ChickenScript_2.0.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-chicken-script',
})

const roboto = Roboto({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APPLICATION_BASE_URL),
  title: {
    template: '%s | Louisiana Kitchen - Popeyes Brasil',
    default: 'Louisiana Kitchen - Popeyes Brasil',
  },
  keywords: [
    'Louisiana Kitchen Brasil',
    'Popeyes Brasil',
    'Popeyes',
    'Poppy Frango',
    'Melhor Frango Frito do Brasil',
    'Frango marinado por 24 horas',
    'Popeyes PLK',
  ],
  description: 'O único frango frito marinado por 12 horas!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${chickenSans.variable} ${chickenScript.variable} ${roboto.variable} font-sans antialiased bg-neutral-500`}
      >
        <GoogleTagManagerProvider>
          <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <AuthProvider>{children}</AuthProvider>
          </GoogleOAuthProvider>
        </GoogleTagManagerProvider>

        <Script
          id="one-trust-script"
          type="text/javascript"
          src="https://cdn.cookielaw.org/consent/071ba60d-fbb1-43e1-9754-10ab94a7e310/OtAutoBlock.js"
        ></Script>
        <Script
          id="one-trust-script-sdk"
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          data-document-language="true"
          type="text/javascript"
          data-domain-script="071ba60d-fbb1-43e1-9754-10ab94a7e310"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js-cdn.dynatrace.com/jstag/178598305ee/bf36111jle/f6101782b8b9fbc7_complete.js"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  )
}
