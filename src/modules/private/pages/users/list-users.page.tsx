import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CrudTable } from '../../components/crud-table/crud-table.component'
import { useAuthStore, useUsersStore } from '../../../../stores'
import Swal from 'sweetalert2'

export const ListUsersPage = () => {

  const currentUser = useAuthStore( state => state.user )
  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const removeUser = useUsersStore( state => state.remove )
  const isLoadingUsers = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
    findAllUsers()
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

  const handleRemoveUser = async ( id : string ) => {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then( ( result ) => {
        if ( result.isDismissed ) return
        if ( currentUser?.id === id ) {
          Swal.fire({
            title: 'Error!',
            text: 'No puedes eliminar tu propio usuario',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          return
        }
        if ( result.isConfirmed ) {
          const isRemoved = removeUser( id )
          if ( !isRemoved ) return
          Swal.fire({
            title: 'Usuario Eliminado!',
            text: 'El usuario ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
    })
  }

  if ( isLoadingUsers ) return ( <h1> Loading... </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Lista de Usuarios </h1>
      <div className="w-full flex flex-col items-end lg:max-w-4xl">
        <button
          onClick={
            () => navigate( '/users/create' )
          }
          className="px-4 py-3 bg-green-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
        > Crear Usuario </button>
      </div>
      <div className="overflow-x-auto p-4 grid">
        <CrudTable
          data={[
            ...users.map( user => ( {
              ...user,
              status: true
            } ) )
          ]}
          columns={ [
            {
              title: 'Nombre',
              key: 'name'
            },
            {
              title: 'Correo',
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
              title: 'Genero',
              key: 'gender'
            },
            {
              title: 'Acciones',
              key: 'actions'
            },
          ] }
          actions={{
            viewAction: ( id ) => navigate( `/users/${ btoa( id ) }` ),
            editAction: ( id ) => navigate( `/users/update/${ btoa( id ) }` ),
            deleteAction: ( id ) => handleRemoveUser( id )
          }}
        />
      </div>
    </div>
  )
}
