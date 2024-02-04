import { api } from '../../api'
import { IServiceException } from '../../interfaces'
import { IProject } from '../../interfaces/modules.interface'
import { formatApiErrors } from '../../utils'

export interface ICreateProjectDto {
  name: string
  details: string
  imageUrl: string
  info: string
}

export class ProjectsService {
  static findAll = async () : Promise<IProject[] | IServiceException> => {
    try {
      const { data } = await api.get( '/projects' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IProject | IServiceException> => {
    try {
      const { data } = await api.get( `/projects/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateProjectDto ) : Promise<IProject | IServiceException> => {
    try {
      const { data } = await api.post( '/projects', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static update = async ( id : string, updateDto : ICreateProjectDto ) : Promise<IProject | IServiceException> => {
    try {
      const { data } = await api.patch( `/projects/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static remove = async ( id : string ) : Promise<IProject | IServiceException> => {
    try {
      const { data } = await api.delete( `/projects/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
