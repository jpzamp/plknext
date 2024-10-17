import Footer from '@/components/global/footer'
import Header from '@/components/global/header'
import { ReactNode, Suspense } from 'react'
import { ModalErrorProvider } from '../contexts/generic-error-context'

export default function PopeyesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <ModalErrorProvider>
        <Header />
        <div className="xl:pt-24 min-h-screen w-full relative z-0">
          <Suspense>{children}</Suspense>
        </div>
        <Footer />
      </ModalErrorProvider>
    </main>
  )
}
