import { StateCreator, create } from 'zustand'
import { IAuthUser } from '../../../interfaces'
import { AuthService, ISigninParams, ISignupParams } from '../../../services'
import { persist } from 'zustand/middleware'

type TAuthStatus = 'authenticated' | 'unauthenticated' | 'pending'

interface IAuthState {
  status: TAuthStatus
  token?: string
  user?: IAuthUser
  error?: string

  signin: ( signinParams : ISigninParams ) => void
  signup: ( signupParams : ISignupParams ) => void
  checkAuthStatus: () => void
  signout: () => void
  clearError: () => void
}

const authStore : StateCreator<IAuthState> = ( set ) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  error: undefined,

  signin: async ( signinParams ) => {
    const response = await AuthService.signin( signinParams )
    if ( 'error' in response ) {
      set({ error: response.error, status: 'unauthenticated', token: undefined, user: undefined })
      return
    }
    set({ token: response.token, user: response.user, status: 'authenticated' })
  },
  signup: async ( signupParams ) => {
    const response = await AuthService.signup( signupParams )
    if ( 'error' in response ) {
      set({ error: response.error, status: 'unauthenticated', token: undefined, user: undefined })
      return
    }
    set({ token: response.token, user: response.user, status: 'authenticated' })
  },
  checkAuthStatus: async () => {
    const response = await AuthService.checkAuthStatus()
    if ( 'error' in response ) {
      set({ error: response.error, status: 'unauthenticated', token: undefined, user: undefined })
      return
    }
    set({ token: response.token, user: response.user, status: 'authenticated' })
  },
  signout: async () => {
    set({ status: 'unauthenticated', token: undefined, user: undefined })
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useAuthStore = create<IAuthState>()(
  persist(
    authStore,
    { name: 'authStore' }
  )
)
