import { StateCreator, create } from 'zustand'
import { IProjectsTeam } from '../../../interfaces'
import { ICreateProjectsTeamsDto, ProjectsTeamsService } from '../../../services'

interface IProjectsTeamsState {
  projectsTeam:     IProjectsTeam[]
  isLoading: boolean
  error?:    string

  findAll: () => Promise<void>
  create:  ( createDto : ICreateProjectsTeamsDto ) => Promise<boolean>
  update:  ( id : string, updateDto : ICreateProjectsTeamsDto ) => Promise<boolean>
  remove:  ( id : string ) => Promise<boolean>
  clearError: () => void
}

const projectsTeamsStore : StateCreator<IProjectsTeamsState> = ( set, get ) => ({
  projectsTeam: [],
  isLoading: false,
  error: undefined,
  findAll: async () => {
    set({ isLoading: true })
    const projectsTeam = await ProjectsTeamsService.findAll()
    if ( 'error' in projectsTeam ) set({ error: projectsTeam.error })
    else set({ projectsTeam })
    set({ isLoading: false })
  },
  create: async ( createDto : ICreateProjectsTeamsDto ) => {
    set({ isLoading: true })
    const projectsTeam = await ProjectsTeamsService.create( createDto )
    if ( 'error' in projectsTeam ) {
      set({ error: projectsTeam.error, isLoading: false })
      return false
    }
    set({ projectsTeam: [ ...get().projectsTeam, projectsTeam ], isLoading: false })
    return true
  },
  update: async ( id : string, updateDto : ICreateProjectsTeamsDto ) => {
    set({ isLoading: true })
    const projectsTeam = await ProjectsTeamsService.update( id, updateDto )
    if ( 'error' in projectsTeam ) {
      set({ error: projectsTeam.error, isLoading: false })
      return false
    }
    set({ projectsTeam: get().projectsTeam.map( u => u.id === id ? projectsTeam : u ), isLoading: false })
    return true
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const project = await ProjectsTeamsService.remove( id )
    if ( 'error' in project ) {
      set({ error: project.error, isLoading: false })
      return false
    }
    set({ projectsTeam: get().projectsTeam.filter( u => u.id !== id ), isLoading: false })
    return true
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useProjectsTeamsStore = create( projectsTeamsStore )
