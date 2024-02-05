import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CrudTable } from '../../components'
import { useTeamsStore } from '../../../../stores'
import Swal from 'sweetalert2'

export const ListTeamsPage = () => {

  const teams = useTeamsStore( state => state.teams )
  const findAllTeams = useTeamsStore( state => state.findAll )
  const removeTeam = useTeamsStore( state => state.remove )
  const isLoadingTeams = useTeamsStore( state => state.isLoading )
  const error = useTeamsStore( state => state.error )
  const clearError = useTeamsStore( state => state.clearError )
  const navigate = useNavigate()

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
        }
    })
  }

  if ( isLoadingTeams ) return ( <h1> Loading... </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Lista de Equipos </h1>
      <div className="w-full flex flex-col items-end lg:max-w-4xl">
        <button
          onClick={
            () => navigate( '/teams/create' )
          }
          className="px-4 py-3 bg-green-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
        > Crear Nuevo Equipo </button>
      </div>
      <div className="overflow-x-auto p-4 grid">
        <CrudTable
          data={ teams }
          columns={ [
            {
              title: 'Imagen',
              key: 'imageUrl',
              type: 'image'
            },
            {
              title: 'Nombre',
              key: 'name'
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
          actions={{
            viewAction: ( id ) => navigate( `/teams/${ btoa( id ) }` ),
            editAction: ( id ) => navigate( `/teams/update/${ btoa( id ) }` ),
            deleteAction: ( id ) => handleRemoveTeam( id )
          }}
        />
      </div>
    </div>
  )
}
