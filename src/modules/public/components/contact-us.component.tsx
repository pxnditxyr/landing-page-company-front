import { FormEvent, useEffect } from 'react'
import { useContactUsStore } from '../../../stores'
import Swal from 'sweetalert2'
import { LoadingPage } from '../../../components'

export const ContactUs = () => {

  const create = useContactUsStore( state => state.create )
  const isLoading = useContactUsStore( state => state.isLoading )
  const error = useContactUsStore( state => state.error )
  const clearError = useContactUsStore( state => state.clearError )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { contactName, email, phone, message } = event.currentTarget

    const isCreated = create({
      name: contactName.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    })

    if ( !isCreated ) return
    Swal.fire({
      title: 'Mensaje Enviado',
      text: 'Tu mensaje ha sido enviado con éxito',
      icon: 'success',
      confirmButtonText: 'Ok',
    })
  }

  useEffect( () => {
    if ( error ) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok',
      })
      clearError()
    }
  }, [ error ] )

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <div
        className={ `w-full min-h-screen flex flex-col justify-center items-center gap-4 py-8 px-4` }
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"%3E%3Cdefs%3E%3ClinearGradient id="a" x1="0" x2="0" y1="1" y2="0" gradientTransform="rotate(38,0.5,0.5)"%3E%3Cstop offset="0" stop-color="%230FF"/%3E%3Cstop offset="1" stop-color="%23CF6"/%3E%3C/linearGradient%3E%3ClinearGradient id="b" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(108,0.5,0.5)"%3E%3Cstop offset="0" stop-color="%23F00"/%3E%3Cstop offset="1" stop-color="%23FC0"/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill="%23FFF" fill-opacity="0" stroke-miterlimit="10"%3E%3Cg stroke="url(%23a)" stroke-width="11.549999999999999"%3E%3Cpath transform="translate(-27.65 -6.000000000000001) rotate(-7.050000000000001 1409 581) scale(0.940538)" d="M1409 581 1450.35 511 1490 581z"/%3E%3Ccircle stroke-width="3.8500000000000005" transform="translate(-62 29) rotate(-2.3000000000000003 800 450) scale(0.992956)" cx="500" cy="100" r="40"/%3E%3Cpath transform="translate(-9.100000000000001 12) rotate(-34 401 736) scale(0.992956)" d="M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z"/%3E%3C/g%3E%3Cg stroke="url(%23b)" stroke-width="3.5"%3E%3Cpath transform="translate(174 10.399999999999999) rotate(-2.5999999999999996 150 345) scale(1.014846)" d="M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z"/%3E%3Crect stroke-width="7.700000000000001" transform="translate(5 -83.5) rotate(-54 1089 759)" x="1039" y="709" width="100" height="100"/%3E%3Cpath transform="translate(-50.8 5.199999999999999) rotate(-9 1400 132) scale(0.89)" d="M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
        id="contact"
      >
        <h1 className="text-4xl font-bold text-slate-900"> Contacto </h1>
        <div className="w-full flex flex-col justify-center items-center gap-4 px-4 sm:w-96">
          <form
            onSubmit={ onSubmit }
            className="flex flex-col justify-center items-center gap-4 w-full"
            id="contact-form"
            method="post"
          >
            <input
              type="text"
              name="contactName"
              id="contactName"
              placeholder="Nombre"
              className="w-full p-4 rounded-[.5em] shadow-lg"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo Electrónico"
              className="w-full p-4 rounded-[.5em] shadow-lg"
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Teléfono"
              className="w-full p-4 rounded-[.5em] shadow-lg"
            />
            <textarea
              name="message"
              id="message"
              placeholder="Mensaje"
              className="w-full p-4 rounded-[.5em] shadow-lg"
            ></textarea>
            <button
              className="w-full p-4 bg-slate-900 text-white font-bold rounded-[.5em] shadow-lg"
            > Enviar </button>
          </form>
        </div>
      </div>
  )
}
