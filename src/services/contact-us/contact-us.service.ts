import { api } from '../../api'
import { IServiceException } from '../../interfaces'
import { IContactUs } from '../../interfaces/modules.interface'
import { formatApiErrors } from '../../utils'

export interface ICreateContactUsDto {
  name: string
  email: string
  phone: string
  message: string
}

export class ContactUsService {
  static findAll = async () : Promise<IContactUs[] | IServiceException> => {
    try {
      const { data } = await api.get( '/contact-us' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IContactUs | IServiceException> => {
    try {
      const { data } = await api.get( `/contact-us/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateContactUsDto ) : Promise<IContactUs | IServiceException> => {
    try {
      const { data } = await api.post( '/contact-us', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static update = async ( id : string, updateDto : ICreateContactUsDto ) : Promise<IContactUs | IServiceException> => {
    try {
      const { data } = await api.patch( `/contact-us/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static remove = async ( id : string ) : Promise<IContactUs | IServiceException> => {
    try {
      const { data } = await api.delete( `/contact-us/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
