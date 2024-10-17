'use client'

import { ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

import { graphQlClient } from '@/app/data/api'

export default function ApolloProviderContainer({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <ApolloProvider client={graphQlClient}>{children}</ApolloProvider>
}
