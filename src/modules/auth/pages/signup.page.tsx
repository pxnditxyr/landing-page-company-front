import { FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormField } from '../../../components'
import { AuthLayout } from '../layout'
import { useAuthStore } from '../../../stores'
import Swal from 'sweetalert2'

export const SignupPage = () => {

  const signup = useAuthStore( state => state.signup )
  const authError = useAuthStore( state => state.error )
  const clearError = useAuthStore( state => state.clearError )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      personName, lastname, gender,
      birthdate, phone, info,
      email, password, confirmPassword
    } = event.target as HTMLFormElement
    if ( password.value !== confirmPassword.value ) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return
    }
    signup({
      email: email.value,
      password: password.value,
      name: personName.value,
      lastname: lastname.value,
      gender: gender.value,
      birthdate: birthdate.value,
      phone: phone.value,
      info: info.value
    })
  }

  useEffect( () => {
    if ( authError && authError !== 'Unauthorized' ) {
      Swal.fire({
        title: 'Error',
        text: authError,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      clearError()
    }
  }, [ authError ] )

  return (
    <AuthLayout title="Registrarse">
      <form
        onSubmit={ onSubmit }
        className="flex flex-col gap-8 w-full justify-center items-center"
      >
        <div className="flex flex-col gap-8 md:flex-row md:gap-4 md:w-full">
          <FormField
            type="text"
            name="personName"
            placeholder="Nombres"
          />
          <FormField
            type="text"
            name="lastname"
            placeholder="Apellidos"
          />
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-4 md:w-full">
          <FormField
            type="date"
            name="birthdate"
            value="2000-01-01"
            placeholder="Fecha de nacimiento"
            className="md:w-full"
          />
          <select
            className="w-60 px-3 py-2 rounded-lg shadow-2xl bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-blue-500"
            name="gender"
          >
            <option value="Male"> Masculino </option>
            <option value="Female"> Femenino </option>
            <option value="Other"> Otro </option>
          </select>
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-4">
          <FormField
            type="text"
            name="phone"
            placeholder="Teléfono"
          />
          <FormField
            type="text"
            name="info"
            placeholder="Información adicional"
          />
        </div>
        <FormField
          type="text"
          name="email"
          placeholder="Correo electrónico"
        />
        <div className="flex flex-col gap-8 md:flex-row md:gap-4">
          <FormField
            type="password"
            name="password"
            placeholder="Contraseña"
          />
          <FormField
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
          />
        </div>
        <button className="btn btn-primary"> Iniciar Sesión </button>
      </form>
      <Link
        to="/auth/signin"
        className="text-center text-turquoise-blue-600 font-bold hover:underline"
      > No tienes cuenta? Registrate </Link>
    </AuthLayout>
  )
}
