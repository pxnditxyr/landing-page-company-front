import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CrudTable } from '../../components'
import { useTeamsStore } from '../../../../stores'
import Swal from 'sweetalert2'

export const SelectTeamsPage = () => {

  const teams = useTeamsStore( state => state.teams )
  const findAllTeams = useTeamsStore( state => state.findAll )
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

  if ( isLoadingTeams ) return ( <h1> Loading... </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Seleccionar Equipo </h1>
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
          ] }
          actions={{
            selectAction: ( id ) => navigate( `/team-members/create/${ btoa( id ) }` ),
          }}
          selectableRows
        />
      </div>
    </div>
  )
}
