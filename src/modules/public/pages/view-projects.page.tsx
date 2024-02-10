import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProjectsStore, useProjectsTeamsStore } from '../../../stores'
import { LoadingPage } from '../../../components'
import { PublicNavbar } from '../components'

const containerClassName = 'flex flex-col justify-center md:justify-start md:gap-2'
const subtitleClassName = 'text-lg text-orange-300 text-pretty font-bold md:text-xl'
const paragraphClassName = 'text-base text-white text-pretty px-4 md:text-lg'
const articleClassName = 'w-[300px] flex flex-col-reverse p-4 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg md:flex-row md:items-center md:justify-center sm:w-auto max-w-[600px]'
const sectionClassName = 'w-full flex gap-2 flex-col xl:flex-row xl:gap-4 px-6 lg:px-2'

export const ViewProjectPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const projects = useProjectsStore( state => state.projects )
  const findAllProjects = useProjectsStore( state => state.findAll )
  const isLoadingProjects = useProjectsStore( state => state.isLoading )
  const project = projects.find( project => project.id === id )

  const projectsTeams = useProjectsTeamsStore( state => state.projectsTeam )
  const findAllProjectsTeams = useProjectsTeamsStore( state => state.findAll )
  const isLoadingProjectsTeams = useProjectsTeamsStore( state => state.isLoading )
  const team = projectsTeams.find( projectTeam => projectTeam.projectId === project?.id )
  
  useEffect( () => {
    findAllProjects()
    findAllProjectsTeams()
  }, [] )

  if ( isLoadingProjects || isLoadingProjectsTeams ) return ( <LoadingPage /> )
  if ( !project ) return ( <h1> No Project </h1> )

  return (
    <div 
      id="home"
      className="text-center text-slate-900 min-h-screen flex flex-col justify-start gap-6 items-center w-full overflow-x-hidden"
      style={{
      backgroundImage: `url(${ project.imageUrl })`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
        }}
    >
      <PublicNavbar />
      <div className="px-4 sm:px-8 md:px-24">
        <h1
          className="text-md lg:text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
        > { project.name } </h1>
        <div
          className="w-full flex flex-col items-center gap-4 p-4"
        >
          <article className={ articleClassName }>
            <section className="flex flex-col justify-between w-full">
              <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
                <h2 className="text-3xl text-emerald-400 font-black text-pretty w-full"> Proyecto: { project.name } </h2>
                <p className="text-xl text-emerald-200 font-semibold text-pretty w-full truncate"> { project.details } </p>
              </section>
              <section className={ sectionClassName }>
                <div className={ containerClassName }>
                  <span className={ subtitleClassName }> Creado En: </span>
                  <p className={ paragraphClassName }> { new Date( project.createdAt ).toLocaleString() } </p>
                </div>
                <div className={ containerClassName }>
                  <span className={ subtitleClassName }> Actualizado En: </span>
                  <p className={ paragraphClassName }> { new Date( project.updatedAt ).toLocaleString() } </p>
                </div>
              </section>
              <section className={ sectionClassName }>
                <div className={ containerClassName }>
                  <span className={ subtitleClassName }> Informacion Adicional </span>
                  <p className={ paragraphClassName }> { project.info } </p>
                </div>
                <div className={ containerClassName }>
                  <span className={ subtitleClassName }> Realizado Por: </span>
                  <p className={ paragraphClassName }>
                    <Link to={ `/team/${ btoa( String( team?.teamId ) ) }` } className="text-[#35eaca] text-lg hover:underline transition-all duration-300"> { team?.team?.name } </Link>
                  </p>
                </div>
              </section>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}
