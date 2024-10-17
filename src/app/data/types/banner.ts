export interface Banner {
  image: {
    desktop: string
    mobile: string
  }
  actionUrl: string
}

export interface CMSBanner {
  id: number
  link: string
  segunda?: boolean
  terca?: boolean
  quarta?: boolean
  quinta?: boolean
  sexta?: boolean
  sabado?: boolean
  domingo?: boolean
  imagem: {
    name: string
    alternativeText: string
    url: string
  }
  imagem_web: {
    name: string
    alternativeText: string
    url: string
  }
}
