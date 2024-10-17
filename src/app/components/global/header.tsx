import Image from 'next/image'
import bandLogo from '@/public/brand-popeyes-logo.svg'
import Link from 'next/link'
import HeaderNav from './header-navigation'

export default function Header() {
  return (
    <header className="w-full bg-white drop-shadow-header xl:fixed relative z-[99999]">
      <div className="mx-auto max-w-[1288px] pt-4 xl:pt-2 flex justify-center xl:justify-between items-center">
        <Link href="/">
          <Image
            src={bandLogo}
            alt="Popeyes Louisiana Kitchen"
            priority
            className="xl:h-[48px] h-[40px] mb-3 w-auto"
          />
        </Link>

        <HeaderNav />
      </div>
    </header>
  )
}
