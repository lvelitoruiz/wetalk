export interface DataDocumento {
  id: number
  status: string
  descripcion: string | null
  imagen: string | null
  nombre?: string
  titulo?: string
  secuencia: number
  secuencia_mas_buscada?: number
  date_created: string | null
  mas_buscados?: boolean
  documento?: string
  documentos?: DataDocumento[]
}

export interface DocumentosParams {
  codNivel: string | null
  codCampus: string | null
  facultad: string | null
  codProductoActual: string | null
  facultadId: string | null
}
