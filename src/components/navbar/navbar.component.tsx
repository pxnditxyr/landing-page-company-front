import { ReactNode } from 'react'

import { useMenu } from '../../hooks'
import { BurgerIcon, XIcon } from '../../icons'
import { NavbarProvider } from './store'

interface INavbarProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  iconClassName?: string
}

export const Navbar = ( { children, className = '', style, iconClassName = '' } : INavbarProps ) => {

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
        <div className={ `flex p-4 text-[#092635] hover:text-[#10a4ca] transition-all duration-300 ${ isOpenMenu ? 'items-start' : 'items-center' } lg:hidden ${ iconClassName }` }>
          <BurgerIcon 
            className={ `w-6 h-6 cursor-pointer ${ !isOpenMenu ? '' : 'hidden' }` }
            onClick={ toggleMenu }
          />
          <XIcon
            className={ `w-6 h-6 cursor-pointer ${ isOpenMenu ? '' : 'hidden' }` }
            onClick={ toggleMenu }
          />
        </div>
      </nav>
    </NavbarProvider>
  )
}
