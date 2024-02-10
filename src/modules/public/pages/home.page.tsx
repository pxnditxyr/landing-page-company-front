import { useEffect } from 'react'
import { useCompaniesStore } from '../../../stores'
import { AboutParallax, ContactUs, Footer, ProjectsParallax, PublicNavbar } from '../components'

import { CompanyLogo } from '../../../icons'

import './home.styles.css'

export const HomePage = () => {

  const company = useCompaniesStore( state => state.company )
  const findFirst = useCompaniesStore( state => state.findFirst )
  
  useEffect( () => {
    findFirst()
  }, [] )

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="home-container" id="home"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          gap: '1rem',
          width: '100% !important',
        }}
      >
        <PublicNavbar />
        <div className="w-full flex flex-col justify-center items-center gap-8 py-4 mt-8">
          <h1 className="home-title"> { company?.name } </h1>
          <div>
            <CompanyLogo
              width={ 150 }
              height={ 150 }
            />
          </div>
          <p className="text-pretty text-center w-full px-4 sm:w-96 text-xl"> { company?.details } </p>
          <a className="px-6 py-4 bg-slate-900 text-white text-md font-semibold rounded-lg shadow-lg" href="#"> Ver más </a>
        </div>
      </div>

      <AboutParallax company={ company } />
      <ProjectsParallax />
      <ContactUs />
      <Footer />
    </div>
  )
}
