import { AxiosError } from 'axios'

export const formatApiErrors = ( error : any ) : string => {
  if ( error instanceof AxiosError ) {
    if ( typeof error.response?.data?.message === 'string' ) return error.response.data.message
    if ( typeof error.response?.data?.message === 'object' ) return error.response.data.message.join( ', ' )
    if ( typeof error.response?.data?.error === 'string' ) return error.response.data.error
    if ( typeof error.response?.data === 'string' ) 
    if ( error.message.includes( '404' ) ) {
      return 'Lo sentimos, no logramos encontrar el recurso solicitado, por favor intenta de nuevo o contacte con el soporte'
    }
    if ( error.message.includes( 'Network Error' ) ) return 'Ups, Parece que no se pudo conectar con el servidor, por favor intenta de nuevo o contacte con el soporte'
  }
  console.error( error )
  return 'Ups, Algo salió mal, por favor intenta de nuevo o contacte con el soporte'
}
