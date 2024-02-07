import { FormEvent, useEffect } from 'react'
import { useProjectsStore, useProjectsTeamsStore, useTeamsStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const CreateProjectTeamsPage = () => {

  const projects = useProjectsStore( state => state.projects )
  const findAllProjects = useProjectsStore( state => state.findAll )
  const isLoadingProjects = useProjectsStore( state => state.isLoading )
  const errorProjects = useProjectsStore( state => state.error )

  const teams = useTeamsStore( state => state.teams )
  const findAllTeams = useTeamsStore( state => state.findAll )
  const isLoadingTeams = useTeamsStore( state => state.isLoading )
  const errorTeams = useTeamsStore( state => state.error )

  const create = useProjectsTeamsStore( state => state.create )
  const isLoading = useProjectsTeamsStore( state => state.isLoading )
  const error = useProjectsTeamsStore( state => state.error )
  const clearError = useProjectsTeamsStore( state => state.clearError )

  const navigate = useNavigate()

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { projectId, teamId } = event.target as HTMLFormElement

    const isCreated = await create({
      projectId: projectId.value,
      teamId: teamId.value
    })
    if ( !isCreated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'La relación proyecto-equipo ha sido creada exitosamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    navigate( '/projects-teams', { replace: true } )
  }

  useEffect( () => {
    findAllProjects()
    findAllTeams()
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

  useEffect( () => {
    if ( errorProjects ) {
      Swal.fire({
        title: 'Error!',
        text: errorProjects,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      clearError()
    }
  }, [ errorProjects ] )

  useEffect( () => {
    if ( errorTeams ) {
      Swal.fire({
        title: 'Error!',
        text: errorTeams,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      clearError()
    }
  }, [ errorTeams ] )


  if ( isLoading || isLoadingProjects || isLoadingTeams ) return ( <LoadingPage /> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1
          className="text-4xl font-bold text-[#092635] text-center"
        > Crear Nueva Relación Proyecto-Equipo </h1>
        <form
          className="w-full flex flex-col gap-8 items-center"
          onSubmit={ onSubmit }
        >
          <div className={ containerClass }>
            <select 
              id="projectId"
              name="projectId"
              className={ inputClass }
              disabled={ ( projects.filter( p => p.projectsTeams?.length === 0 ).length === 0 ) }
            >
              {
                projects
                  .filter( p => p.projectsTeams?.length === 0 )
                  .map( project => (
                    <option
                      key={ project.id }
                      value={ project.id }
                    > { project.name } </option>
                  ) )
              }
              {
                ( projects.filter( p => p.projectsTeams?.length === 0 ).length === 0 ) && (
                  <option value=""> No hay proyectos disponibles </option>
                )
              }
            </select>
            <select
              id="teamId"
              name="teamId"
              className={ inputClass }
            >
              {
                teams.map( team => (
                  <option
                    key={ team.id }
                    value={ team.id }
                  > { team.name } </option>
                ))
              }
            </select>
          </div>
          <div className="flex flex-row justify-center items-center gap-6 p-4">
            <button
              type="submit"
              className="w-60 px-6 py-2 rounded-full shadow-2xl bg-[#092635] text-white text-lg font-bold hover:bg-slate-900 transition-all disabled:opacity-50"
              disabled={ ( projects.filter( p => p.projectsTeams?.length === 0 ).length === 0 ) }
            > Crear Relación  </button>
          </div>
        </form>
      </div>
    </div>
  )
}
