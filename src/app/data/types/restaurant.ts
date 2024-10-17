/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRestaurantModelImage {
  name: string
  alternativeText: string
  url: string
}

export interface FuncionamentoRestaurante {
  [key: string]: any
  start_segunda: string
  end_segunda: string
  start_terca: string
  end_terca: string
  start_quarta: string
  end_quarta: string
  start_quinta: string
  end_quinta: string
  start_sexta: string
  end_sexta: string
  start_sabado: string
  end_sabado: string
  start_domingo: string
  end_domingo: string
  nome: string
  segunda: boolean
  terca: boolean
  quarta: boolean
  quinta: boolean
  sexta: boolean
  sabado: boolean
  domingo: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface PlkRestaurant {
  id: number
  name: string
  is_delivery: boolean
  latitude: string
  longitude: string
  plk_number: string
  is_franqueado: boolean
  logradouro: string
  numero: string
  complemento: string | null
  bairro: string
  grupo_loja: {
    id: number
    titulo: string
  }
  cidade: string
  estado: string
  favorito: boolean
  imagem: { name: string; alternativeText: string | null; url: string }[]
  funcionamento_restaurante: FuncionamentoRestaurante
}
