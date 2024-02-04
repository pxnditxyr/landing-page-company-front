import { useNavigate, useParams } from 'react-router-dom'
import { useProjectsStore } from '../../../../stores'
import { useEffect } from 'react'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

export const ViewProjectPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const projects = useProjectsStore( state => state.projects )
  const findAllProjects = useProjectsStore( state => state.findAll )
  const removeProject = useProjectsStore( state => state.remove )
  const isLoadingProjects = useProjectsStore( state => state.isLoading )
  const error = useProjectsStore( state => state.error )
  const clearError = useProjectsStore( state => state.clearError )

  const navigate = useNavigate()

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

  const handleRemoveProject = async ( id : string ) => {
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
          const isRemoved = removeProject( id )
          if ( !isRemoved ) return
          Swal.fire({
            title: 'Proyecto Eliminado!',
            text: 'El proyecto ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
    })
  }

  if ( isLoadingProjects ) return ( <LoadingPage /> )
  if ( !project ) return ( <h1> No Project </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2">
      <h1
        className="text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
      > Ver Proyecto </h1>
      <div className="overflow-x-auto p-4">
        <article className="w-full flex flex-row gap-2 p-2 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8">
          <section className="flex flex-col justify-between">
            <section className="w-full flex flex-col items-start gap-2">
              <h2
                className="text-3xl text-emerald-400 font-black"
              > { project.name } </h2>
              <h2
                className="text-xl text-emerald-200 font-bold"
              > Detalles: { project.details } </h2>
            </section>
            <section className="w-full flex flex-col">
              <div className="flex gap-2 text-lg font-bold text-white">
                <span
                  className="text-xl text-orange-300 font-bold"
                > Creado En: </span>
                { new Date( project.createdAt ).toLocaleString() }
              </div>
              <div className="flex gap-4 text-lg font-bold text-white">
                <span
                  className="text-xl text-orange-300 font-bold"
                > Actualizado En: </span>
                { new Date( project.updatedAt ).toLocaleString() }
              </div>
            </section>
            <section className="w-full flex flex-col">
              <div className="flex flex-col text-lg font-bold text-white">
                <span
                  className="text-xl text-orange-300 font-bold"
                > Informacion Adicional </span>
                <p> { project.info } </p>
              </div>
            </section>
            <section className="w-full flex gap-4">
              <button
                onClick={ () => navigate( '/projects/update/' + encodedId ) }
                className="px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
              > Actualizar </button>
              <button
                onClick={ () => handleRemoveProject( project.id ) }
                className="px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
              > Borrar </button>
            </section>
          </section>
          <section className="w-1/2 flex flex-col items-center gap-4 justify-center">
            <img
              src={ project.imageUrl }
              alt={ project.name }
              className="w-64 h-80 object-cover rounded-lg"
            />
          </section>
        </article>
      </div>
    </div>
  )
}
