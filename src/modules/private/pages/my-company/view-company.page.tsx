import { useNavigate } from 'react-router-dom'
import { useCompaniesStore } from '../../../../stores'
import { useEffect } from 'react'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'
import { CompanyLogo } from '../../../../icons'

export const ViewCompanyPage = () => {

  const company = useCompaniesStore( state => state.company )
  const findFirst = useCompaniesStore( state => state.findFirst )
  const remove = useCompaniesStore( state => state.remove )
  const isLoading = useCompaniesStore( state => state.isLoading )
  const error = useCompaniesStore( state => state.error )
  const clearError = useCompaniesStore( state => state.clearError )

  const navigate = useNavigate()

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

  const handleRemoveCompany = async ( id : string ) => {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then( ( result ) => {
        if ( result.isDismissed ) return
        if ( result.isConfirmed ) {
          const isRemoved = remove( id )
          if ( !isRemoved ) return
          Swal.fire({
            title: 'Empresa Eliminada!',
            text: 'La empresa ha sido eliminada',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
        findFirst()
    })
  }

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Mi Empresa </h1>
      <div className="overflow-x-auto p-4">
        {
          ( company ) ? (
            <article className="w-full flex flex-row gap-2 p-2 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8">
              <section className="flex flex-col justify-between">
                <section className="w-full flex flex-col items-start gap-2">
                  <h2
                    className="text-3xl text-emerald-400 font-black"
                  > { company.name } </h2>
                  <h2
                    className="text-xl text-emerald-200 font-bold"
                  > Detalles: { company.details } </h2>
                </section>
                <section className="w-full flex flex-col">
                  <div className="flex gap-2 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Teléfono: </span>
                    { company.phone }
                  </div>
                  <div className="flex gap-4 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Email: </span>
                    { company.email }
                  </div>
                </section>
                <section className="w-full flex flex-col">
                  <div className="flex gap-2 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Misión: </span>
                    { company.mission }
                  </div>
                  <div className="flex gap-4 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Visión: </span>
                    { company.vision }
                  </div>
                </section>
                <section className="w-full flex flex-col">
                  <div className="flex gap-2 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Fundada En: </span>
                    { new Date( company.foundedAt ).toLocaleString() }
                  </div>
                  <div className="flex gap-4 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Dirección: </span>
                    { company.address }
                  </div>
                </section>
                <section className="w-full flex flex-col">
                  <div className="flex gap-2 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Website: </span>
                    { company.website }
                  </div>
                  <div className="flex gap-4 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Documento: </span>
                    { company.documentNumber }
                  </div>
                </section>
                <section className="w-full flex flex-col">
                  <div className="flex gap-2 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Creado En: </span>
                    { new Date( company.createdAt ).toLocaleString() }
                  </div>
                  <div className="flex gap-4 text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Actualizado En: </span>
                    { new Date( company.updatedAt ).toLocaleString() }
                  </div>
                </section>
                <section className="w-full flex flex-col py-4">
                  <div className="flex flex-col text-lg font-bold text-white">
                    <span
                      className="text-xl text-orange-300 font-bold"
                    > Informacion Adicional </span>
                    <p> { company.info } </p>
                  </div>
                </section>
                <section className="w-full flex gap-4 justify-center items-center mt-2">
                  <button
                    onClick={ () => navigate( '/my-company/update' ) }
                    className="px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                  > Actualizar </button>
                  <button
                    onClick={ () => handleRemoveCompany( company.id ) }
                    className="px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                  > Borrar </button>
                </section>
              </section>
              <section className="w-1/2 flex flex-col items-center gap-4 justify-center">
                <CompanyLogo
                  className="w-64 h-80 object-cover rounded-lg"
                />
              </section>
            </article>
          ) : (
            <div className="w-full flex flex-col items-center gap-4 p-4">
              <h1
                className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
              > No existe una empresa </h1>
              <p
                className="text-lg font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
              > Por favor, crea una empresa </p>
              <button
                className="px-4 py-3 bg-green-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                onClick={ () => navigate( '/my-company/create' ) }
              > Crear Empresa </button>
            </div>
          )
        }
      </div>
    </div>
  )
}
