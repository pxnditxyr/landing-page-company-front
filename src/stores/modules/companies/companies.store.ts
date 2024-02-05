import { StateCreator, create } from 'zustand'
import { ICompany } from '../../../interfaces'
import { ICreateCompanyDto, CompaniesService } from '../../../services'

interface ICompaniesState {
  company?: ICompany
  isLoading: boolean
  error?:    string

  findFirst: () => Promise<void>
  create:  ( createDto : ICreateCompanyDto ) => Promise<boolean>
  update:  ( id : string, updateDto : ICreateCompanyDto ) => Promise<boolean>
  remove:  ( id : string ) => Promise<boolean>
  clearError: () => void
}

const companiesStore : StateCreator<ICompaniesState> = ( set ) => ({
  company: undefined,
  isLoading: false,
  error: undefined,
  findFirst: async () => {
    set({ isLoading: true })
    const company = await CompaniesService.findFirst()
    if ( 'error' in company ) {
      set({ error: company.error, isLoading: false })
      return
    }
    set({ company, isLoading: false })
  },
  create: async ( createDto : ICreateCompanyDto ) => {
    set({ isLoading: true })
    const company = await CompaniesService.create( createDto )
    if ( 'error' in company ) {
      set({ error: company.error, isLoading: false })
      return false
    }
    set({ company: company, isLoading: false })
    return true
  },
  update: async ( id : string, updateDto : ICreateCompanyDto ) => {
    set({ isLoading: true })
    const company = await CompaniesService.update( id, updateDto )
    if ( 'error' in company ) {
      set({ error: company.error, isLoading: false })
      return false
    }
    set({ company: company, isLoading: false })
    return true
  },
  remove: async ( id : string ) => {
    set({ isLoading: true })
    const company = await CompaniesService.remove( id )
    if ( 'error' in company ) {
      set({ error: company.error, isLoading: false })
      return false
    }
    set({ company: undefined, isLoading: false })
    return true
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useCompaniesStore = create( companiesStore )
