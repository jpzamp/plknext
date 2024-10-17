import { Metadata } from 'next'
import { ReactNode } from 'react'

import ApolloProviderContainer from '@/app/providers/apollo-provider'

import BackArrow from '@/components/global/back-arrow'
import SessionCheckerProvider from '@/app/providers/session-checker-provider'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function PopeyesAuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <section
      id="auth-layout"
      className="bg-onboarding-auth-pattern bg-white bg-[left_5rem] bg-no-repeat bg-cover min-h-screen"
    >
      <SessionCheckerProvider>
        <div className="mx-auto max-w-[1288px] py-24 pt-9 md:pt-12 px-6">
          <BackArrow className="mb-6" />
          <div className="flex flex-col items-center bg-white max-w-[636px] min-h-[504px] mx-auto rounded-2xl p-8 pb-12 drop-shadow-cupom">
            <ApolloProviderContainer>{children}</ApolloProviderContainer>
          </div>
        </div>
      </SessionCheckerProvider>
    </section>
  )
}
