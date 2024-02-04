import { ReactNode, useContext } from 'react'
import { NavbarContext } from '.'

interface INavbarContentProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const NavbarContent = ( { children, className = '', style }: INavbarContentProps ) => {

  const { isOpenMenu } = useContext( NavbarContext )

  return (
    <ul
      className={ `w-full ${ isOpenMenu ? 'flex flex-col' : 'hidden' } lg:w-auto lg:flex lg:flex-row ${ className }` }
      style={ style }
    >
      { children }
    </ul>
  )
}

