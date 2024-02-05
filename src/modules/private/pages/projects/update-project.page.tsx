import { FormEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useProjectsStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'

import Swal from 'sweetalert2'


const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const UpdateProjectPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const projects = useProjectsStore( state => state.projects )
  const findAllProjects = useProjectsStore( state => state.findAll )
  const update = useProjectsStore( state => state.update )
  const isLoading = useProjectsStore( state => state.isLoading )
  const error = useProjectsStore( state => state.error )
  const clearError = useProjectsStore( state => state.clearError )
  const project = projects.find( project => project.id === id )

  useEffect( () => {
    findAllProjects()
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
      projectName, details,
      imageUrl, info
    } = event.target as HTMLFormElement

    const isUpdated = await update( id ,{
      name: projectName.value ? projectName.value : undefined,
      details: details.value ? details.value : undefined,
      imageUrl: imageUrl.value ? imageUrl.value : undefined,
      info: info.value ? info.value : undefined
    })
    if ( !isUpdated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El proyecto ha sido actualizado exitosamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  if ( isLoading ) return ( <LoadingPage /> )
  if ( !project ) return ( <h1> Usuario no encontrado </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1 className="text-4xl font-bold text-[#092635] text-center"> Actualizar Proyecto </h1>
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
              defaultValue={ project.name }
            />
            <input
              id="details"
              name="details"
              className={ inputClass }
              placeholder="Detalles"
              defaultValue={ project.details }
            />
          </div>
          <div className={ containerClass }>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              className={ inputClass }
              placeholder="Imagen"
              defaultValue={ project.imageUrl }
            />
            <input
              id="info"
              name="info"
              className={ inputClass }
              placeholder="Información"
              defaultValue={ project.info }
            />
          </div>
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
