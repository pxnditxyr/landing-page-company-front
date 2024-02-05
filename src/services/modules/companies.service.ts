import { api } from '../../api'
import { IServiceException } from '../../interfaces'
import { ICompany } from '../../interfaces/modules.interface'
import { formatApiErrors } from '../../utils'

export interface ICreateCompanyDto {
  name: string
  phone: string
  info: string
  email: string
  details: string
  mission: string
  vision: string
  foundedAt: string
  address: string
  website: string
  documentNumber: string
}

export class CompaniesService {
  static findAll = async () : Promise<ICompany[] | IServiceException> => {
    try {
      const { data } = await api.get( '/companies' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ICompany | IServiceException> => {
    try {
      const { data } = await api.get( `/companies/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findFirst = async () : Promise<ICompany | IServiceException> => {
    try {
      const { data } = await api.get( '/companies/first/1' )
      return data
    } catch ( error ) {
      console.log({
        error
      })
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateCompanyDto ) : Promise<ICompany | IServiceException> => {
    try {
      const { data } = await api.post( '/companies', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static update = async ( id : string, updateDto : ICreateCompanyDto ) : Promise<ICompany | IServiceException> => {
    try {
      const { data } = await api.patch( `/companies/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static remove = async ( id : string ) : Promise<ICompany | IServiceException> => {
    try {
      const { data } = await api.delete( `/companies/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
