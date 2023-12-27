import { FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AuthLayout } from '../layout'
import { FormField } from '../../../components'
import { useAuthStore } from '../../../stores'
import Swal from 'sweetalert2'

export const SigninPage = () => {

  const signin = useAuthStore( state => state.signin )
  const authError = useAuthStore( state => state.error )
  const clearError = useAuthStore( state => state.clearError )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { email, password } = event.target as HTMLFormElement
    signin({ email: email.value, password: password.value })
  }

  useEffect( () => {
    if ( authError ) {
      Swal.fire({
        title: 'Error',
        text: authError,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    clearError()
  }, [ authError ] )

  return (
    <AuthLayout title="Iniciar Sesión">
      <form
        onSubmit={ onSubmit }
        className="flex flex-col gap-8 w-full justify-center items-center p-4"
      >
        <FormField
          type="text"
          name="email"
          placeholder="Correo electrónico"
          className="w-full"
        />
        <FormField
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full"
        />
        <button className="btn btn-primary"> Iniciar Sesión </button>
      </form>
      <Link
        to="/auth/signup"
        className="text-center text-turquoise-blue-600 font-bold hover:underline"
      > No tienes cuenta? Registrate </Link>
    </AuthLayout>
  )
}
