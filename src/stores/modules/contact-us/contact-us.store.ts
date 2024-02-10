import { StateCreator, create } from 'zustand'
import { IContactUs } from '../../../interfaces'
import { ICreateContactUsDto, ContactUsService } from '../../../services'

interface IContactUsState {
  contactUs: IContactUs[]
  isLoading: boolean
  error?:    string

  findAll: () => Promise<void>
  create:  ( createDto : ICreateContactUsDto ) => Promise<boolean>
  update:  ( id : string, updateDto : ICreateContactUsDto ) => Promise<boolean>
  remove:  ( id : string ) => Promise<boolean>
  clearError: () => void
}

const contactUsStore : StateCreator<IContactUsState> = ( set, get ) => ({
  contactUs: [],
  isLoading: false,
  error: undefined,
  findAll: async () => {
    set({ isLoading: true })
    const contactUs = await ContactUsService.findAll()
    if ( 'error' in contactUs ) set({ error: contactUs.error })
    else set({ contactUs })
    set({ isLoading: false })
  },
  create: async ( createDto : ICreateContactUsDto ) => {
    set({ isLoading: true })
    const contact = await ContactUsService.create( createDto )
    if ( 'error' in contact ) {
      set({ error: contact.error, isLoading: false })
      return false
    }
    set({ contactUs: [ ...get().contactUs, contact ], isLoading: false })
    return true
  },
  update: async ( id : string, updateDto : ICreateContactUsDto ) => {
    set({ isLoading: true })
    const contact = await ContactUsService.update( id, updateDto )
    if ( 'error' in contact ) {
      set({ error: contact.error, isLoading: false })
      return false
    }
    set({ contactUs: get().contactUs.map( u => u.id === id ? contact : u ), isLoading: false })
    return true
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const contact = await ContactUsService.remove( id )
    if ( 'error' in contact ) {
      set({ error: contact.error, isLoading: false })
      return false
    }
    set({ contactUs: get().contactUs.filter( u => u.id !== id ), isLoading: false })
    return true
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useContactUsStore = create( contactUsStore )
