'use client'

import { CircleMinus, CirclePlus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Collapse } from 'react-collapse'

interface FooterExpandableMenuProps {
  extraRoutes: {
    path: string
    label: string
  }[]
}

export default function FooterExpandableMenu({
  extraRoutes,
}: FooterExpandableMenuProps) {
  const [footerCollapseOpen, setFooterCollapseOpen] = useState(false)

  return (
    <div className="md:hidden w-full">
      <button onClick={() => setFooterCollapseOpen(!footerCollapseOpen)}>
        {footerCollapseOpen ? <CircleMinus /> : <CirclePlus />}
      </button>
      <Collapse isOpened={footerCollapseOpen}>
        <div className="w-full flex flex-col items-start gap-3 px-6">
          {extraRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="transition duration-300 ease-in-out hover:text-highlight-500 underline"
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex-grow w-full border-t border-tertiary-600 my-3 mt-8" />
      </Collapse>
    </div>
  )
}
