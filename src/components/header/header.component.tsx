import { ReactNode } from 'react'

interface IHeaderProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Header = ( { children, className = '', style }: IHeaderProps ) => {
  return (
    <header
      className={ `w-full flex items-center relative ${ className }` }
      style={ style }
    >
      { children }
    </header>
  )
}

