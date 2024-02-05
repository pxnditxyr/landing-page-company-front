import { FormEvent, useEffect } from 'react'

import { useCompaniesStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'

import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'


const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const UpdateCompanyPage = () => {

  const company = useCompaniesStore( state => state.company )
  const findFirst = useCompaniesStore( state => state.findFirst )
  const update = useCompaniesStore( state => state.update )
  const isLoading = useCompaniesStore( state => state.isLoading )
  const error = useCompaniesStore( state => state.error )
  const clearError = useCompaniesStore( state => state.clearError )

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

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      companyName, info, phone, email,
      details, mission, vision, foundedAt,
      address, website, documentNumber
    } = event.target as HTMLFormElement

    if ( !company ) return

    const isUpdated = await update( company.id ,{
      name: companyName.value ? companyName.value : undefined,
      info: info.value ? info.value : undefined,
      phone: phone.value ? phone.value : undefined,
      email: email.value ? email.value : undefined,
      details: details.value ? details.value : undefined,
      mission: mission.value ? mission.value : undefined,
      vision: vision.value ? vision.value : undefined,
      foundedAt: foundedAt.value ? foundedAt.value : undefined,
      address: address.value ? address.value : undefined,
      website: website.value ? website.value : undefined,
      documentNumber: documentNumber.value ? documentNumber.value : undefined
    })

    if ( !isUpdated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'Su empresa ha sido actualizada',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  if ( isLoading ) return ( <LoadingPage /> )
  if ( !company ) return ( <Navigate to="/my-company" /> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1 className="text-4xl font-bold text-[#092635] text-center"> Actualizar Empresa </h1>
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
              defaultValue={ company.name }
            />
            <input
              id="details"
              name="details"
              className={ inputClass }
              placeholder="Detalles"
              defaultValue={ company.details }

            />
          </div>
          <div className={ containerClass }>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={ inputClass }
              placeholder="Teléfono"
              defaultValue={ company.phone }
            />
            <input
              id="email"
              name="email"
              type="email"
              className={ inputClass }
              placeholder="Correo Electrónico"
              defaultValue={ company.email ? company.email : '' }
            />
          </div>
          <div className={ containerClass }>
            <input
              id="mission"
              name="mission"
              className={ inputClass }
              placeholder="Misión"
              defaultValue={ company.mission }
            />
            <input
              id="vision"
              name="vision"
              className={ inputClass }
              placeholder="Visión"
              defaultValue={ company.vision }
            />
          </div>
          <div className={ containerClass }>
            <input
              id="info"
              name="info"
              className={ inputClass }
              placeholder="Información"
              defaultValue={ company.info }
            />
            <input
              id="foundedAt"
              name="foundedAt"
              type="date"
              className={ inputClass }
              placeholder="Fundación"
              defaultValue={ new Date( company.foundedAt ).toISOString().split('T')[0] }
            />
          </div>
          <div className={ containerClass }>
            <input
              id="address"
              name="address"
              className={ inputClass }
              placeholder="Dirección"
              defaultValue={ company.address ? company.address : '' }
            />
            <input
              id="website"
              name="website"
              type="text"
              className={ inputClass }
              placeholder="Sitio Web"
              defaultValue={ company.website ? company.website : '' }
            />
          </div>
          <input
            id="documentNumber"
            name="documentNumber"
            className={ inputClass }
            placeholder="Documento"
            defaultValue={ company.documentNumber ? company.documentNumber : '' }
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
