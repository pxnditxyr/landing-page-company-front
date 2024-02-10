import { useNavigate, useParams } from 'react-router-dom'
import { useContactUsStore } from '../../../../stores'
import { useEffect } from 'react'
import { DeleteButton, LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

const containerClassName = 'flex flex-col justify-center md:justify-start md:gap-2'
const subtitleClassName = 'text-lg text-orange-300 font-bold md:text-xl'
const paragraphClassName = 'text-base text-white md:text-lg'
const articleClassName = 'w-full flex flex-col-reverse p-4 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-2 md:flex-row overflow-x-auto md:items-center md:justify-center md:w-auto'
const sectionClassName = 'w-full flex gap-2 flex-col xl:flex-row xl:gap-4 px-6 lg:px-2'

export const ViewContactPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const contactUs = useContactUsStore( state => state.contactUs )
  const findAllContactUs = useContactUsStore( state => state.findAll )
  const removeContact = useContactUsStore( state => state.remove )
  const isLoadingContactUs = useContactUsStore( state => state.isLoading )
  const error = useContactUsStore( state => state.error )
  const clearError = useContactUsStore( state => state.clearError )

  const navigate = useNavigate()

  const contact = contactUs.find( contact => contact.id === id )

  useEffect( () => {
    findAllContactUs()
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

  const handleRemoveContact = async ( id : string ) => {
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
          const isRemoved = removeContact( id )
          if ( !isRemoved ) return
          Swal.fire({
            title: 'Contacto Eliminado',
            text: 'El Contacto ha sido eliminado con éxito',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          navigate( '/contact-us' )
        }
    })
  }

  if ( isLoadingContactUs ) return ( <LoadingPage /> )
  if ( !contact ) return ( <h1> No Contact </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Ver Contacto </h1>
      <div className="overflow-x-auto p-4 w-full md:w-auto">
        <article className={ articleClassName }>
          <section className="flex flex-col justify-between">
            <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
              <h2 className="text-3xl text-emerald-400 font-black"> { contact.name } </h2>
              <h2 className="text-xl text-emerald-200 font-bold"> { contact.email } </h2>
              <p className="text-xl text-emerald-200 font-bold"> { contact.phone } </p>
            </section>
            <section className={ sectionClassName }>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Creado En: </span>
                <p className={ paragraphClassName }> { new Date( contact.createdAt ).toLocaleString() } </p>
              </div>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Actualizado En: </span>
                <p className={ paragraphClassName }> { new Date( contact.updatedAt ).toLocaleString() } </p>
              </div>
            </section>
            <section className={ sectionClassName }>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Mensaje: </span>
                <p className={ paragraphClassName }> { contact.message } </p>
              </div>
            </section>
            <section className="w-full flex gap-4 justify-center items-center py-6">
              <DeleteButton onClick={ () => handleRemoveContact( contact.id ) } />
            </section>
          </section>
        </article>
      </div>
    </div>
  )
}
