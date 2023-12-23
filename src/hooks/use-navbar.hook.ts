import { useState } from 'react'

export const useNavbar = () => {

  const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>( false )

  const toggleMenu = () => {
    setIsMenuOpen( !isMenuOpen )
  }

  return {
    isMenuOpen,
    toggleMenu
  }
}
