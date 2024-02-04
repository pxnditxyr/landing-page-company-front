import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore, useUsersStore } from '../../../../stores'
import { useEffect } from 'react'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

interface IGanderFormatter {
  [ key : string ] : string
}

const ganderFormatter : IGanderFormatter = {
  'Male': 'Masculino',
  'Female': 'Femenino',
  'Other': 'Otro'
}

export const ViewUserPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const currentUser = useAuthStore( state => state.user )
  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const removeUser = useUsersStore( state => state.remove )
  const isLoadingUsers = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )

  const navigate = useNavigate()

  const user = users.find( user => user.id === id )

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

  if ( isLoadingUsers ) return ( <LoadingPage /> )
  if ( !user ) return ( <h1> No User </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Ver Usuario </h1>
      <div className="overflow-x-auto p-4">
        <article className="w-full flex flex-col gap-4 p-4 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8">
          <section className="w-full flex flex-col items-center gap-2">
            <h2
              className="text-3xl text-emerald-400 font-black"
            > { user.name } { user.lastname } </h2>
            <h2
              className="text-xl text-emerald-200 font-bold"
            > Email: { user.email } </h2>
          </section>
          <section className="w-full flex flex-col">
            <div className="flex gap-2 text-lg font-bold text-white">
              <span
                className="text-xl text-orange-300 font-bold"
              > Edad: </span>
              { new Date( Date.now() - new Date( user.birthdate ).getTime() ).getUTCFullYear() - 1970 }
            </div>
            <div className="flex gap-2 text-lg font-bold text-white">
              <span
                className="text-xl text-orange-300 font-bold"
              > Genero: </span>
              { ganderFormatter[ user.gender ] }
            </div>
            <div className="flex gap-2 text-lg font-bold text-white">
              <span
                className="text-xl text-orange-300 font-bold"
              > Telefono: </span>
              { user.phone }
            </div>
          </section>
          <section className="w-full flex flex-col">
            <div className="flex gap-2 text-lg font-bold text-white">
              <span
                className="text-xl text-orange-300 font-bold"
              > Rol: </span>
              { user.role }
            </div>
            <div className="flex gap-2 text-lg font-bold text-white">
              <span
                className="text-xl text-orange-300 font-bold"
              > Creado En: </span>
              { new Date( user.createdAt ).toLocaleString() }
            </div>
            <div className="flex gap-4 text-lg font-bold text-white">
              <span
                className="text-xl text-orange-300 font-bold"
              > Actualizado En: </span>
              { new Date( user.updatedAt ).toLocaleString() }
            </div>
          </section>
          <section className="w-full flex flex-col">
            <div className="flex flex-col text-lg font-bold text-white">
              <span
                className="text-xl text-orange-300 font-bold"
              > Informacion Adicional </span>
              <p> { user.info } </p>
            </div>
          </section>
          <section className="w-full flex gap-4">
            <button
              onClick={ () => navigate( '/users/update/' + encodedId ) }
              className="px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
            > Actualizar </button>
            <button
              onClick={ () => handleRemoveUser( user.id ) }
              className="px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
            > Borrar </button>
          </section>
        </article>
      </div>
    </div>
  )
}
