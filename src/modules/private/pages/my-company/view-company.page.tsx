import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCompaniesStore } from '../../../../stores'
import { CompanyLogo } from '../../../../icons'
import { DeleteButton, EditButton, LoadingPage } from '../../../../components'

import Swal from 'sweetalert2'

const containerClassName = 'flex flex-col justify-center md:flex-row md:justify-start md:gap-2'
const subtitleClassName = 'text-lg text-orange-300 font-bold md:text-xl'
const paragraphClassName = 'text-base text-white md:text-lg'
const articleClassName = 'w-full flex flex-col-reverse p-4 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8 lg:flex-row overflow-x-auto md:w-auto'
const sectionClassName = 'w-full flex gap-2 flex-col xl:flex-row xl:gap-4 md:grid md:grid-cols-2 px-6'

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
    } )
  }

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Mi Empresa </h1>
      <div className="overflow-x-auto p-4 w-full lg:w-auto">
        {
          ( company ) ? (
            <article className={ articleClassName }>
              <section className="flex flex-col justify-between">
                <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
                  <h2 className="text-3xl text-emerald-400 font-black"> { company.name } </h2>
                  <h2 className="text-xl text-emerald-200 font-bold"> Detalles: { company.details } </h2>
                </section>
                <section className={ sectionClassName }>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Teléfono: </span>
                    <p className={ paragraphClassName }> { company.phone } </p>
                  </div>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Email: </span>
                    <p className={ paragraphClassName }> { company.email } </p>
                  </div>
                </section>
                <section className={ sectionClassName }>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Misión: </span>
                    <p className={ paragraphClassName }> { company.mission } </p>
                  </div>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Visión: </span>
                    <p className={ paragraphClassName }> { company.vision } </p>
                  </div>
                </section>
                <section className={ sectionClassName }>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Fundada En: </span>
                    <p className={ paragraphClassName }> { new Date( company.foundedAt ).toLocaleString() } </p>
                  </div>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Dirección: </span>
                    <p className={ paragraphClassName }> {company.address} </p>
                  </div>
                </section>
                <section className={ sectionClassName }>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Sitio Web: </span>
                    <p className={ paragraphClassName }>
                      {
                        ( company.website ) ? (
                          <a
                            href={ company.website.includes( 'http' ) ? company.website : `https://${ company.website }` }
                            target="_blank"
                            className="text-lime-400 hover:text-lime-700 transition-all duration-300"
                          >
                            { company.website }
                          </a>
                        ) : (
                          'No tiene sitio web'
                        )
                      }
                    </p>
                  </div>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Documento: </span>
                    <p className={ paragraphClassName }> { company.documentNumber } </p>
                  </div>
                </section>
                <section className={ sectionClassName }>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Creado En: </span>
                    <p className={ paragraphClassName }> { new Date( company.createdAt ).toLocaleString() } </p>
                  </div>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Actualizado En: </span>
                    <p className={ paragraphClassName }> { new Date( company.updatedAt ).toLocaleString() } </p>
                  </div>
                </section>
                <section className={ sectionClassName }>
                  <div className={ containerClassName }>
                    <span className={ subtitleClassName }> Informacion Adicional </span>
                    <p className={ paragraphClassName }> { company.info } </p>
                  </div>
                </section>
                <section className="w-full flex gap-4 justify-center items-center py-6">
                  <EditButton onClick={ () => navigate( '/my-company/update' ) } />
                  <DeleteButton onClick={ () => handleRemoveCompany( company.id ) } />
                </section>
              </section>
              <section className="w-full flex p-4 items-center justify-center lg:p-8 md:w-auto">
                <CompanyLogo className="w-48 h-48 object-cover rounded-lg lg:w-64 lg:h-64" />
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
