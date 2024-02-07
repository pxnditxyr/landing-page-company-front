import { api } from '../../api'
import { IServiceException } from '../../interfaces'
import { IProjectsTeam } from '../../interfaces/modules.interface'
import { formatApiErrors } from '../../utils'

export interface ICreateProjectsTeamsDto {
  teamId: string
  projectId: string
}

export class ProjectsTeamsService {
  static findAll = async () : Promise<IProjectsTeam[] | IServiceException> => {
    try {
      const { data } = await api.get( '/projects-teams' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IProjectsTeam | IServiceException> => {
    try {
      const { data } = await api.get( `/projects-teams/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateProjectsTeamsDto ) : Promise<IProjectsTeam | IServiceException> => {
    try {
      const { data } = await api.post( '/projects-teams', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static update = async ( id : string, updateDto : ICreateProjectsTeamsDto ) : Promise<IProjectsTeam | IServiceException> => {
    try {
      const { data } = await api.patch( `/projects-teams/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static remove = async ( id : string ) : Promise<IProjectsTeam | IServiceException> => {
    try {
      const { data } = await api.delete( `/projects-teams/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
