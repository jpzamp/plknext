/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '../contexts/session-context'

export default function SessionCheckerProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { isAuthenticated } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [])

  return <>{children}</>
}
