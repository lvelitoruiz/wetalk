export interface MyServicesData {
  id: string
  status: string
  descripcion: string | null
  imagen: string | null
  nombre?: string
  titulo?: string
  secuencia: number
  url?: string
  date_created: string | null
  abrir_nueva_pagina?: boolean
  servicios?: MyServicesData[]
}

export interface MyServicesParams {
  codNivel: string | null
  codCampus: string | null
  facultad: string | null
  codProductoActual: string | null
  facultadId: string | null
}

export interface ProfileDataStore {
  data: null | MyServicesData[]
  error: unknown
}

export interface ErrorResponse {
  icono: string
  titulo: string
  descripcion: string
}

export interface DataResponse<T> {
  message: string
  flag: boolean
  error: ErrorResponse | null
  data: T
}
