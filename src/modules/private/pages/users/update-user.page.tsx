import { FormEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useUsersStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'

import Swal from 'sweetalert2'


const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const UpdateUserPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const update = useUsersStore( state => state.update )
  const isLoading = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )
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

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      userName, lastname, birthdate, phone,
      gender, userRole, email, password, info
    } = event.target as HTMLFormElement

    const isUpdated = await update( id ,{
      name: userName.value ? userName.value : undefined,
      lastname: lastname.value ? lastname.value : undefined,
      birthdate: birthdate.value ? birthdate.value : undefined,
      gender: gender.value ? gender.value : undefined,
      phone: phone.value ? phone.value : undefined,
      role: userRole.value ? userRole.value : undefined,
      email: email.value ? email.value : undefined,
      password: password.value ? password.value : undefined,
      info: info.value ? info.value : undefined
    })
    if ( !isUpdated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El usuario ha sido actualizado exitosamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  if ( isLoading ) return ( <LoadingPage /> )
  if ( !user ) return ( <h1> Usuario no encontrado </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1 className="text-4xl font-bold text-[#092635] text-center"> Actualizar Usuario </h1>
        <form
          className="w-full flex flex-col gap-8 items-center"
          onSubmit={ onSubmit }
        >
          <div className={ containerClass }>
            <input 
              id="name"
              name="userName"
              className={ inputClass }
              placeholder="Nombre"
              defaultValue={ user.name }
            />
            <input
              id="lastname"
              name="lastname"
              className={ inputClass }
              placeholder="Apellido"
              defaultValue={ user.lastname }
            />
          </div>
          <div className={ containerClass }>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              className={ inputClass }
              placeholder="Fecha de Nacimiento"
              defaultValue={ new Date( user.birthdate ).toISOString().split( 'T' )[ 0 ] }
            />
            <input
              id="phone"
              name="phone"
              className={ inputClass }
              placeholder="Teléfono"
              defaultValue={ user.phone }
            />
          </div>
          <div className={ containerClass }>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="gender"
                className="flex flex-col text-[#092635] font-bold text-xl justify-center px-4"
              > Género </label>
              <select
                id="gender"
                name="gender"
                className={ inputClass }
                style={{ appearance: 'none' }}
              >
                <option value="Male" selected={ user.gender === 'Male' }>Masculino</option>
                <option value="Female" selected={ user.gender === 'Female' }>Femenino</option>
                <option value="Other" selected={ user.gender === 'Other' }>Otro</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="userRole"
                className="flex flex-col text-[#092635] font-bold text-xl justify-center px-4"
              > Rol </label>
              <select
                id="userRole"
                name="userRole"
                className={ inputClass }
                style={{ appearance: 'none' }}
              >
                <option value="ADMIN" selected={ user.role === 'ADMIN' }>ADMIN</option>
                <option value="USER" selected={ user.role === 'USER' }>USER</option>
              </select>
            </div>
          </div>
          <div className={ containerClass }>
            <input
              id="email"
              name="email"
              type="email"
              className={ inputClass }
              placeholder="Correo Electrónico"
              defaultValue={ user.email }
            />
            <input
              id="password"
              name="password"
              type="password"
              className={ inputClass }
              placeholder="Contraseña"
            />
          </div>
          <input
            id="info"
            name="info"
            className={ inputClass }
            placeholder="Información"
            defaultValue={ user.info }
          />
          <div className="flex flex-row justify-center items-center gap-6 p-4">
            <button
              type="submit"
              className="w-60 px-6 py-2 rounded-full shadow-2xl bg-[#092635] text-white text-lg font-bold hover:bg-slate-900 transition-all"
            > Actualizar </button>
          </div>
        </form>
      </div>
    </div>
  )
}
