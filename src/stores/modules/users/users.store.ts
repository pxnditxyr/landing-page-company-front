import { StateCreator, create } from 'zustand'
import { IUser } from '../../../interfaces'
import { ICreateUserDto, UsersService } from '../../../services'

interface IUsersState {
  users:     IUser[]
  isLoading: boolean
  error?:    string

  findAll: () => Promise<void>
  create:  ( createDto : ICreateUserDto ) => Promise<boolean>
  update:  ( id : string, updateDto : ICreateUserDto ) => Promise<boolean>
  remove:  ( id : string ) => Promise<boolean>
  clearError: () => void
}

const usersStore : StateCreator<IUsersState> = ( set, get ) => ({
  users: [],
  user: undefined,
  isLoading: false,
  error: undefined,
  findAll: async () => {
    set({ isLoading: true })
    const users = await UsersService.findAll()
    if ( 'error' in users ) set({ error: users.error })
    else set({ users })
    set({ isLoading: false })
  },
  create: async ( createDto : ICreateUserDto ) => {
    set({ isLoading: true })
    const user = await UsersService.create( createDto )
    if ( 'error' in user ) {
      set({ error: user.error, isLoading: false })
      return false
    }
    set({ users: [ ...get().users, user ], isLoading: false })
    return true
  },
  update: async ( id : string, updateDto : ICreateUserDto ) => {
    set({ isLoading: true })
    const user = await UsersService.update( id, updateDto )
    if ( 'error' in user ) {
      set({ error: user.error, isLoading: false })
      return false
    }
    set({ users: get().users.map( u => u.id === id ? user : u ), isLoading: false })
    return true
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const user = await UsersService.remove( id )
    if ( 'error' in user ) {
      set({ error: user.error, isLoading: false })
      return false
    }
    set({ users: get().users.filter( u => u.id !== id ), isLoading: false })
    return true
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useUsersStore = create( usersStore )
