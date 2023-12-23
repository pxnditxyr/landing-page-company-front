
interface IProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const PublicNavbar = ( { isMenuOpen, toggleMenu }: IProps ) => {
  return (
    <nav className={ `fixed w-full p-4 opacity-60 bg-white flex justify-between items-center gap-4 md:flex-row md:h-20 ${ isMenuOpen ? "flex-col" : "flex-row h-20" }` }>
      <ul className="flex justify-center items-center h-full">
        <li className="mx-2">
          <a href="#home-content" className="" > Company Name </a>
        </li>
      </ul>
      <ul className={ `${ isMenuOpen ? "flex flex-col gap-4" : "hidden" } md:flex md:flex-row md:gap-4` }>
        <li className="mx-2">
          <a href="#home-content" className="" > Home </a>
        </li>
        <li className="mx-2">
          <a href="#about-content"> About </a>
        </li>
        <li className="mx-2">
          <a href="#contact-content"> Contact </a>
        </li>
      </ul>
      <ul className={ `${ isMenuOpen ? "flex flex-col gap-4" : "hidden" } md:flex md:flex-row md:gap-4` }>
        <li className="mx-2">
          <a href="/auth/signin"> Sign In </a>
        </li>
      </ul>
      <div
        id="burger-menu"
        className={ `flex justify-center items-center ${ isMenuOpen ? "fixed top-4 right-4" : "" } md:hidden` }
        onClick={ toggleMenu }
      >
        {
          isMenuOpen
            ? (
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12
                  13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            )
            : (
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                />
              </svg>
            )
        }
      </div>
    </nav>
  )
}
