import { Cupom } from './cupom'

interface PlkImage {
  name: string
  alternativeText: string | null
  url: string
}

export interface PlkLabel {
  id: number
  nome: string
}

export interface PlkCategory {
  id: number
  nome: string
  ordem: number
  imagem?: {
    name: string
    alternativeText: string | null
    url: string
  }
  produtos: {
    id: number
    nome: string
    descricao: string
    ordem: number
    pedacos: boolean
    files: boolean
    pessoas: number
    suave: boolean
    vibrante: boolean
    mini_files: boolean
    produto_exclusivo: boolean
    categorias: PlkCategory[]
    codigoCupom: Cupom[]
    imagens: PlkImage[]
    labels: PlkLabel[]
  }[]
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface PlkProduct {
  id: number
  nome: string
  descricao: string
  ordem: number
  pedacos: boolean
  files: boolean
  pessoas: number
  suave: boolean
  vibrante: boolean
  mini_files: boolean
  produto_exclusivo: boolean
  categorias: PlkCategory[]
  cupons_relacionados: Cupom[]
  imagem: PlkImage[] // Why the CMS send different array names by the route ?? idk
  imagens: PlkImage[] // Why the CMS send different array names by the route ?? idk
  quantidade_itens: {
    id: number
    descricao: string
  }[]
  labels: PlkLabel[]
}
