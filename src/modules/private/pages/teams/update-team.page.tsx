import { FormEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useTeamsStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'

import Swal from 'sweetalert2'


const containerClass = 'flex flex-col gap-6 w-full sm:flex-row'
const inputClass = 'w-full px-6 py-2 rounded-full shadow-2xl bg-transparent focus:outline-none md:w-full border-2 border-white placeholder-[#092635] text-[#092635] text-lg font-bold sm:w-full'

export const UpdateTeamPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const teams = useTeamsStore( state => state.teams )
  const findAllTeams = useTeamsStore( state => state.findAll )
  const update = useTeamsStore( state => state.update )
  const isLoading = useTeamsStore( state => state.isLoading )
  const error = useTeamsStore( state => state.error )
  const clearError = useTeamsStore( state => state.clearError )
  const team = teams.find( team => team.id === id )

  useEffect( () => {
    findAllTeams()
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
      teamName, details,
      imageUrl
    } = event.target as HTMLFormElement

    const isUpdated = await update( id ,{
      name: teamName.value ? teamName.value : undefined,
      details: details.value ? details.value : undefined,
      imageUrl: imageUrl.value ? imageUrl.value : undefined,
    })
    if ( !isUpdated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El Equipo ha sido actualizado exitosamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  if ( isLoading ) return ( <LoadingPage /> )
  if ( !team ) return ( <h1> Usuario no encontrado </h1> )

  return (
    <div className="w-full flex flex-col items-center gap-8 p-2 mb-6">
      <div className="overflow-x-auto gap-12 flex flex-col justify-center items-center backdrop-blur-sm bg-white/[0.1] rounded-lg px-6 py-8 w-full sm:max-w-xl sm:px-16 sm:py-12">
        <h1 className="text-4xl font-bold text-[#092635] text-center"> Actualizar Equipo </h1>
        <form
          className="w-full flex flex-col gap-8 items-center"
          onSubmit={ onSubmit }
        >
          <div className={ containerClass }>
            <input 
              id="name"
              name="teamName"
              className={ inputClass }
              placeholder="Nombre"
              defaultValue={ team.name }
            />
            <input
              id="details"
              name="details"
              className={ inputClass }
              placeholder="Detalles"
              defaultValue={ team.details }
            />
          </div>
          <div className={ containerClass }>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              className={ inputClass }
              placeholder="Imagen"
              defaultValue={ team.imageUrl }
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
