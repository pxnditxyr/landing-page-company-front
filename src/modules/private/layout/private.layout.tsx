import { Link, useNavigate } from 'react-router-dom'
import { BackButton, Header, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '../../../components'
import { useAuthStore } from '../../../stores'

interface IProps {
  children: React.ReactNode
}

export const PrivateLayout = ( { children } : IProps ) => {

  const signout = useAuthStore( state => state.signout )
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-r from-green-300 to-purple-400"
      style={{
        backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c2e9d59-ee54-490e-bf96-5497f587844f/dgdphrq-d64af06c-c427-48ec-9ebc-825b28e6a967.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzljMmU5ZDU5LWVlNTQtNDkwZS1iZjk2LTU0OTdmNTg3ODQ0ZlwvZGdkcGhycS1kNjRhZjA2Yy1jNDI3LTQ4ZWMtOWViYy04MjViMjhlNmE5NjcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7svM8-utQwpkZLqP18qwvhxr7PRUa2lJaZsLFvb5UKI)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header className="w-full backdrop-blur-[2.5px] bg-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <Navbar>
          <NavbarBrand>
            <NavbarItem>
              <Link to="/my-company" className="font-bold text-white hover:text-[#35eaca] transition-all duration-300"> Mi Empresa </Link>
            </NavbarItem>
          </NavbarBrand>
          <NavbarContent className="justify-center">
            <NavbarItem>
              <Link to="/users" className="font-bold text-white hover:text-[#35eaca] transition-all duration-300"> Users </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/projects" className="font-bold text-white hover:text-[#35eaca] transition-all duration-300"> Projects </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/teams" className="font-bold text-white hover:text-[#35eaca] transition-all duration-300"> Teams </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/projects-teams" className="font-bold text-white hover:text-[#35eaca] transition-all duration-300"> Projects Teams </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/team-members" className="font-bold text-white hover:text-[#35eaca] transition-all duration-300"> Team Members </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent className="justify-end">
            <NavbarItem>
              <Link to="/contact-us" className="font-bold text-white hover:text-[#35eaca] transition-all duration-300"> Contact Us </Link>
            </NavbarItem>
            <NavbarItem>
              <button
                onClick={ signout }
                className="w-1/2 text-sm font-semibold py-4 text-rose-600 hover:text-red-500 transition-all duration-300 lg:py-0"
              > Cerrar sesión </button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </Header>
      <div className="w-full mt-6 max-w-6xl px-6 md:px-16">
        <BackButton onGoBack={ () => navigate( -1 ) } />
      </div>
      <div className="w-full flex flex-col items-center px-8 py-2">
        { children }
      </div>
    </div> 
  )
}
