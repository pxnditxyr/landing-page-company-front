import { ReactNode } from 'react'

import { useMenu } from '../../hooks'
import { BurgerIcon, XIcon } from '../../icons'
import { NavbarProvider } from './store'

interface INavbarProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  iconClassName?: string
  iconStyle?: React.CSSProperties
}

export const Navbar = ( { children, className = '', style, iconClassName = '', iconStyle } : INavbarProps ) => {

  const { isOpenMenu, toggleMenu } = useMenu()

  return (
    <NavbarProvider
      value={{
        isOpenMenu,
        toggleMenu
      }}
    >
      <nav className={ `w-full flex justify-between lg:justify-start` }>
        <div
          className={ `w-full flex flex-col lg:grid lg:grid-cols-[repeat(auto-fit,minmax(100px,_auto))] lg:gap-4 ${ className }` }
          style={ style }
        >
          { children }
        </div>
        <div
          className={ `flex p-4 text-white hover:text-[#35eaca] transition-all duration-300 ${ isOpenMenu ? 'items-start' : 'items-center' } lg:hidden ${ iconClassName }` }
          style={ iconStyle }
        >
          <BurgerIcon 
            className={ `w-6 h-6 cursor-pointer ${ !isOpenMenu ? '' : 'hidden' }` }
            onClick={ toggleMenu }
            strokeWidth={ 3 }
          />
          <XIcon
            className={ `w-6 h-6 cursor-pointer ${ isOpenMenu ? '' : 'hidden' }` }
            onClick={ toggleMenu }
            strokeWidth={ 3 }
          />
        </div>
      </nav>
    </NavbarProvider>
  )
}
