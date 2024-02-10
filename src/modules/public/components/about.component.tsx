import { ICompany } from '../../../interfaces'
import { MissionIcon, VisionIcon } from '../icons'

interface IAboutParallaxProps {
  company?: ICompany
}

export const AboutParallax = ( { company } : IAboutParallaxProps ) => {
  return (
    <div
        className="blank"
        id="about"
        style={{
          backgroundColor: '#020617',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='196' height='196' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23162C3B' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E")`,
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '3rem 0',
        }}
      >
        <h1 className="text-4xl text-white font-bold text-center"> Acerca de Nosotros </h1>
        <div className="w-full flex flex-col justify-center items-center px-4 py-8 mt-8 2xl:flex-row gap-8">
          <article
            className="flex flex-col justify-center gap-4 backdrop-blur-md bg-white/[0.1] p-4 rounded-lg sm:flex-row min-w-[300px] min-h-[300px] sm:min-w-[500px] sm:max-w-[600px] hover:transform hover:skew-y-[6deg] transition-all duration-300 shadow-white hover:shadow-lg"
            >
            <section className="flex gap-4 text-white items-center justify-center sm:w-1/3">
              <MissionIcon />
            </section>
            <section className="w-full flex flex-col justify-center items-center sm:w-2/3 sm:items-start overflow-ellipsis">
              <h2 className="text-xl font-bold md:font-extrabold text-pink-600"> Misión </h2>
              <p className="text-white text-pretty"> { company?.mission } </p>
            </section>
          </article>
          <article className="flex flex-col justify-center gap-4 backdrop-blur-md bg-white/[0.1] p-4 rounded-lg sm:flex-row min-w-[300px] min-h-[300px] sm:min-w-[500px] sm:max-w-[600px] hover:transform hover:skew-y-[-6deg] transition-all duration-300 shadow-white hover:shadow-lg">
            <section className="flex gap-4 text-white items-center justify-center sm:w-1/3">
              <VisionIcon />
            </section>
            <section className="w-full flex flex-col justify-center items-center sm:w-2/3 sm:items-start overflow-ellipsis">
              <h2 className="text-xl font-bold md:font-extrabold text-pink-600"> Visión </h2>
              <p className="text-white text-pretty"> { company?.vision } </p>
            </section>
          </article>
        </div>
      </div>
  )
}
