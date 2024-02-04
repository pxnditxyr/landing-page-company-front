import { FormEvent, useEffect } from 'react'
import { useUsersStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const CreateUserPage = () => {

  const create = useUsersStore( state => state.create )
  const isLoading = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      userName, lastname, birthdate, phone,
      gender, userRole, email, password, info
    } = event.target as HTMLFormElement

    const isCreated = await create({
      name: userName.value,
      lastname: lastname.value,
      birthdate: birthdate.value,
      gender: gender.value,
      phone: phone.value,
      role: userRole.value,
      email: email.value,
      password: password.value,
      info: info.value
    })
    if ( !isCreated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El usuario ha sido creado exitosamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

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

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1
          className="text-4xl font-bold text-[#092635] text-center"
        > Crear Nuevo Usuario </h1>
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
            />
            <input
              id="lastname"
              name="lastname"
              className={ inputClass }
              placeholder="Apellido"
            />
          </div>
          <div className={ containerClass }>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              className={ inputClass }
              placeholder="Fecha de Nacimiento"
            />
            <input
              id="phone"
              name="phone"
              className={ inputClass }
              placeholder="Teléfono"
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
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
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
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
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
          />
          <div className="flex flex-row justify-center items-center gap-6 p-4">
            <button
              type="submit"
              className="w-60 px-6 py-2 rounded-full shadow-2xl bg-[#092635] text-white text-lg font-bold hover:bg-slate-900 transition-all"
            > Crear Usuario </button>
          </div>
        </form>
      </div>
    </div>
  )
}
