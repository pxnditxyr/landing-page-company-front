import { StateCreator, create } from 'zustand'
import { ITeam } from '../../../interfaces'
import { ICreateTeamDto, TeamsService } from '../../../services'

interface ITeamsState {
  teams:     ITeam[]
  isLoading: boolean
  error?:    string

  findAll: () => Promise<void>
  create:  ( createDto : ICreateTeamDto ) => Promise<boolean>
  update:  ( id : string, updateDto : ICreateTeamDto ) => Promise<boolean>
  remove:  ( id : string ) => Promise<boolean>
  clearError: () => void
}

const teamsStore : StateCreator<ITeamsState> = ( set, get ) => ({
  teams: [],
  isLoading: false,
  error: undefined,
  findAll: async () => {
    set({ isLoading: true })
    const teams = await TeamsService.findAll()
    if ( 'error' in teams ) set({ error: teams.error })
    else set({ teams })
    set({ isLoading: false })
  },
  create: async ( createDto : ICreateTeamDto ) => {
    set({ isLoading: true })
    const team = await TeamsService.create( createDto )
    if ( 'error' in team ) {
      set({ error: team.error, isLoading: false })
      return false
    }
    set({ teams: [ ...get().teams, team ], isLoading: false })
    return true
  },
  update: async ( id : string, updateDto : ICreateTeamDto ) => {
    set({ isLoading: true })
    const team = await TeamsService.update( id, updateDto )
    if ( 'error' in team ) {
      set({ error: team.error, isLoading: false })
      return false
    }
    set({ teams: get().teams.map( u => u.id === id ? team : u ), isLoading: false })
    return true
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const team = await TeamsService.remove( id )
    if ( 'error' in team ) {
      set({ error: team.error, isLoading: false })
      return false
    }
    set({ teams: get().teams.filter( u => u.id !== id ), isLoading: false })
    return true
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useTeamsStore = create( teamsStore )
