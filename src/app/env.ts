import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_CMS_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_APPLICATION_BASE_URL: z.string().url(),
    NEXT_PUBLIC_GOOGLE_PLAY_DOWNLOAD_APP_URL: z.string().url(),
    NEXT_PUBLIC_APPLE_STORE_DOWNLOAD_APP_URL: z.string().url(),
    NEXT_PUBLIC_IFOOD_REDIRECT_URL: z.string().url(),
    NEXT_PUBLIC_RAPPI_REDIRECT_URL: z.string().url(),
    NEXT_PUBLIC_GRAPHQL_BASE_URL: z.string().url(),
    NEXT_PUBLIC_GRAPHQL_X_API_KEY: z.string(),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI: z.string().url(),
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_CMS_API_BASE_URL: process.env.NEXT_PUBLIC_CMS_API_BASE_URL,
    NEXT_PUBLIC_APPLICATION_BASE_URL:
      process.env.NEXT_PUBLIC_APPLICATION_BASE_URL,
    NEXT_PUBLIC_GOOGLE_PLAY_DOWNLOAD_APP_URL:
      process.env.NEXT_PUBLIC_GOOGLE_PLAY_DOWNLOAD_APP_URL,
    NEXT_PUBLIC_APPLE_STORE_DOWNLOAD_APP_URL:
      process.env.NEXT_PUBLIC_APPLE_STORE_DOWNLOAD_APP_URL,
    NEXT_PUBLIC_IFOOD_REDIRECT_URL: process.env.NEXT_PUBLIC_IFOOD_REDIRECT_URL,
    NEXT_PUBLIC_RAPPI_REDIRECT_URL: process.env.NEXT_PUBLIC_RAPPI_REDIRECT_URL,
    NEXT_PUBLIC_GRAPHQL_BASE_URL: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    NEXT_PUBLIC_GRAPHQL_X_API_KEY: process.env.NEXT_PUBLIC_GRAPHQL_X_API_KEY,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI:
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
})