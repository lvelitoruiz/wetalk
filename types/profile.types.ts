export interface ProfileData {
  idBanner: null | string
  pidm: null
  codLineaNegocio: string
  codAlumno: string
  codPersona: string
  codUsuario: string
  codSede: string
  apePatImag: string
  apeMatImag: string
  nombresImag: string
  tipoDocumento: string
  documenIdentida: string
  codModalidadEstActual: string
  codPeriodoActual: string
  codPeriodoBanner: null
  codPeriodoBannerCatalogo: null
  codProductoActual: string
  codPrograma: null
  codNivel: null
  desNivel: null
  codCampus: null
  desCampus: string
  codEstadoAlumno: null
  desEstadoAlumno: null
  codTipoAlumno: null
  desTipoAlumno: null
  codTipoAprendizaje: null
  desTipoAprendizaje: null
  codTipoIngreso: null
  desTipoIngreso: null
  desProducto: string
  desPrograma: null
  usuarioEmail: string
  facultad: string
  facultadId: string
  fotoUrl: string
  fechaNacimiento: string
  sexo: string
  telefono: string
  celular: string
  ciudad: string
  direccion: string
  egresado: string
  ciclo: string
  fullName: string
  tipoPersona: string
  codTipoUsuario: string
  correoPersonal: string
  cicloIngreso: string
  fotoUrlLow: string
  urbanizacion: string
  departamento: string
  distrito: string
  contactoDeEmergenciaNombre: string
  contactoDeEmergenciaApellido: string
  contactoDeEmergenciaCelular: string
  situacionLaboral: string
  tipoDeEmpleo: string
  modalidadEmpleo: string
  empresa: string
  ruc: string
  direccionEmpresa: string
  cargo: string
  enlaceLinkedin: string
  infoJefeNombre: string
  infoJefeCargo: string
  infoJefeCorreo: string
  infoJefeTelefono: string
  zipCode?: string | null
}
interface Error {
  titulo: string
  descripcion: string
  icono: string
  default: boolean
}

export interface ProfileDataStore {
  data: null | ProfileData
  pending: unknown
  error: Error | null
}
