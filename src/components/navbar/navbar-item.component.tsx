import { ReactNode } from 'react'

interface INavbarItemProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const NavbarItem = ( { children, className = '', style }: INavbarItemProps ) => {

  return (
    <li
      className={ `flex items-center justify-center px-4 py-2 text-[#092635] hover:text-[#38eaca] transition-all duration-300 text-center ${ className }` }
      style={ style }
    >
      { children }
    </li>
  )
}

