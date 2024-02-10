import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CrudTable } from '../../components'
import { useContactUsStore } from '../../../../stores'
import Swal from 'sweetalert2'

export const ListContactUsPage = () => {

  const contactUs = useContactUsStore( state => state.contactUs )
  const findAllContactUs = useContactUsStore( state => state.findAll )
  const removeProject = useContactUsStore( state => state.remove )
  const isLoadingContactUs = useContactUsStore( state => state.isLoading )
  const error = useContactUsStore( state => state.error )
  const clearError = useContactUsStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
    findAllContactUs()
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
            title: 'Contacto Eliminado',
            text: 'El contacto ha sido eliminado con éxito',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
    })
  }

  if ( isLoadingContactUs ) return ( <h1> Loading... </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Lista de Contactos </h1>
      <div className="overflow-x-auto p-4 grid">
        <CrudTable
          data={ contactUs }
          columns={ [
            {
              title: 'Nombre',
              key: 'name'
            },
            {
              title: 'Correo Electrónico',
              key: 'email'
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
            viewAction: ( id ) => navigate( `/contact-us/${ btoa( id ) }` ),
            deleteAction: ( id ) => handleRemoveProject( id )
          }}
        />
      </div>
    </div>
  )
}
