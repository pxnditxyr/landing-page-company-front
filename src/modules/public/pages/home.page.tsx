import { PublicNavbar } from '../components'
import { useNavbar } from '../../../hooks'

export const HomePage = () => {

  const { isMenuOpen, toggleMenu } = useNavbar()

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(5, 194, 213) 0%, rgb(164, 248, 253) 50%)",
      }}
    >
      <PublicNavbar isMenuOpen={ isMenuOpen } toggleMenu={ toggleMenu } />
      <div className={ `h-screen py-20 flex flex-col items-center ${ isMenuOpen ? 'py-60' : '' }` } id="home-content">
        <div className="flex flex-col items-center py-4">
          <h1> Home </h1>
        </div>
      </div>
      <div className={ `h-screen py-20 flex flex-col items-center ${ isMenuOpen ? 'py-60' : '' }` } id="about-content">
        <h1> About </h1>
      </div>
      <div className={ `h-screen py-20 flex flex-col items-center ${ isMenuOpen ? 'py-60' : '' }` } id="contact-content">
        <h1> Contact </h1>
      </div>
    </div>
  )
}
