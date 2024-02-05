import { FormEvent, useEffect } from 'react'
import { useCompaniesStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'

const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const CreateCompanyPage = () => {

  const company = useCompaniesStore( state => state.company )
  const findFirst = useCompaniesStore( state => state.findFirst )
  const create = useCompaniesStore( state => state.create )
  const isLoading = useCompaniesStore( state => state.isLoading )
  const error = useCompaniesStore( state => state.error )
  const clearError = useCompaniesStore( state => state.clearError )

  const navigate = useNavigate()


  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      companyName, phone, info, email,
      details, mission, vision, foundedAt,
      address, website, documentNumber
    } = event.target as HTMLFormElement

    const isCreated = await create({
      name: companyName.value,
      info: info.value,
      phone: phone.value,
      email: email.value,
      details: details.value,
      mission: mission.value,
      vision: vision.value,
      foundedAt: foundedAt.value,
      address: address.value,
      website: website.value,
      documentNumber: documentNumber.value
    })
    if ( !isCreated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'Su empresa ha sido creada',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    navigate( '/my-company', { replace: true } )
  }

  useEffect( () => {
    findFirst()
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

  if ( company ) return ( <Navigate to="/my-company" />)
  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1
          className="text-4xl font-bold text-[#092635] text-center"
        > Crear Mi Empresa </h1>
        <form
          className="w-full flex flex-col gap-8 items-center"
          onSubmit={ onSubmit }
        >
          <div className={ containerClass }>
            <input 
              id="name"
              name="companyName"
              className={ inputClass }
              placeholder="Nombre"
            />
            <input
              id="details"
              name="details"
              className={ inputClass }
              placeholder="Detalles"
            />
          </div>
          <div className={ containerClass }>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={ inputClass }
              placeholder="Teléfono"
            />
            <input
              id="email"
              name="email"
              type="email"
              className={ inputClass }
              placeholder="Correo Electrónico"
            />
          </div>
          <div className={ containerClass }>
            <input
              id="mission"
              name="mission"
              className={ inputClass }
              placeholder="Misión"
            />
            <input
              id="vision"
              name="vision"
              className={ inputClass }
              placeholder="Visión"
            />
          </div>
          <div className={ containerClass }>
            <input
              id="info"
              name="info"
              className={ inputClass }
              placeholder="Información"
            />
            <input
              id="foundedAt"
              name="foundedAt"
              type="date"
              className={ inputClass }
              placeholder="Fundación"
            />
          </div>
          <div className={ containerClass }>
            <input
              id="address"
              name="address"
              className={ inputClass }
              placeholder="Dirección"
            />
            <input
              id="website"
              name="website"
              type="text"
              className={ inputClass }
              placeholder="Sitio Web"
            />
          </div>
          <input
            id="documentNumber"
            name="documentNumber"
            className={ inputClass }
            placeholder="Documento"
          />
          <div className="flex flex-row justify-center items-center gap-6 p-4">
            <button
              type="submit"
              className="w-60 px-6 py-2 rounded-full shadow-2xl bg-[#092635] text-white text-lg font-bold hover:bg-slate-900 transition-all"
            > Crear Mi Empresa </button>
          </div>
        </form>
      </div>
    </div>
  )
}
