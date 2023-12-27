import { StateCreator, create } from 'zustand'
import { IUser } from '../../../interfaces'
import { ICreateUser, UsersService } from '../../../services'

interface IUsersState {
  users:     IUser[]
  user?:     IUser
  isLoading: boolean
  error?:    string

  findAll: () => void
  findOne: ( id : string ) => void
  create:  ( createDto : ICreateUser ) => void
  update:  ( id : string, updateDto : ICreateUser ) => void
  remove:  ( id : string ) => void
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
  findOne: async ( id : string ) => {
    set({ isLoading: true })
    const user = await UsersService.findOne( id )
    if ( 'error' in user ) set({ error: user.error })
    else set({ user })
    set({ isLoading: false })
  },
  create: async ( createDto : ICreateUser ) => {
    set({ isLoading: true })
    const user = await UsersService.create( createDto )
    if ( 'error' in user ) set({ error: user.error })
    else set({ users: [ ...get().users, user ] })
    set({ isLoading: false })
  },
  update: async ( id : string, updateDto : ICreateUser ) => {
    set({ isLoading: true })
    const user = await UsersService.update( id, updateDto )
    if ( 'error' in user ) set({ error: user.error })
    else set({ user, users: get().users.map( u => u.id === id ? user : u ) })
    set({ isLoading: false })
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const user = await UsersService.remove( id )
    if ( 'error' in user ) set({ error: user.error })
    else set({ users: get().users.filter( u => u.id !== id ) })
    set({ isLoading: false })
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useUsersStore = create( usersStore )
