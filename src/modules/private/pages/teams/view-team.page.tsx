import { useNavigate, useParams } from 'react-router-dom'
import { useTeamsStore } from '../../../../stores'
import { useEffect } from 'react'
import { DeleteButton, EditButton, LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

export const ViewTeamPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const teams = useTeamsStore( state => state.teams )
  const findAllTeams = useTeamsStore( state => state.findAll )
  const removeTeam = useTeamsStore( state => state.remove )
  const isLoadingTeams = useTeamsStore( state => state.isLoading )
  const error = useTeamsStore( state => state.error )
  const clearError = useTeamsStore( state => state.clearError )

  const navigate = useNavigate()

  const team = teams.find( team => team.id === id )

  useEffect( () => {
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

  const handleRemoveTeam = async ( id : string ) => {
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
          const isRemoved = removeTeam( id )
          if ( !isRemoved ) return
          Swal.fire({
            title: 'Equipo Eliminado!',
            text: 'El Equipo ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          navigate( '/teams' )
        }
    })
  }

  if ( isLoadingTeams ) return ( <LoadingPage /> )
  if ( !team ) return ( <h1> No Team </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Ver Equipo </h1>
      <div className="overflow-x-auto p-4">
        <article className="w-full flex flex-col-reverse md:flex-row gap-2 p-6 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8">
          <section className="flex flex-col justify-between p-2 gap-4 md:gap-0">
            <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
              <h2 className="text-3xl text-emerald-400 font-black"> { team.name } </h2>
              <h2 className="text-xl text-emerald-200 font-bold"> { team.details } </h2>
            </section>
            <section className="w-full flex flex-col">
              <div className="flex flex-col gap-2 text-lg font-bold text-white">
                <span
                  className="text-xl text-orange-300 font-bold"
                > Creado En: </span>
                { new Date( team.createdAt ).toLocaleString() }
              </div>
              <div className="flex flex-col gap-4 text-lg font-bold text-white">
                <span
                  className="text-xl text-orange-300 font-bold"
                > Actualizado En: </span>
                { new Date( team.updatedAt ).toLocaleString() }
              </div>
            </section>
            <section className="w-full flex gap-4 justify-center items-center py-6">
              <EditButton onClick={ () => navigate( '/teams/update/' + encodedId ) } />
              <DeleteButton onClick={ () => handleRemoveTeam( team.id ) } />
            </section>
          </section>
          <section className="w-full md:w-1/2 flex flex-col items-center gap-4 justify-center">
            <img
              src={ team.imageUrl }
              alt={ team.name }
              className="w-64 h-80 object-cover rounded-lg"
            />
          </section>
        </article>
      </div>
    </div>
  )
}
