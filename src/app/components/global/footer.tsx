import Image from 'next/image'

import { routes } from '@/app/data/routes'

import popeyesFooterLogo from '@/public/popeyes-est-logo.svg'
import FooterSocialMediaButtons from './footer-social-media'
import FooterExpandableMenu from './footer-expandable-menu'
import Link from 'next/link'

export default function Footer() {
  const extraRoutes = [
    {
      path: 'https://ri.zamp.com.br/',
      label: 'Relação com Investidores',
    },
    {
      path: '/politica-de-privacidades',
      label: 'Diretrizes e Privacidade de Dados',
    },
    {
      path: '/termos-de-uso',
      label: 'Informações Legais',
    },
    {
      path: 'https://privacyportal-br.onetrust.com/webform/178e65db-f98c-4c7c-8f4b-8636690f283f/d04a5d39-b6e4-4b9e-90cc-5fcbe0e10721',
      label: 'Opções de Privacidade',
    },
  ]

  return (
    <footer className="w-full bg-tertiary-800 pt-12 pb-6 flex flex-col text-white text-center items-center justify-center">
      <Image
        src={popeyesFooterLogo}
        alt="Popeyes Poppy"
        className="w-16 md:w-32"
      />
      <span className="md:text-2xl text-base text-tertiary-150 mt-3 md:mt-9 mb-4">
        #AmoEsseFrango
      </span>
      <FooterSocialMediaButtons />

      <div className="md:hidden flex-grow w-full border-t border-tertiary-600 my-3 mt-8" />

      <FooterExpandableMenu extraRoutes={extraRoutes} />

      <div
        id="hot-links"
        className="hidden md:flex items-center justify-center gap-8 mt-14"
      >
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="font-bold transition duration-300 ease-in-out hover:text-highlight-500"
          >
            {route.label}
          </Link>
        ))}
      </div>

      <div
        id="extra-hot-links"
        className="hidden md:flex items-center justify-center gap-8 mt-2"
      >
        {extraRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="transition duration-300 ease-in-out hover:text-highlight-500"
          >
            {route.label}
          </Link>
        ))}
      </div>

      <p className="text-xs text-tertiary-400 tracking-wider mt-8 max-w-[320px] md:max-w-full">
        Imagens meramente ilustrativas. TM & © {new Date().getFullYear()}{' '}
        POPEYES®. Todos os direitos reservados.
      </p>
    </footer>
  )
}
