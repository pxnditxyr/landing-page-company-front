import { useNavigate, useParams } from 'react-router-dom'
import { useProjectsTeamsStore } from '../../../../stores'
import { useEffect } from 'react'
import { DeleteButton, LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

const containerClassName = 'flex flex-col justify-center md:justify-start md:gap-2'
const subtitleClassName = 'text-lg text-orange-300 font-bold md:text-xl'
const paragraphClassName = 'text-base text-white md:text-lg'
const articleClassName = 'w-full flex flex-col-reverse p-4 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-2 md:flex-row overflow-x-auto md:items-center md:justify-center md:w-auto'
const sectionClassName = 'w-full flex gap-2 flex-col xl:flex-row xl:gap-4 px-6 lg:px-2'

export const ViewProjectTeamsPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const projects = useProjectsTeamsStore( state => state.projectsTeam )
  const findAllProjectsTeams = useProjectsTeamsStore( state => state.findAll )
  const removeProject = useProjectsTeamsStore( state => state.remove )
  const isLoadingProjectsTeams = useProjectsTeamsStore( state => state.isLoading )
  const error = useProjectsTeamsStore( state => state.error )
  const clearError = useProjectsTeamsStore( state => state.clearError )

  const navigate = useNavigate()

  const project = projects.find( project => project.id === id )

  useEffect( () => {
    findAllProjectsTeams()
  }, [] )

  useEffect( () => {
    if ( error ) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      clearError()
    }
  }, [ error ] )

  const handleRemoveProject = async ( id : string ) => {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then( ( result ) => {
        if ( result.isDismissed ) return
        if ( result.isConfirmed ) {
          const isRemoved = removeProject( id )
          if ( !isRemoved ) return
          Swal.fire({
            title: 'La Relacion se ha Eliminado!',
            text: 'La relacion proyecto-equipo ha sido eliminada exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          navigate( '/projects-teams' )
        }
    })
  }

  if ( isLoadingProjectsTeams ) return ( <LoadingPage /> )
  if ( !project ) return ( <h1> No Project </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Ver Relacion Proyecto-Equipo </h1>
      <div className="overflow-x-auto p-4 w-full md:w-auto">
        <article className={ articleClassName }>
          <section className="flex flex-col justify-between">
            <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
              <h2 className="text-3xl text-emerald-400 font-black"> Proyecto: { project.project?.name } </h2>
              <h2 className="text-xl text-emerald-200 font-bold"> Equipo: { project.team?.name } </h2>
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
            <section className="w-full flex gap-4 justify-center items-center py-6">
              <DeleteButton onClick={ () => handleRemoveProject( project.id ) } />
            </section>
          </section>
        </article>
      </div>
    </div>
  )
}
