import { ReactNode, useContext } from 'react'
import { NavbarContext } from '.'

interface INavbarBrandProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const NavbarBrand = ( { children, className = '', style }: INavbarBrandProps ) => {

  const { isOpenMenu } = useContext( NavbarContext )

  return (
    <div
      className={ `w-full flex items-center p-4 ${ isOpenMenu ? 'justify-center' : '' } lg:justify-start ${ className }` }
      style={ style }
    >
      { children }
    </div>
  )
}
