import { StateCreator, create } from 'zustand'
import { IProject } from '../../../interfaces'
import { ICreateProjectDto, ProjectsService } from '../../../services'

interface IProjectsState {
  projects:     IProject[]
  isLoading: boolean
  error?:    string

  findAll: () => Promise<void>
  create:  ( createDto : ICreateProjectDto ) => Promise<boolean>
  update:  ( id : string, updateDto : ICreateProjectDto ) => Promise<boolean>
  remove:  ( id : string ) => Promise<boolean>
  clearError: () => void
}

const projectsStore : StateCreator<IProjectsState> = ( set, get ) => ({
  projects: [],
  project: undefined,
  isLoading: false,
  error: undefined,
  findAll: async () => {
    set({ isLoading: true })
    const projects = await ProjectsService.findAll()
    if ( 'error' in projects ) set({ error: projects.error })
    else set({ projects })
    set({ isLoading: false })
  },
  create: async ( createDto : ICreateProjectDto ) => {
    set({ isLoading: true })
    const project = await ProjectsService.create( createDto )
    if ( 'error' in project ) {
      set({ error: project.error, isLoading: false })
      return false
    }
    set({ projects: [ ...get().projects, project ], isLoading: false })
    return true
  },
  update: async ( id : string, updateDto : ICreateProjectDto ) => {
    set({ isLoading: true })
    const project = await ProjectsService.update( id, updateDto )
    if ( 'error' in project ) {
      set({ error: project.error, isLoading: false })
      return false
    }
    set({ projects: get().projects.map( u => u.id === id ? project : u ), isLoading: false })
    return true
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const project = await ProjectsService.remove( id )
    if ( 'error' in project ) {
      set({ error: project.error, isLoading: false })
      return false
    }
    set({ projects: get().projects.filter( u => u.id !== id ), isLoading: false })
    return true
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useProjectsStore = create( projectsStore )
