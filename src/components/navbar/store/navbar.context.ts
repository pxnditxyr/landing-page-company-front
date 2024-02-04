import { createContext } from 'react'
import { INavbarContext } from '../../..'

export const NavbarContext = createContext( {} as INavbarContext )
const { Provider } = NavbarContext
export { Provider as NavbarProvider }
