import { ReactNode } from 'react'

export default function PopeyesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <section className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1288px]">{children}</div>
    </section>
  )
}
