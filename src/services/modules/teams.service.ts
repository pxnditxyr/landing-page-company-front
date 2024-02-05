import { api } from '../../api'
import { IServiceException } from '../../interfaces'
import { ITeam } from '../../interfaces/modules.interface'
import { formatApiErrors } from '../../utils'

export interface ICreateTeamDto {
  name: string
  details: string
  imageUrl: string
}

export class TeamsService {
  static findAll = async () : Promise<ITeam[] | IServiceException> => {
    try {
      const { data } = await api.get( '/teams' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ITeam | IServiceException> => {
    try {
      const { data } = await api.get( `/teams/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateTeamDto ) : Promise<ITeam | IServiceException> => {
    try {
      const { data } = await api.post( '/teams', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static update = async ( id : string, updateDto : ICreateTeamDto ) : Promise<ITeam | IServiceException> => {
    try {
      const { data } = await api.patch( `/teams/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static remove = async ( id : string ) : Promise<ITeam | IServiceException> => {
    try {
      const { data } = await api.delete( `/teams/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
