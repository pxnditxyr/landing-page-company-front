
interface IAuthLayoutProps {
  children: JSX.Element | JSX.Element[]
  title: string
}

export const AuthLayout = ( { children, title }: IAuthLayoutProps ) => {
  const companyName = 'Pxndxs'
  //TODO: Create and use Navbar component
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-turquoise-blue-600 p-8 gap-8">
      <div className="min-h-96 rounded-lg shadow-lg p-10 bg-turquoise-blue-50 flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-8 w-full justify-center items-center md:w-96">
          <h1 className="text-4xl font-bold text-center md:text-5xl">
            Bienvenido a la empresa { companyName }
          </h1>
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            alt={ companyName }
            className="w-80 mx-auto rounded-lg shadow-lg md:w-96"
          />
        </div>
        <div className="flex flex-col gap-8 w-full md:w-auto md:min-w-96">
          <h1 className="text-3xl font-bold text-center">
            { title }
          </h1>
          { children }
        </div>
      </div>
    </div>
  )
}

