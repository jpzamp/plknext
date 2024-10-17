import { env } from '@/env'

import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'

type ApiType = 'API' | 'CMS'

export function api(path: string, init?: RequestInit, type: ApiType = 'CMS') {
  const baseUrl =
    type === 'API'
      ? env.NEXT_PUBLIC_API_BASE_URL
      : env.NEXT_PUBLIC_CMS_API_BASE_URL

  const url = new URL(type === 'CMS' ? '/api'.concat(path) : path, baseUrl)

  return fetch(url, init)
}

const httpLink = new HttpLink({
  uri: env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
  headers: {
    'x-api-key': env.NEXT_PUBLIC_GRAPHQL_X_API_KEY,
  },
})

export const graphQlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

// Legacy Register User By GraphQL

export interface UserCreateModel {
  user_id_facebook: string
  name: string
  lastname: string
  email: string
  cpf: string
  term_accepted: boolean
  receive_mail: boolean
  receive_sms: boolean
  number: string
}

export const CREATE_USER_GQL_QUERY = gql`
  mutation (
    $user_id_facebook: String
    $name: String!
    $lastname: String!
    $email: String!
    $cpf: String!
    $term_accepted: Boolean!
    $receive_mail: Boolean!
    $receive_sms: Boolean!
    $number: String!
  ) {
    saveCustomerPWA(
      user_id_facebook: $user_id_facebook
      customer_name: $name
      last_name: $lastname
      email: $email
      cpf: $cpf
      term_accepted: $term_accepted
      receive_mail: $receive_mail
      receive_sms: $receive_sms
      contact_number: $number
    )
  }
`
