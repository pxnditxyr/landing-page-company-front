import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuthStore, useUsersStore } from '../../../../stores'
import { DeleteButton, EditButton, LoadingPage } from '../../../../components'
import { genderFormatter } from '../../../../helpers'

import Swal from 'sweetalert2'

const containerClassName = 'flex flex-col justify-center md:flex-row md:justify-start md:gap-2'
const subtitleClassName = 'text-lg text-orange-300 font-bold md:text-xl'
const paragraphClassName = 'text-base text-white md:text-lg'
const articleClassName = 'w-full flex flex-col p-4 text-[#092635] bg-gray-800/60 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8 overflow-x-auto'
const sectionClassName = 'w-full flex gap-2 flex-col xl:gap-4'

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
        className="text-4xl font-bold text-white backdrop-blur-sm bg-fuchsia-800/30 rounded-lg p-2"
      > Ver Usuario </h1>
      <div className="overflow-x-auto p-4">
        <article className={ articleClassName }>
          <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
            <h2 className="text-3xl text-emerald-400 font-black"> { user.name } { user.lastname } </h2>
            <h2 className="text-xl text-emerald-200 font-bold"> Email: { user.email } </h2>
          </section>
          <section className={ sectionClassName }>
            <div className={ containerClassName }>
              <span className={ subtitleClassName }> Edad: </span>
              <p className={ paragraphClassName }>
                { new Date( Date.now() - new Date( user.birthdate ).getTime() ).getUTCFullYear() - 1970 }
              </p>
            </div>
            <div className={ containerClassName }>
              <span className={ subtitleClassName }> Genero: </span>
              <p className={ paragraphClassName }> { genderFormatter[ user.gender ] } </p>
            </div>
          </section>
          <section className={ sectionClassName }>
            <div className={ containerClassName }>
              <span className={ subtitleClassName }> Telefono: </span>
              <p className={ paragraphClassName }> { user.phone } </p>
            </div>
            <div className={ containerClassName }>
              <span className={ subtitleClassName }> Rol: </span>
              <p className={ paragraphClassName }> { user.role } </p>
            </div>
          </section>
          <section className={ sectionClassName }>
            <div className={ containerClassName }>
              <span className={ subtitleClassName }> Creado En: </span>
              <p className={ paragraphClassName }> { new Date( user.createdAt ).toLocaleString() } </p>
            </div>
            <div className={ containerClassName }>
              <span className={ subtitleClassName }> Actualizado En: </span>
              <p className={ paragraphClassName }> { new Date( user.updatedAt ).toLocaleString() } </p>
            </div>
          </section>
          <section className={ sectionClassName }>
            <div className={ containerClassName }>
              <span className={ subtitleClassName }> Información: </span>
              <p className={ paragraphClassName }> { user.info } </p>
            </div>
          </section>
          <section className="w-full flex gap-4 justify-center items-center py-6">
            <EditButton onClick={ () => navigate( '/users/update/' + encodedId ) } />
            <DeleteButton onClick={ () => handleRemoveUser( user.id ) } />
          </section>
        </article>
      </div>
    </div>
  )
}
