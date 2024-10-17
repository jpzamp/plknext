import Image from 'next/image'
import { env } from '@/env'
import { twMerge } from 'tailwind-merge'
import { AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

import appleIcon from '@/public/icons/apple_logo.svg'
import googlePlay from '@/public/icons/google_play_logo.svg'

interface AppStoreButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  store: 'Google' | 'Apple'
}

export default function AppStoreButton({
  store,
  className,
  ...props
}: AppStoreButtonProps) {
  return (
    <Link
      href={
        store === 'Apple'
          ? env.NEXT_PUBLIC_APPLE_STORE_DOWNLOAD_APP_URL
          : env.NEXT_PUBLIC_GOOGLE_PLAY_DOWNLOAD_APP_URL
      }
      className={twMerge(
        className,
        'flex items-center w-fit min-w-36 px-4 py-2 space-x-2 bg-neutral-900 text-white rounded-md',
      )}
      {...props}
    >
      <Image
        priority
        src={store === 'Apple' ? appleIcon : googlePlay}
        height={22}
        alt="Download the Popeyes App on Apple Store"
      />
      <div className="flex flex-col items-start">
        <span className="text-[8px] md:text-xs">AVAILABLE ON THE</span>
        <span className="text-sm md:text-lg font-semibold text-nowrap">
          {store === 'Apple' ? 'App Store' : 'Google Play'}
        </span>
      </div>
    </Link>
  )
}
