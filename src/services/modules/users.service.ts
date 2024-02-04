import { api } from '../../api'
import { IServiceException } from '../../interfaces'
import { IUser } from '../../interfaces/modules.interface'
import { formatApiErrors } from '../../utils'

export interface ICreateUserDto {
  name: string
  lastname: string
  birthdate: string
  gender: string
  phone: string
  info: string
  email: string
  password: string
  role: string
}

export class UsersService {
  static findAll = async () : Promise<IUser[] | IServiceException> => {
    try {
      const { data } = await api.get( '/users' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IUser | IServiceException> => {
    try {
      const { data } = await api.get( `/users/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateUserDto ) : Promise<IUser | IServiceException> => {
    try {
      const { data } = await api.post( '/users', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static update = async ( id : string, updateDto : ICreateUserDto ) : Promise<IUser | IServiceException> => {
    try {
      const { data } = await api.patch( `/users/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static remove = async ( id : string ) : Promise<IUser | IServiceException> => {
    try {
      const { data } = await api.delete( `/users/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

}
