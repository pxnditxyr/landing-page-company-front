import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CrudTable } from '../../components'
import { useTeamMembersStore } from '../../../../stores'
import Swal from 'sweetalert2'

export const ListTeamMembersPage = () => {

  const teamMembers = useTeamMembersStore( state => state.teamMembers )
  const findAllTeamMembers = useTeamMembersStore( state => state.findAll )
  const removeProject = useTeamMembersStore( state => state.remove )
  const isLoadingTeamMembers = useTeamMembersStore( state => state.isLoading )
  const error = useTeamMembersStore( state => state.error )
  const clearError = useTeamMembersStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
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
            title: 'Proyecto Eliminado!',
            text: 'El proyecto ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
    })
  }

  if ( isLoadingTeamMembers ) return ( <h1> Loading... </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Lista de Relaciones Equipo - Usuario </h1>
      <div className="w-full flex flex-col items-end lg:max-w-4xl">
        <button
          onClick={ () => navigate( '/team-members/create' ) }
          className="px-4 py-3 bg-green-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
        > Crear Relación </button>
      </div>
      <div className="overflow-x-auto p-4 grid">
        <CrudTable
          data={ 
            teamMembers.map( ( teamMember ) => ({
              ...teamMember,
              teamName: teamMember.team?.name,
              userName: teamMember.user?.name,
            }) )
          }
          columns={ [
            {
              title: 'Usuario',
              key: 'userName'
            },
            {
              title: 'Equipo',
              key: 'teamName'
            },
            {
              title: 'Creado En',
              key: 'createdAt',
              type: 'datetime'
            },
            {
              title: 'Actualizado En',
              key: 'updatedAt',
              type: 'datetime'
            },
            {
              title: 'Acciones',
              key: 'actions'
            },
          ] }
          enabledActions={{
            view: true,
            delete: true
          }}
          actions={{
            viewAction: ( id ) => navigate( `/team-members/${ btoa( id ) }` ),
            deleteAction: ( id ) => handleRemoveProject( id )
          }}
        />
      </div>
    </div>
  )
}
