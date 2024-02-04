
interface IAuthLayoutProps {
  children: JSX.Element | JSX.Element[]
  title: string
}

export const AuthLayout = ( { children, title }: IAuthLayoutProps ) => {
  const companyName = 'Pxndxs'
  //TODO: Create and use Navbar component
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-turquoise-blue-600">
      <div className="w-full min-h-screen rounded-lg shadow-lg bg-turquoise-blue-50 flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="w-full flex gap-8 justify-center items-center p-10 bg-gray-900 md:w-1/2 md:min-h-screen">
          <img
            src="https://pa1.aminoapps.com/6408/d868d7c1f049a340f68331aba0b2560508ee299d_hq.gif"
            alt={ companyName }
            className="w-full mx-auto rounded-lg shadow-lg md:w-full"
          />
        </div>
        <div className="w-full flex items-center justify-center md:w-1/2 mb-8">
          <div className="flex flex-col items-center justify-center gap-8 md:w-96">
            <h1 className="text-4xl font-bold text-center md:text-5xl md:max-w-96">
              Bienvenido a la empresa { companyName }
            </h1>
            <h1 className="text-3xl font-bold text-center">
              { title }
            </h1>
            { children }
          </div>
        </div>
      </div>
    </div>
  )
}

