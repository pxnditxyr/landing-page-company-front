import { useState } from 'react'

export const useMenu = ( initialValue : boolean = false ) => {
  const [ isOpenMenu, setIsOpenMenu ] = useState<boolean>( initialValue )
  const openMenu = () => setIsOpenMenu( true )
  const closeMenu = () => setIsOpenMenu( false )
  const toggleMenu = () => setIsOpenMenu( !isOpenMenu )

  return {
    isOpenMenu,
    openMenu,
    closeMenu,
    toggleMenu
  }
}
