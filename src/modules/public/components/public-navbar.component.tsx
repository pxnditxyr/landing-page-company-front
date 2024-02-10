import { Link } from "react-router-dom"
import { Header, LoadingPage, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "../../../components"
import { useCompaniesStore } from "../../../stores"
import { useEffect } from "react"

export const PublicNavbar = () => {

  const company = useCompaniesStore( state => state.company )
  const findFirst = useCompaniesStore( state => state.findFirst )
  const isLoading = useCompaniesStore( state => state.isLoading )

  useEffect( () => {
    findFirst()
  }, [] )

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <Header className="w-full backdrop-blur-[2.5px] bg-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
    <Navbar iconStyle={{
        color: '#1f2937'
      }}>
      <NavbarBrand>
        <NavbarItem>
          <Link to="/" className="font-bold text-cyan-800 hover:underline transition-all duration-300"> { company?.name } </Link>
        </NavbarItem>
      </NavbarBrand>
      <NavbarContent className="w-full justify-center">
        <NavbarItem>
          <a href="/#about" className="font-bold text-cyan-800 hover:text-[#35eaca] transition-all duration-300"> Acerca de </a>
        </NavbarItem>
        <NavbarItem>
          <a href="/#projects" className="font-bold text-cyan-800 hover:text-[#35eaca]  transition-all duration-300"> Proyectos </a>
        </NavbarItem>
        <NavbarItem>
          <a href="/#contact" className="font-bold text-cyan-800 hover:text-[#35eaca]  transition-all duration-300"> Contactanos </a>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="justify-end">
        <NavbarItem>
          <Link to="/auth/signin" className="font-bold text-cyan-800 hover:text-[#35eaca]  transition-all duration-300 py-4"> Iniciar Sesión </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  </Header>
  )
}
