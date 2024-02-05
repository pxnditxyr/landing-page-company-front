import { FormEvent, useEffect } from 'react'
import { useProjectsStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const CreateProjectPage = () => {

  const create = useProjectsStore( state => state.create )
  const isLoading = useProjectsStore( state => state.isLoading )
  const error = useProjectsStore( state => state.error )
  const clearError = useProjectsStore( state => state.clearError )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      projectName, info,
      details, imageUrl
    } = event.target as HTMLFormElement

    const isCreated = await create({
      name: projectName.value,
      info: info.value,
      details: details.value,
      imageUrl: imageUrl.value,
    })
    if ( !isCreated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El proyecto ha sido creado exitosamente',
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
        > Crear Nuevo Proyecto </h1>
        <form
          className="w-full flex flex-col gap-8 items-center"
          onSubmit={ onSubmit }
        >
          <div className={ containerClass }>
            <input 
              id="name"
              name="projectName"
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
              id="imageUrl"
              name="imageUrl"
              type="text"
              className={ inputClass }
              placeholder="Imagen"
            />
            <input
              id="info"
              name="info"
              className={ inputClass }
              placeholder="Información"
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-6 p-4">
            <button
              type="submit"
              className="w-60 px-6 py-2 rounded-full shadow-2xl bg-[#092635] text-white text-lg font-bold hover:bg-slate-900 transition-all"
            > Crear Proyecto </button>
          </div>
        </form>
      </div>
    </div>
  )
}
