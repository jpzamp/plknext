interface Categoria {
  id: number
  nome: string
  ordem: number
}

interface Label {
  id: number
  nome: string
}

interface Imagem {
  name: string
  alternativeText: string | null
  url: string
}

export interface PlkCupom {
  id: number
  nome: string
  descricao: string
  codigo: string
  ordem?: number
  segunda?: boolean
  terca?: boolean
  quarta?: boolean
  quinta?: boolean
  sexta?: boolean
  sabado?: boolean
  domingo?: boolean
  start_cupom?: string
  end_cupom?: string
  favorito: boolean
  valor_regular: number
  valor_descontado: number
  categoria: Categoria
  labels: Label[]
  imagens: Imagem[]
}
