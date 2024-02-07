import { StateCreator, create } from 'zustand'
import { ITeamMember } from '../../../interfaces'
import { ICreateTeamMemberDto, TeamMembersService } from '../../../services'

interface ITeamMembersState {
  teamMembers: ITeamMember[]
  isLoading: boolean
  error?:    string

  findAll: () => Promise<void>
  create:  ( createDto : ICreateTeamMemberDto ) => Promise<boolean>
  update:  ( id : string, updateDto : ICreateTeamMemberDto ) => Promise<boolean>
  remove:  ( id : string ) => Promise<boolean>
  clearError: () => void
}

const teamMembersStore : StateCreator<ITeamMembersState> = ( set, get ) => ({
  teamMembers: [],
  isLoading: false,
  error: undefined,
  findAll: async () => {
    set({ isLoading: true })
    const teamMembers = await TeamMembersService.findAll()
    if ( 'error' in teamMembers ) set({ error: teamMembers.error })
    else set({ teamMembers })
    set({ isLoading: false })
  },
  create: async ( createDto : ICreateTeamMemberDto ) => {
    set({ isLoading: true })
    const teamMember = await TeamMembersService.create( createDto )
    if ( 'error' in teamMember ) {
      set({ error: teamMember.error, isLoading: false })
      return false
    }
    set({ teamMembers: [ ...get().teamMembers, teamMember ], isLoading: false })
    return true
  },
  update: async ( id : string, updateDto : ICreateTeamMemberDto ) => {
    set({ isLoading: true })
    const team = await TeamMembersService.update( id, updateDto )
    if ( 'error' in team ) {
      set({ error: team.error, isLoading: false })
      return false
    }
    set({ teamMembers: get().teamMembers.map( u => u.id === id ? team : u ), isLoading: false })
    return true
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const team = await TeamMembersService.remove( id )
    if ( 'error' in team ) {
      set({ error: team.error, isLoading: false })
      return false
    }
    set({ teamMembers: get().teamMembers.filter( u => u.id !== id ), isLoading: false })
    return true
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useTeamMembersStore = create( teamMembersStore )
