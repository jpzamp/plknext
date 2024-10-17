import Image from 'next/image'

import bonelessIcon from '@/public/icons/popeyes-boneless-fried-chicken-icon.svg'
import boneInIcon from '@/public/icons/popeyes-fried-chicken-icon.svg'
import mildIcon from '@/public/icons/popeyes-mild-icon.svg'
import spicyIcon from '@/public/icons/popeyes-spicy-icon.svg'

export enum ProductType {
  BoneIn,
  Boneless,
  Mild,
  Spicy,
}

interface ProductAttributesProps {
  productType: ProductType
}

const productDetails = {
  [ProductType.BoneIn]: {
    icon: boneInIcon,
    title: 'Pedaços',
    description: 'Com osso',
    alt: 'Frango com osso',
  },
  [ProductType.Boneless]: {
    icon: bonelessIcon,
    title: 'Filés',
    description: 'Sem osso',
    alt: 'Frango sem osso',
  },
  [ProductType.Mild]: {
    icon: mildIcon,
    title: 'Suave',
    description: 'Mix de temperos de Louisiana',
    alt: 'Tempero suave',
  },
  [ProductType.Spicy]: {
    icon: spicyIcon,
    title: 'Vibrante',
    description: 'Especiarias levemente apimentadas',
    alt: 'Tempero vibrante',
  },
}

export default function ProductAttributes({
  productType,
}: ProductAttributesProps) {
  const { icon, title, description, alt } = productDetails[productType]

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-36">
      <Image src={icon} className="w-auto h-auto min-h-20" alt={alt} />
      <h4 className="text-primary-700 font-bold text-xl">{title}</h4>
      <p className="text-xs">{description}</p>
    </div>
  )
}
