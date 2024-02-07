import { api } from '../../api'
import { IServiceException } from '../../interfaces'
import { ITeamMember } from '../../interfaces/modules.interface'
import { formatApiErrors } from '../../utils'

export interface ICreateTeamMemberDto {
  userId: string
  teamId: string
}

export class TeamMembersService {
  static findAll = async () : Promise<ITeamMember[] | IServiceException> => {
    try {
      const { data } = await api.get( '/team-members' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ITeamMember | IServiceException> => {
    try {
      const { data } = await api.get( `/team-members/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateTeamMemberDto ) : Promise<ITeamMember | IServiceException> => {
    try {
      const { data } = await api.post( '/team-members', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static update = async ( id : string, updateDto : ICreateTeamMemberDto ) : Promise<ITeamMember | IServiceException> => {
    try {
      const { data } = await api.patch( `/team-members/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static remove = async ( id : string ) : Promise<ITeamMember | IServiceException> => {
    try {
      const { data } = await api.delete( `/team-members/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
