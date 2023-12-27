import { api } from '../../api'
import { formatApiErrors } from '../../utils'

import { IAuthResponse, IServiceException } from '../../interfaces'

export interface ISigninParams {
  email: string
  password: string
}

export interface ISignupParams {
  name: string
  lastname: string
  birthdate: string
  gender: string
  phone: string
  info: string
  email: string
  password: string
}
  
export class AuthService {
  static signin = async ( signinParams : ISigninParams ) : Promise<IAuthResponse | IServiceException> => {
    try {
      const { data } = await api.post( '/auth/signin', signinParams )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static signup = async ( signupParams : ISignupParams ) : Promise<IAuthResponse | IServiceException> => {
    try {
      const { data } = await api.post( '/auth/signup', signupParams )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static checkAuthStatus = async () : Promise<IAuthResponse | IServiceException> => {
    try {
      const { data } = await api.get( '/auth/revalidate-token' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
