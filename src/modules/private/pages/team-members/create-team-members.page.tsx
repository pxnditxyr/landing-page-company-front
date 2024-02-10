import { FormEvent, useEffect } from 'react'
import { useTeamMembersStore, useTeamsStore, useUsersStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const CreateTeamMembersPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  let id = ''
  try {
    id = atob( encodedId )
  } catch ( error ) {
    console.error( error )
  }

  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const isLoadingUsers = useUsersStore( state => state.isLoading )
  const errorUsers = useUsersStore( state => state.error )

  const teams = useTeamsStore( state => state.teams )
  const findAllTeams = useTeamsStore( state => state.findAll )
  const isLoadingTeams = useTeamsStore( state => state.isLoading )
  const errorTeams = useTeamsStore( state => state.error )
  const activeTeam = teams.find( team => team.id === id )

  const teamMembers = useTeamMembersStore( state => state.teamMembers )
  const findAllTeamMembers = useTeamMembersStore( state => state.findAll )
  const create = useTeamMembersStore( state => state.create )
  const isLoading = useTeamMembersStore( state => state.isLoading )
  const error = useTeamMembersStore( state => state.error )
  const clearError = useTeamMembersStore( state => state.clearError )

  const isUserInTeam = ( userId : string ) : boolean => {
    const teamRelationWithTeamMembers = teamMembers.filter( teamMember => teamMember.teamId === id )
    const userRelationWithTeamMembers = teamRelationWithTeamMembers.find( teamMember => teamMember.userId === userId )
    if ( userRelationWithTeamMembers ) return true
    return false
  }

  const navigate = useNavigate()

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { userId } = event.target as HTMLFormElement

    const isCreated = await create({
      teamId: id,
      userId: userId.value,
    })

    if ( !isCreated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'La relación ha sido creada exitosamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    navigate( -1 )
  }

  useEffect( () => {
    findAllUsers()
    findAllTeams()
    findAllTeamMembers()
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
    if ( errorUsers ) {
      Swal.fire({
        title: 'Error!',
        text: errorUsers,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      clearError()
    }
  }, [ errorUsers ] )

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


  if ( isLoading || isLoadingUsers || isLoadingTeams ) return ( <LoadingPage /> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1
          className="text-4xl font-bold text-[#092635] text-center"
        > Crear Nueva Relación Equipo - Usuario </h1>
        {
          <div className="flex flex-col gap-8 items-center">
            <h2
              className="text-2xl font-bold text-[#092635] text-center"
            > Equipo: 
              <span className="text-rose-700"> { activeTeam?.name } </span>
            </h2>
              <form
                className="w-full flex flex-col gap-8 items-center"
                onSubmit={ onSubmit }
              >
                <div className={ containerClass }>
                  <select 
                    id="userId"
                    name="userId"
                    className={ inputClass }
                  >
                    {
                      users
                      // if select team has this user dont show it
                      .filter( user => !isUserInTeam( user.id ) )
                        .map( project => (
                          <option
                            key={ project.id }
                            value={ project.id }
                          > { project.name } </option>
                        ) )
                    }
                    {
                      ( users
                        .filter( user => !isUserInTeam( user.id ) )
                        .length === 0 ) && (
                          <option value=""> Ningún Usuario Disponible </option>
                        )
                    }
                  </select> 
                </div>
                <div className="flex flex-row justify-center items-center gap-6 p-4">
                  <button
                    type="submit"
                    className="w-60 px-6 py-2 rounded-full shadow-2xl bg-[#092635] text-white text-lg font-bold hover:bg-slate-900 transition-all disabled:opacity-50"
                    disabled={ users.filter( user => !isUserInTeam( user.id ) ).length === 0 }
                  > Crear Relación  </button>
                </div>
              </form>
          </div>
        }

      </div>
    </div>
  )
}
